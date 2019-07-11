const vscode = require('vscode');
const fs = require('fs');
// const path = require('path');
const omil = require('omil');
const {
    compileSass
} = require('omil/libs/styles/extension');

const transformJsx = require('omil/libs/scripts/extension/transform');
const prettier = require('prettier');
const os = require('os');
// const { exec } = require('child_process');

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
        console.log('write success');
    });
}

// JSX
const writeJsxFileContext = async (path, data) => {
    const code = prettier.format(data, {
        parser: "babel",
    });
    const jsxObj = await transformJsx(code, null);
    console.log(jsxObj.code);
    fs.writeFile(`${path}.eno.jsx`, jsxObj.code, () => {
        console.log('write success');
    });
}

// SCSS
const writeScssFileContext = (path, data) => {
    path = handleFilePath(path, 5);
    const code = prettier.format(data, {
        parser: "css",
    });
    fs.writeFile(`${path}.css`, code, () => {
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
                callback(data) {
                    console.log(data)
                    // create jsx file and write component jsx 
                    writeHtmlFileContext(path, data);
                }
            });
        case '.vue':
        case '.eno':
            // console.log(fileNameWithoutSuffixArray);
            console.log(omil);
            // convert jsx file
            omil({
                type: 'extension',
                options: null,
                source: fileContext,
                callback(data) {
                    console.log(data)
                    // create jsx file and write component jsx 
                    writeJsFileContext(path, data);
                }
            });
            // convert html file

            break;
        // case '.jsx':
        //     // console.log(fileNameWithoutSuffixArray);
        //     console.log(path, fileContext);
        //     writeJsxFileContext(path, fileContext);
        //     break;
        // case '.ts':
        // case '.tsx':
        //     console.log('typescript', path);
        //     exec(`tsc ${path}`, (err, stdout, stderr) => {
        //         if (err) {
        //             console.error(err);
        //             return;
        //         }
        //         console.log(stdout);
        //     });
        //     break;
        case '.scss':
            compileSass(fileContext).then((data) => {
                console.log(data.text);
                writeScssFileContext(path, data.text);
            })
            break;
        default:
            console.log('Not omi file!')
            break;
    }
    // return fileNameWithoutSuffix;
}

function activate(context) {
    console.log(context)
    // context.subscriptions.push(vscode.languages.setLanguageConfiguration('html'));
    // when you click ctrl+s, fn will action

    vscode.workspace.onDidSaveTextDocument((document) => {
        const {
            fileName
        } = document
        const fileContext = readFileContext(fileName);
        console.log(fileName, fileContext);
        readFileName(fileName, fileContext);
    });
}

exports.activate = activate;