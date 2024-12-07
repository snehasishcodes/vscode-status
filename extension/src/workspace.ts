import * as vscode from 'vscode';
import log, { LogLevel } from './log';

function workspace() {
    const workspaceFolders = vscode.workspace.workspaceFolders;

    if (!workspaceFolders) {
        log(LogLevel.Info, "No Open Workspace.");
        return;
    }

    const workspaceFolder = workspaceFolders[0];
    const workspaceName = workspaceFolder.name;
    const workspacePath = workspaceFolder.uri.fsPath;

    return {
        name: workspaceName,
        path: workspacePath
    };
}

export default workspace;