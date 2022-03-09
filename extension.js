// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "devsockws" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('devsockws.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from devsockws!');

		var statusBarItem = vscode.window.createStatusBarItem();

		statusBarItem.text = "$(file-code) DevCorp";
		statusBarItem.tooltip = "Click me!";
		statusBarItem.command = "devsockws.changeTheme";

		statusBarItem.show();

	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(
		vscode.commands.registerCommand('devsockws.changeTheme', async () => {
            const answer = await vscode.window.showInformationMessage(
                "What theme would you like?",
                "Red",
                "White"
            );

            if (answer == 'Red') {
                vscode.workspace.getConfiguration().update("workbench.colorTheme","Red");
            }
            else {
                const panel = vscode.window.createWebviewPanel(
					"devcorp",
					"DevCorp Ths is a title",
					vscode.ViewColumn.Two,{}
				);

				panel.webview.html = getDevCorpContent();
            }
			vscode.workspace.getConfiguration().update("workbench.colorTheme", "Red");
        })
	);
}

function getDevCorpContent(){
	return `<!DOCTYPE html> 
	<html lang="en"> 
	<head> 
	<meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
	<title>DevSoc Workshop</title> 
	</head> 
		<body> 
			<img src="https://c.tenor.com/gNFhr7ZyF1wAAAAd/oh-no.gif" width="300" /> 
			<br><br>
			<img src="https://c.tenor.com/4OOGVRbcylQAAAAd/seduce-cat.gif" width="300" /> 
		</body> 
	</html>`;
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
