import chalk, { Chalk } from "chalk";
import { DumpyConfig, getConfig } from "./config";

const logLevels = [
    "ERROR",
    "WARN",
    "INFO",
    "DEBUG",
    "TRACE"
] as const;

export type LogLevel = typeof logLevels[number];
const logLevelHierarchy: Record<LogLevel, number> = logLevels.reduce(((acc, level, idx) => ({...acc, [level]: idx})), {}) as Record<LogLevel, number>;

export class Logger {
    private prefix: string
    private cachedConfig: DumpyConfig
    private tracker = 0

    /**
     * @param prefix A descriptive module name which will be included in log messages
     */
    constructor(prefix: string) {
        this.prefix = prefix;
    }

    /**
     * Generates a log function based on log level intrinsics
     * - `track` indicates whether the log should include numbered traces
     */
    private logbase(config: {
        level: LogLevel
        color: Chalk
        track?: boolean
    }) {
        return (...msg: unknown[]) => {
            const trackNo = config.track ? this.tracker++ : 0;

            if (!this.cachedConfig) {
                return void getConfig().then(dc => {
                    this.cachedConfig = dc;
                    this.logbase(config)(...msg);
                }).catch(() => {
                    console.log("deferredresolveE");
                    console.error("ERROR loading config for log: deferred msg: ", ...msg);
                });
            }

            const maxLevel = logLevelHierarchy[this.cachedConfig.server.logLevel];
            const thisLevel = logLevelHierarchy[config.level];
            if (thisLevel > maxLevel) return;

            console.log(
                chalk.gray(`[${new Date().toUTCString()}]`),
                config.color(this.prefix) + ":",
                config.color.bold(config.level) +
                (config.track ? chalk.reset` ({yellow ${trackNo}})` : "") + ":",
                ...msg);
        };
    }

    public error = this.logbase({ level: "ERROR", color: chalk.red });
    public warn  = this.logbase({ level: "WARN",  color: chalk.yellowBright });
    public info  = this.logbase({ level: "INFO",  color: chalk.cyan });
    public debug = this.logbase({ level: "DEBUG", color: chalk.magenta });
    public trace = this.logbase({ level: "TRACE", color: chalk.greenBright, track: true });
}
