import * as path from "path";

export function parseFile(filePath: string) {
    const fileNameWithExtension = path.basename(filePath);

    const extension = path.extname(fileNameWithExtension).slice(1);
    const name = path.basename(fileNameWithExtension, path.extname(fileNameWithExtension));

    return {
        name: name,
        extension: extension
    };
}