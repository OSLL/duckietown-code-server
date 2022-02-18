"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const node_fetch_1 = require("node-fetch");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "helloworld" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('helloworld.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from HelloWorld!');
    });
    let test = vscode.commands.registerCommand('helloworld.createFile', () => {
        const htmlTemplate = '<!DOCTYPE html>\n' +
            '<html lang="en">\n' +
            '<head>\n' +
            '  <meta charset="UTF-8">\n' +
            '  <title>Title</title>\n' +
            '</head>\n' +
            '<body>\n' +
            '\n' +
            '</body>\n' +
            '</html>\n';
        let folderPath;
        if (vscode.workspace.workspaceFolders) {
            folderPath = vscode.workspace.workspaceFolders[0].uri
                .toString()
                .split(":")[1];
        }
        // @ts-ignore
        console.log(`Folder path: ${folderPath}`);
        // @ts-ignore
        fs.writeFile(path.join(folderPath, "index.html"), htmlTemplate, err => {
            if (err) {
                console.error(err);
                vscode.window.showErrorMessage("Unable to create file");
            }
            else {
                vscode.window.showInformationMessage("File created");
            }
        });
        vscode.window.showInformationMessage('File created!');
    });
    let request = vscode.commands.registerCommand('helloworld.requestToServer', async () => {
        const response = await (0, node_fetch_1.default)('http://localhost:5000/todo/api/v1.0/tasks', { method: 'GET', body: 'a=1' });
        const data = await response.json();
        console.log(data);
        vscode.window.showInformationMessage('Hello World from HelloWorld!');
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(test);
    context.subscriptions.push(request);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map