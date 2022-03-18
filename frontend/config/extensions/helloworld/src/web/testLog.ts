import * as vscode from 'vscode';

export class LogMsgTreeProvider implements vscode.TreeDataProvider<any> {
    private _onDidChangeTreeData: vscode.EventEmitter<any | undefined | void> = new vscode.EventEmitter<any | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<any | undefined | void> = this._onDidChangeTreeData.event;

    private test = vscode.window.createOutputChannel("test");

    constructor(private workspaceRoot: string | undefined) {
    }
    getTreeItem(element: any): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: any): vscode.ProviderResult<any[]> {
		return Promise.resolve([]);
    }

    refresh(): void {
        this.test.appendLine("Clicked");
        // @ts-ignore
        this._onDidChangeTreeData.fire();        
    }
}