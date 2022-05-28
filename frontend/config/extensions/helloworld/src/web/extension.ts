import * as vscode from 'vscode';
import {LogMsgTreeProvider} from '../web/testLog';
//import  fetch  from 'node-fetch';


const backEndPort = 5001;
const config = {local: `http://localhost:${backEndPort}`};

// get duckiebot name for building and running solution
//const os = require('os');
//const hostName = os.hostname()

const hostName = "autobot1"

async function apiRequest(name = '/') {
    return await fetch(config.local + name + `?hostname=${hostName}`)
        .then((response) => response.json()).then(json => json.message)
        .catch(error => `Error message: ${error}`);
}


export function activate(context: vscode.ExtensionContext) {

    const rootPath = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
        ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;

    const logMsgProvider = new LogMsgTreeProvider(rootPath);

    vscode.window.registerTreeDataProvider('commands', logMsgProvider);



//############################################

    const progressBar = async (requestFor: string) => {
        return await vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Try to " + requestFor.replace('/', ''),
            cancellable: false,
        }, async (progress, token) => {
            progress.report({increment: 47, message: "Running... "});
            let response = await apiRequest(requestFor);

            return response;
        });
    }


    const consoleLogHelloWorld = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World!'); //Проверка работы
    });

    const build = vscode.commands.registerCommand('extension.build', async () => {
        let response = await progressBar('/build');
        console.log(`GET response.message: ${response}`);
        vscode.window.showInformationMessage(response);
    });

    const run = vscode.commands.registerCommand('extension.run', async () => {
        let response = await progressBar('/run');
        console.log(`GET response.message: ${response}`);
        vscode.window.showInformationMessage(response);
    });

    const stop = vscode.commands.registerCommand('extension.stop', async () => {
        let response = await progressBar('/stop');
        console.log(`GET response.message: ${response}`);
        vscode.window.showInformationMessage(response);
    });

    context.subscriptions.push(consoleLogHelloWorld);
    context.subscriptions.push(build);
    context.subscriptions.push(run);
    context.subscriptions.push(stop);

}


// this method is called when your extension is deactivated
export function deactivate() {
}
