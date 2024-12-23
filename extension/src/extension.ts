import * as vscode from "vscode";
import status from "./status";
import update from "./update";
import createUid from "./uid";
import log, { LogLevel } from "./log";
import throttle from "./throttle";

// send status
const send = async (uid: string) => {
	// get editor details
	const details = status();
	if (details) {
		// initial update after loading vscode
		update(uid, details);
	}
};

async function activate(context: vscode.ExtensionContext) {
	log(LogLevel.Info, "[INFO]: Extension Started.");

	// create right aligned status bar (on the bottom)
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.tooltip = "VSCode Status. Click to open your API URL.";
	statusBarItem.text = "$(plug) Initialising";
	statusBarItem.command = "vscode-status.openURL";
	statusBarItem.show();

	let uid: string | undefined = context.globalState.get<string | undefined>("vscode-status-uid");
	if (!uid) {
		statusBarItem.text = `$(plug) Creating UID`;
		uid = createUid();
		context.globalState.update("vscode-status-uid", uid);
		log(LogLevel.Info, "[INFO]: Generated a new UID and stored.");
	}

	// start updating the status
	await send(uid);
	vscode.window.showInformationMessage("VSCode Status: Active", "Open API Endpoint").then((selectedButton) => {
		if (selectedButton === "Open API Endpoint") {
			vscode.env.openExternal(vscode.Uri.parse(`https://vscode.snehasish.xyz/api/users/${uid}`));
		}
	});
	statusBarItem.text = `$(plug) Active`;

	const activeTextEditorChangeListener = vscode.window.onDidChangeActiveTextEditor(() => send(uid));
	const textDocumentChangeListener = vscode.workspace.onDidChangeTextDocument(throttle(() => send(uid), 3000));
	const textDocumentCloseListener = vscode.workspace.onDidCloseTextDocument(() => send(uid));
	const workspaceFolderChangeListener = vscode.workspace.onDidChangeWorkspaceFolders(() => send(uid));
	const debuggingStartListener = vscode.debug.onDidStartDebugSession(() => send(uid));
	const debuggingEndListener = vscode.debug.onDidTerminateDebugSession(() => send(uid));

	const openURLCommand = vscode.commands.registerCommand("vscode-status.openURL", () => {
		vscode.env.openExternal(vscode.Uri.parse(`https://vscode.snehasish.xyz/api/users/${uid}`));
	});

	context.subscriptions.push(
		// listener events
		activeTextEditorChangeListener,
		textDocumentChangeListener,
		textDocumentCloseListener,
		workspaceFolderChangeListener,
		debuggingStartListener,
		debuggingEndListener,
		// commands
		openURLCommand,
	);
};

function deactivate(context: vscode.ExtensionContext) {
	let uid: string | undefined = context.globalState.get<string | undefined>("vscode-status-uid");

	if (uid) {
		update(uid);
	}
};

module.exports = {
	activate,
	deactivate
};