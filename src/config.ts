import toml from "toml";
import chalk from "chalk";
import inquirer from "inquirer";
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { Logger, LogLevel } from "./logger";
import { hashPassword, randomByteString } from "./util/crypto";
import merge from "lodash/merge";

let logger: Logger;

export interface ServerSection {
    listen: number
    logLevel: LogLevel
}

export interface AdminSection {
    passwordHash: [string, string]
    deleteTimeout: number
}

export interface MetaSection {
    directory: string
    title: string
    subtitle?: string
    notice?: string
    logo?: string
    namingTemplate: string
}

export interface DumpyConfig {
    server: ServerSection
    admin: AdminSection
    meta: MetaSection & { overrides?: Record<string, MetaSection & { domain: string }> }
}

export type SiteConfig = MetaSection & {__brand: "_dumpy_site_"}

const defaultConfig = {
    admin: {
        deleteTimeout: 10,
        logLevel: "INFO"
    },
    meta: {
        color: "#f76262",
        directory: "./images/",
        namingTemplate: "{chars 4}"
    },
    server: {
        listen: 5080
    }
} as const;



const TOML_HEADER = "# This config was generated interactively, feel free to edit it.";

/**
 * Converts a JSON object into TOML format, somewhat prettily.
 * @param obj Any JSON object that is compatible with TOML
 * @param heading A heading to start with, you probably don't want to use this
 */
function tomlGenerator(obj: Record<string, unknown>, heading?: string[]): string {
    let result = "", ownValue = false;
    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
            result += tomlGenerator(value as Record<string, unknown>, [...(heading ?? []), key]);
        } else if (value !== undefined && value !== null) {
            result += `${key}=${JSON.stringify(value)}\n`;

            ownValue = true;
        }
    }

    if (ownValue && heading) {
        result = `\n\n[${heading.join(".")}]\n` + result;
    }

    return result.replace(/\n{3,}/g,"\n\n");
}

function sectionTitle(title: string) {
    console.log(chalk.bold.yellow("\n=", chalk.reset(title), chalk.bold.yellow("=".repeat(30 - title.length))));
}

/**
 * Prompts for a Logo. It will search `./public/` for any image
 * files to pick from. If none are found, it defaults to `None`
 */
async function promptLogo(): Promise<{logo?: string}> {
    const images = readdirSync("./public/").filter(x => x.match(/\.(png|jpeg|jpg|gif|webp)$/));
    if (images.length === 0) {
        console.log(chalk.red(chalk.bold("~"), "No images were found in", chalk.reset("./public/") + chalk.red(","), "cannot prompt for logo."));
        return {};
    }

    return await inquirer.prompt([
        {
            type: "list",
            name: "logo",
            message: "Pick a Logo:",
            choices: [...images, "None"],
            filter: logo => logo !== "None" ? logo : undefined
        }
    ]);
}

/**
 * Prompts for Meta/Site-level configuration options
 */
async function promptMeta(): Promise<MetaSection> {
    sectionTitle("Meta");
    const titles = await inquirer.prompt<Pick<MetaSection, "title" | "subtitle" | "notice">>([
        {
            name: "title",
            message: "Host Title:",
            validate: inp => inp.length > 0
        },
        {
            name: "subtitle",
            message: "Subtitle (optional):"
        },
        {
            name: "notice",
            message: "Notice (like dmca; optional):"
        }
    ]);

    const logo = await promptLogo();

    const misc = await inquirer.prompt<Pick<MetaSection, "directory" | "namingTemplate">>([
        {
            name: "directory",
            message: "Image/File Directory:",
            default: defaultConfig.meta.directory
        },
        {
            name: "namingTemplate",
            message: "File Naming Template:",
            default: defaultConfig.meta.namingTemplate
        }
    ]);

    return { ...titles, ...logo, ...misc };
}

/**
 * Prompts for Administration-level configuration options
 */
async function promptAdmin(): Promise<AdminSection> {
    sectionTitle("Admin");
    const adm = await inquirer.prompt<Pick<AdminSection, "passwordHash" | "deleteTimeout">>([
        {
            type: "password",
            name: "passwordHash",
            message: "Set a Password:",
            filter: async password => {
                const salt = await randomByteString(32);
                return password.length && [await hashPassword(password, salt), salt];
            },
            validate: inp => !!inp || "Password is required!"
        },
        {
            name: "deleteTimeout",
            message: "How long before deletion links are invalidated (in minutes)?",
            default: 10,
            filter: value => isNaN(parseInt(value)) ? value : parseInt(value, 10),
            validate: value => isNaN(parseInt(value)) ? "Not a number!" : true,
        }
    ]);

    return adm;
}

