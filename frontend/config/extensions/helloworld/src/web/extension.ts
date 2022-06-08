import * as vscode from 'vscode';
import {LogMsgTreeProvider} from '../web/testLog';
import * as os from 'os';

//import  fetch  from 'node-fetch';


const enum ERunningStatuses {
    started = "started",
    running = "running",
    finished = "finished"
}

const backEndPort = 5001;
const config = {local: `http://localhost:${backEndPort}`};

let isBuildRunning = false; // sorry for this. (should figure out how to setup state ?)

// get duckiebot name for building and running solution
const hostName = os.hostname()

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

    // vscode.commands.executeCommand('setContext', 'canRunBuildCommand', false);
    // todo: are there any way to disable button, while building for example?


    //############################################

    async function pollForExecution(method: string): Promise<ERunningStatuses> {
        try {
            let response: ERunningStatuses = await apiRequest(method);

            if ([ERunningStatuses.running, ERunningStatuses.started].includes(response)) {

                await new Promise(resolve => setTimeout(resolve, 1000));
                await pollForExecution(method);

            } else if (response === ERunningStatuses.finished) {
                // nothing ?
            }

        } catch (error) {
            vscode.window.showInformationMessage("Smtng went wrong during polling");
            console.error(error);
        }
        return ERunningStatuses.finished;
    }

    const fetchWithProgressBar = async (requestFor: string) => {
        return vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Try to " + requestFor.replace('/', ''),
            cancellable: false,
        }, async (progress, token) => {
            progress.report({message: "Running... "});

            let response: ERunningStatuses | string;
            if (requestFor === '/build') {
                isBuildRunning = true;
                response = await pollForExecution(requestFor);
                isBuildRunning = false;
            } else {
                response = await apiRequest(requestFor);
            }

            return response;
        });
    };

    const consoleLogHelloWorld = vscode.commands.registerCommand('extension.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World!'); //Проверка работы
    });

    const build = vscode.commands.registerCommand('extension.build', async () => {

        if (isBuildRunning) {
            return;
        }
        const response = await fetchWithProgressBar('/build');

        console.log(`GET response.message: ${response}`);
        vscode.window.showInformationMessage("Build " + response);
    });

    const run = vscode.commands.registerCommand('extension.run', async () => {
        let response = await apiRequest('/run');
        console.log(`GET response.message: ${response}`);
        vscode.window.showInformationMessage(response);
    });

    const stop = vscode.commands.registerCommand('extension.stop', async () => {
        let response = await apiRequest('/stop');
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


