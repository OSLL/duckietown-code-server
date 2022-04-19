import * as vscode from 'vscode';
import { LogMsgTreeProvider } from '../web/testLog';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
		logMsgProvider.refresh();
	});

	const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
	? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

	const logMsgProvider = new LogMsgTreeProvider(rootPath);
	vscode.window.registerTreeDataProvider('test', logMsgProvider);
	
	const kek = vscode.commands.registerCommand('test.refreshEntry', () => logMsgProvider.refresh());

	context.subscriptions.push(kek);

}

// this method is called when your extension is deactivated
export function deactivate() {}
