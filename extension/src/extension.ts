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
	statusBarItem.show();

	// get workspace configurations
	const config = vscode.workspace.getConfiguration("vscode-status");

	let uid: string | undefined = config.get("uid");
	if (!uid) {
		statusBarItem.text = `$(plug) Creating UID`;
		statusBarItem.command = "vscode-status.openURL";
		uid = createUid();
		await config.update("uid", uid, vscode.ConfigurationTarget.Global);
		log(LogLevel.Info, "[INFO]: Generated a new UID and stored.");
	}

	// start updating the status
	await send(uid);
	statusBarItem.text = `$(plug) Active`;

	const activeTextEditorChangeListener = vscode.window.onDidChangeActiveTextEditor(() => send(uid));
	const textDocumentChangeListener = vscode.workspace.onDidChangeTextDocument(throttle(() => send(uid), 5000));
	const workspaceFolderChangeListener = vscode.workspace.onDidChangeWorkspaceFolders(() => send(uid));

	const openURLCommand = vscode.commands.registerCommand("vscode-status.openURL", () => {
		vscode.env.openExternal(vscode.Uri.parse(`https://vscode.snehasish.xyz/users/${uid}`));
	});

	context.subscriptions.push(
		// listener events
		activeTextEditorChangeListener,
		textDocumentChangeListener,
		workspaceFolderChangeListener,
		// commands
		openURLCommand,
	);
};

function deactivate() {
	const config = vscode.workspace.getConfiguration("vscode-status");
	let uid: string | undefined = config.get("uid");

	if (uid) {
		update(uid);
	}
};

module.exports = {
	activate,
	deactivate
};