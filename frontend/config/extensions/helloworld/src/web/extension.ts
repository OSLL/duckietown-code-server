import * as vscode from 'vscode';
import {ProgressLocation} from 'vscode';
import {LogMsgTreeProvider} from './testLog';
import * as os from 'os';
import {ConstantBackoff, WebsocketBuilder} from 'websocket-ts';
import {Queue} from 'queue-typescript';
//import  fetch  from 'node-fetch';


const backEndPort = 5001;
const config = {local: `http://localhost:${backEndPort}`};

// get duckiebot name for building and running solution
const hostName = os.hostname();

const q = new Queue<string>();

const ws = new WebsocketBuilder(`ws://localhost:${backEndPort}/notifications`)
    .withBackoff(new ConstantBackoff(1000))
    .onMessage((i, ev) => {
        q.enqueue(ev.data);
    })
    .build();

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

    const consoleLogHelloWorld = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World!'); //Проверка работы
    });

    const build = vscode.commands.registerCommand('extension.build', async () => {
        vscode.window.withProgress({
            location: ProgressLocation.Notification,
            title: "Building...",
            cancellable: false
        }, async (progress, token) => {

            let response = await apiRequest('/build');
            console.log(`GET response.message: ${response}`);
            //vscode.window.showInformationMessage(response);

            return new Promise<void>(resolve => {
                setTimeout(() => {

                    let obj = q.removeTail();
                    if (!(obj && obj.includes("ended"))) {
                        resolve();
                    }
                }, 5000);
            });
        });
    });

    const run = vscode.commands.registerCommand('extension.run', async () => {
        vscode.window.withProgress({
            location: ProgressLocation.Notification,
            title: "Running...",
            cancellable: false
        }, async (progress, token) => {

            let response = await apiRequest('/run');
            console.log(`GET response.message: ${response}`);
            //vscode.window.showInformationMessage(response);

            return new Promise<void>(resolve => {
                setTimeout(() => {

                    let obj = q.removeTail();
                    if (!(obj && obj.includes("ended"))) {
                        resolve();
                    }
                }, 5000);
            });
        });
    });

    const stop = vscode.commands.registerCommand('extension.stop', async () => {
       vscode.window.withProgress({
            location: ProgressLocation.Notification,
            title: "Stopping...",
            cancellable: false
        }, async (progress, token) => {

            let response = await apiRequest('/stop');
            console.log(`GET response.message: ${response}`);
            //vscode.window.showInformationMessage(response);

            return new Promise<void>(resolve => {
                setTimeout(() => {

                    let obj = q.removeTail();
                    if (!(obj && obj.includes("ended"))) {
                        resolve();
                    }
                }, 5000);
            });
        });
    });

    context.subscriptions.push(consoleLogHelloWorld);
    context.subscriptions.push(build);
    context.subscriptions.push(run);
    context.subscriptions.push(stop);

}

// this method is called when your extension is deactivated
export function deactivate() {
}


