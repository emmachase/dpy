import { randomString36 } from "../util/crypto";

class TemplateError extends Error {}

type TemplateFunction = (...args: string[]) => Promise<string>;
const templateCommands: Record<string, TemplateFunction | undefined> = {

    async chars(countStr) {
        const count = +countStr;
        if (!count) throw new TemplateError("invalid count for chars template");

        return await randomString36(count);
    }

};

async function replaceAsync(str: string, regex: RegExp, asyncFn: TemplateFunction) {
    const promises: Promise<string>[] = [];
    str.replace(regex, (match, ...args) => {
        const promise = asyncFn(match, ...args);
        promises.push(promise);

        return ""; // Dummy, doesn't matter what we give
    });

    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift() ?? "");
}

export function pickTemplateName(template: string): Promise<string> {
    return replaceAsync(template, /{(.+?)}/g, async (_, command: string) => {
        const [name, ...args] = command.split(/\s+/);

        const resolver = templateCommands[name];
        if (resolver) {
            return resolver(...args);
        } else {
            throw new TemplateError(`invalid command '${name}'`);
        }
    });
}
