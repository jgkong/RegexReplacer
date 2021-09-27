// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  const regexTreeProvider = new RegexProvider();
  vscode.window.registerTreeDataProvider("regexList", regexTreeProvider);

  console.log('Congratulations, your extension "regex-replacer" is now active!');

  context.subscriptions.push(vscode.commands.registerCommand('regex-replacer.applyRegex', (regex: Regex) => {
    vscode.commands.executeCommand('workbench.action.findInFiles', {
      query: regex.needle,
      replace: regex.replace,
      triggerSearch: true,
      isRegex: true
    }).then(() => {
      setTimeout(() => {
        // vscode.commands.executeCommand('search.action.replaceAll');
      }, 500);
    });
  }));

}

// this method is called when your extension is deactivated
export function deactivate() {}


export class RegexProvider implements vscode.TreeDataProvider<Regex> {
  getTreeItem(element: Regex): vscode.TreeItem {
    return element;
  }

  getChildren(element?: Regex): Thenable<Regex[]> {
    if (element) {
      return Promise.resolve([]);
    } else {
      const ret = new Regex("Replace String", "string", "str", vscode.TreeItemCollapsibleState.None);
      return Promise.resolve([ret]);
    }
  }
}

class Regex extends vscode.TreeItem {
  constructor(
    public name: string,
    public needle: string,
    public replace: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState
  ) {
    super(name, collapsibleState);
    this.tooltip = `${this.label}`;
    this.description = `/${this.needle}/${this.replace}`;
  }
}