/**
 * Prompts for Server-level configuration options
 */
async function promptServer(): Promise<ServerSection> {
    sectionTitle("Server");
    const svr = await inquirer.prompt<Pick<ServerSection, "listen">>([
        {
            name: "listen",
            message: "Port to listen on:",
            default: 5080
        }
    ]);

    return { ...svr, logLevel: defaultConfig.admin.logLevel };
}

/**
 * Top level function for config generation, calls out to all the
 * subsections/modules to prompt for config sections
 */
async function promptConfig(): Promise<DumpyConfig> {
    const admin = await promptAdmin();
    const server = await promptServer();
    const meta = await promptMeta();

    return {
        meta, server, admin
    };
}

function validateConfig(config: DumpyConfig) {
    for (const [name, s] of Object.entries(config.meta.overrides ?? {})) {
        if (!s.domain) {
            logger.warn(chalk`Meta Override-Section '{yellow ${name}}' does not contain the {cyan domain} field. Skipping...`);
        }
    }
}

/**
 * Internal function which searches for an existing config. If no config
 * can be found, it will attempt to interactively generate a config.
 */
async function fetchConfig(): Promise<DumpyConfig> {
    logger = new Logger("config"); // We have to do this here for module resolution to work

    let config;
    try {
        config = readFileSync("config.toml");
        config = config.toString("ascii");
        try {
            config = toml.parse(config);

            // Make sure that we have defaults
            config = merge(defaultConfig, config);
        } catch (e) {
            console.error(chalk.red(chalk.bold("ERROR:"),
                "Config Parsing error on",
                chalk.gray(
                    "line", chalk.bold.cyan(e.line) + ",",
                    "column", chalk.bold.cyan(e.column) + ":\n>"),
                chalk.yellow(e.message)));

            process.exit(1);
        }
    } catch {
        console.log(chalk.red(chalk.bold("ERROR:"), chalk.reset("config.toml"), chalk.red("is missing!")));
        if (!process.stdin.isTTY) {
            console.log(chalk.red(chalk.bold("ERROR:"), "Aborting due to unrecoverable error..."));
            process.exit(1);
        }


        const answers = await inquirer.prompt([
            {
                type: "confirm",
                name: "generate",
                message: "Would you like to interactively generate a config?",
                default: true
            }
        ]);

        if (answers.generate) {
            let confirm: boolean, configToml: string;
            do {
                config = await promptConfig();
                configToml = tomlGenerator(config as any);

                console.log(configToml);
                confirm = (await inquirer.prompt([
                    {
                        type: "confirm",
                        name: "confirm",
                        message: "Does the above config look right?"
                    }
                ])).confirm;
            } while (!confirm);

            console.log(chalk.cyan.bold("INFO:"), "Saving generated config...");
            writeFileSync("./config.toml", TOML_HEADER + configToml);
        } else {
            console.log(chalk.cyan.bold("INFO:"), "Aborting due to missing config...");
            process.exit(1);
        }
    }

    validateConfig(config);

    return config;
}

let cachedConfig: DumpyConfig;
let fetchingConfig: boolean, fetchQueue: (() => void)[] = [];
/**
 * Fetch the application config. For the first call in main this is an asyncronous
 * operation that may involve user interaction, but all subsequent calls are memoized.
 */
export async function getConfig(): Promise<DumpyConfig> {
    if (cachedConfig) {
        return cachedConfig;
    }

    if (fetchingConfig) {
        return new Promise(resolve => fetchQueue.push(() => {
            resolve(cachedConfig);
        }));
    }

    fetchingConfig = true;
    cachedConfig = await fetchConfig();

    fetchQueue = fetchQueue.filter(cb => cb());
    return cachedConfig;
}

/**
 * Fetch the config Meta section, applying any overrides set for alternate domains.
 * @param domain The hostname (e.g. `example.com`) of the request, this is used to
 * apply any overrides which may have been set per-domain.
 */
export async function getSiteConfig(domain: string): Promise<SiteConfig> {
    const config = await getConfig();
    const baseConfig = {...config.meta};
    const subConfig = config.meta.overrides
        && (Object
            .values(config.meta.overrides)
            .find(s => s.domain === domain));

    return { __brand: "_dumpy_site_", ...Object.assign(baseConfig, subConfig) };
}
