import * as vscode from 'vscode';
import { LogMsgTreeProvider } from '../web/testLog';
//import  fetch  from 'node-fetch';


const backEndPort = 5000;
const config ={local:`http://localhost:${backEndPort}`};

async function apiRequest(name = '/'){
	return await fetch(config.local + name)
				.then((response) => response.json()).then(json => json.message)
				.catch(error => `Error message: ${error}`);
}

export function activate(context: vscode.ExtensionContext) {
let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
	logMsgProvider.refresh();
	vscode.window.showInformationMessage('Is started!');
});
const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

const logMsgProvider = new LogMsgTreeProvider(rootPath);
vscode.window.registerTreeDataProvider('test', logMsgProvider);
const arrayOfCommand = []

const kek = vscode.commands.registerCommand('test.refreshEntry', () => logMsgProvider.refresh());

context.subscriptions.push(kek);

//############################################
const consoleLogHelloWorld = vscode.commands.registerCommand('extension.helloWorld', () => {
	vscode.window.showInformationMessage('Hello World!'); //Проверка работы 
});

const build = vscode.commands.registerCommand('extension.build', async () => {
		let response = await apiRequest('/build');
		console.log(`GET response.message: ${response}`);
		vscode.window.showInformationMessage(response);
});
	
const run = vscode.commands.registerCommand('extension.run', async () => {
		let response = await apiRequest('/run');
		console.log(`GET response.message: ${response}`);
		vscode.window.showInformationMessage(response);
});

context.subscriptions.push(consoleLogHelloWorld);
context.subscriptions.push(build);
context.subscriptions.push(run);

}



// this method is called when your extension is deactivated
export function deactivate() {}
