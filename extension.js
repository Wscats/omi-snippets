const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const omil = require('omil');
const prettier = require('prettier');

/**
 * 从某个HTML文件读取能被Webview加载的HTML内容
 * @param {*} context 上下文
 * @param {*} templatePath 相对于插件根目录的html文件相对路径
 */
const getWebViewContent = (context, templatePath) => {
    const resourcePath = path.join(context.extensionPath, templatePath);
    const dirPath = path.dirname(resourcePath);
    let html = fs.readFileSync(resourcePath, 'utf-8');
    // vscode不支持直接加载本地资源，需要替换成其专有路径格式，这里只是简单的将样式和JS的路径替换
    html = html.replace(/(<link.+?href="|<script.+?src="|<img.+?src=")([^http].+?)"/g, (m, $1, $2) => {
        return $1 + vscode.Uri.file(path.resolve(dirPath, $2)).with({ scheme: 'vscode-resource' }).toString() + '"';
    });
    return html;
}

// fileType => .omi .scss .html
const fileType = (filename) => {
    const index1 = filename.lastIndexOf(".");
    const index2 = filename.length;
    const type = filename.substring(index1, index2);
    return type;
}

const readFileContext = (path) => {
    return fs.readFileSync(path).toString();
}

// /xxx/xxx.omi => /xxx/xxx
const handleFilePath = (path, length) => {
    return path = path.substring(0, path.length - length);
}

// JSX
const writeJsFileContext = (path, data) => {
    path = handleFilePath(path, 4);
    console.log(path);
    const code = prettier.format(data, {
        parser: "babel",
    });
    fs.writeFile(`${path}.js`, code, () => {
        vscode.window.showInformationMessage(`Write Success! Js Path: ${path}.js`);
        console.log('write success');
    });

}

// HTML
const writeHtmlFileContext = (path, data) => {
    path = handleFilePath(path, 4);
    const code = prettier.format(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Eno Yao</title>
        </head>
        <body>
        <script src="https://tencent.github.io/omi/packages/omi/dist/omi.js"></script>
        <script>
        ${data}
        </script>
        </body>
        </html>
    `, {
        parser: "html",
    });
    fs.writeFile(`${path}.html`,
        code
        , () => {
            console.log('write success');
        });
}

const readFileName = (path, fileContext) => {
    let fileSuffix = fileType(path);
    console.log(fileSuffix);
    switch (fileSuffix) {
        case '.omi':
            omil({
                type: 'extension',
                file: 'html',
                options: null,
                source: fileContext,
                callback({
                    status,
                    allScript,
                    e
                }) {
                    console.log({
                        status,
                        allScript,
                        e
                    })
                    // create jsx file and write component jsx 
                    if (status === 'success') {
                        writeHtmlFileContext(path, allScript);
                    } else {
                        vscode.window.showErrorMessage(`Js Error: ${e}`);
                    }
                }
            });
        case '.eno':
            omil({
                type: 'extension',
                options: null,
                source: fileContext,
                callback({
                    status,
                    allScript,
                    e
                }) {
                    // create jsx file and write component jsx 
                    if (status === 'success') {
                        writeJsFileContext(path, allScript);
                    } else {
                        console.log({
                            status,
                            allScript,
                            e
                        })
                        vscode.window.showErrorMessage(`Js Error: ${e}`);
                    }
                }
            });
            break;
    }
}

function activate(context) {
    console.log(context)
    // when you click ctrl+s, fn will action
    vscode.workspace.onDidSaveTextDocument((document) => {
        const {
            fileName
        } = document
        const fileContext = readFileContext(fileName);
        readFileName(fileName, fileContext);
    });

    // 欢迎提示
    let disposable = vscode.commands.registerCommand('extension.eno', function () {
        const panel = vscode.window.createWebviewPanel(
            'testWelcome', // viewType
            "Welcome to Eno Snippets", // 视图标题
            vscode.ViewColumn.One, // 显示在编辑器的哪个部位
            {
                enableScripts: true, // 启用JS，默认禁用
                retainContextWhenHidden: true, // webview被隐藏时保持状态，避免被重置
            }
        );
        panel.webview.html = getWebViewContent(context, './libs/welcome/template.html')
    });
    context.subscriptions.push(disposable);
    // 如果设置里面开启了欢迎页显示，启动欢迎页
    // const key = 'vscodePluginDemo.showTip';
    // if (vscode.workspace.getConfiguration().get(key)) {
    //     vscode.commands.executeCommand('extension.eno');
    // }
}

exports.activate = activate;