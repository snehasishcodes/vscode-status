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
            const workspaceName = workspace?.name ?? null;
            const workspacePath = workspace?.path ?? null;

            const debugSession = vscode.debug.activeDebugSession;
            let debugging = false;

            if (debugSession) {
                debugging = true;
            }

            return {
                file: {
                    name: name ?? null,
                    extension: extension ?? null,
                    path: filePath ?? null,
                    language: language ?? null,
                    size: fileSize ?? null,
                    lines: lines ?? 0,
                    position: {
                        line: position.line ? position.line + 1 : 0,
                        column: position.character ? position.character + 1 : 0
                    },
                    errors: errors ?? 0
                },
                workspace: {
                    name: workspaceName ?? null,
                    path: workspacePath ?? null
                },
                debugging
            } as StatusType;
        }
        catch (err) {
            log(LogLevel.Error, `${err}`);
        }
    }
}