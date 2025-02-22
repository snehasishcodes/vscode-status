import * as vscode from "vscode";
import status from "./status";
import update from "./update";
import credentials from "./credentials";
import log, { LogLevel } from "./log";
import throttle from "./throttle";

const extensionID = "vscode-status";

// send status
const send = async (uid: string, token: string) => {
	// get editor details
	const details = status();
	if (details) {
		// initial update after loading vscode
		update(uid, token, details);
	}
};

async function activate(context: vscode.ExtensionContext) {
	log(LogLevel.Info, "[INFO]: Extension Started.");

	// display UID in the extension settings
	const config = vscode.workspace.getConfiguration(extensionID);

	// create right aligned status bar (on the bottom)
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.tooltip = "VSCode Status. Click to open your API URL.";
	statusBarItem.text = "$(plug) Initialising";
	statusBarItem.command = `${extensionID}.openURL`;
	statusBarItem.show();

	let uid = context.globalState.get<string | undefined>(`${extensionID}.uid`);
	let token = context.globalState.get<string | undefined>(`${extensionID}.token`);

	if (!uid || !token) {
		statusBarItem.text = `$(plug) Authenticating`;

		const creds = await credentials();
		uid = creds.id;
		token = creds.token;

		context.globalState.update(`${extensionID}.uid`, uid);
		context.globalState.update(`${extensionID}.token`, token);

		config.update("uid", uid, vscode.ConfigurationTarget.Global);
		config.update("token", token, vscode.ConfigurationTarget.Global);
		log(LogLevel.Info, "[INFO]: Generated new credentials and stored in extension settings.");
	}

	// start updating the status
	send(uid!, token!);

	// show message once extension activates
	vscode.window.showInformationMessage("VSCode Status: Active", "Open API Endpoint", "GitHub").then((selectedButton) => {
		if (selectedButton === "Open API Endpoint") {
			vscode.env.openExternal(vscode.Uri.parse(`https://vscode.snehasish.xyz/api/users/${uid}`));
		}

		if (selectedButton === "GitHub") {
			vscode.env.openExternal(vscode.Uri.parse(`https://github.com/snehasishcodes/vscode-status`));
		}
	});

	statusBarItem.text = `$(plug) VSCode Status`;

	// if UID or token was edited reset it back to original
	config.update("uid", uid, vscode.ConfigurationTarget.Global);
	config.update("token", token, vscode.ConfigurationTarget.Global);

	const activeTextEditorChangeListener = vscode.window.onDidChangeActiveTextEditor(() => send(uid!, token!));
	const textDocumentChangeListener = vscode.workspace.onDidChangeTextDocument(throttle(() => send(uid!, token!), 3000));
	const textDocumentCloseListener = vscode.workspace.onDidCloseTextDocument(() => send(uid!, token!));
	const workspaceFolderChangeListener = vscode.workspace.onDidChangeWorkspaceFolders(() => send(uid!, token!));
	const debuggingStartListener = vscode.debug.onDidStartDebugSession(() => send(uid!, token!));
	const debuggingEndListener = vscode.debug.onDidTerminateDebugSession(() => send(uid!, token!));

	const openURLCommand = vscode.commands.registerCommand(`${extensionID}.openURL`, () => {
		vscode.env.openExternal(vscode.Uri.parse(`https://vscode.snehasish.xyz/api/users/${uid}`));
	});

	const resetCredentialsCommand = vscode.commands.registerCommand(`${extensionID}.openCustomSettings`, async () => {
		const creds = await credentials();

		uid = creds.id;
		token = creds.token;

		context.globalState.update(`${extensionID}.uid`, uid);
		context.globalState.update(`${extensionID}.token`, token);

		config.update("uid", uid, vscode.ConfigurationTarget.Global);
		config.update("token", token, vscode.ConfigurationTarget.Global);

		vscode.window.showInformationMessage("Reset VSCode Status Credentials");
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
		resetCredentialsCommand
	);
};

function deactivate(context: vscode.ExtensionContext) {
	let uid = context.globalState.get<string | undefined>(`${extensionID}.uid`);
	let token = context.globalState.get<string | undefined>(`${extensionID}.token`);

	if (uid && token) {
		update(uid, token);
	}
};

module.exports = {
	activate,
	deactivate
};