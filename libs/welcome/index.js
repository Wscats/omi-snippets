const vscode = require('vscode');
// const util = require('./util');
const fs = require('fs');
const path = require('path');
module.exports = function (context) {
    context.subscriptions.push(vscode.commands.registerCommand('extension.showWelcome', function (uri) {
        const panel = vscode.window.createWebviewPanel(
            'testWelcome', // viewType
            "Web is Best !", // 视图标题
            vscode.ViewColumn.One, // 显示在编辑器的哪个部位
            {
                enableScripts: true, // 启用JS，默认禁用
            }
        );
        // let global = { panel };
        panel.webview.html = getWebViewContent(context, '../views/welcome.html');
        panel.webview.onDidReceiveMessage(message => {
            // if (messageHandler[message.cmd]) {
            //     messageHandler[message.cmd](global, message);
            // } else {
            //     util.showError(`未找到名为 ${message.cmd} 回调方法!`);
            // }
        }, undefined, context.subscriptions);
    }));

    // const key = 'vscodePluginDemo.showTip';
    // 如果设置里面开启了欢迎页显示，启动欢迎页
    // if (vscode.workspace.getConfiguration().get(key)) {
    //     vscode.commands.executeCommand('extension.demo.showWelcome');
    // }
};