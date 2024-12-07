import * as vscode from "vscode";
import * as fs from "fs";
import { parseFile } from "./parse";
import getWorkspace from "./workspace";
import log, { LogLevel } from "./log";

export type StatusType = {
    file: {
        name: string
        extension: string
        path: string
        language: string
        size: string
        lines: number
        position: {
            line: number
            column: number
        }
        errors: number
    }
    workspace: {
        name: string
        path: string
    }
    debugging: boolean
}

export default function status(): StatusType | undefined {
    const editor = vscode.window.activeTextEditor;

    if (editor) {
        try {
            const filePath = editor.document.uri.fsPath;
            const { name, extension } = parseFile(filePath);
            const language = editor.document.languageId;
            const lines = editor.document.lineCount;
            const position = editor.selection.active;
            let fileSize: string;

            const stats = fs.statSync(filePath);
            const sizeInBytes = stats.size;
            const sizeInKB = (sizeInBytes / 1024).toFixed(2);
            fileSize = `${sizeInKB} KB`;

            const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
            const errors = diagnostics.length ?? 0;

            const workspace = getWorkspace();
            const workspaceName = workspace?.name;
            const workspacePath = workspace?.path;

            const debugSession = vscode.debug.activeDebugSession;
            let debugging = false;

            if (debugSession) {
                debugging = true;
            }

            return {
                file: {
                    name,
                    extension,
                    path: filePath,
                    language,
                    size: fileSize,
                    lines,
                    position: {
                        line: position.line + 1,
                        column: position.character + 1
                    },
                    errors: errors
                },
                workspace: {
                    name: workspaceName,
                    path: workspacePath
                },
                debugging
            } as StatusType;
        }
        catch (err) {
            log(LogLevel.Error, `${err}`);
        }
    }
}