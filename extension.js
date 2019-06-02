const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const omil = require('omil');
const {
    compileSass
} = require('omil/libs/styles/extension');

const transformJsx = require('omil/libs/scripts/extension/transform');
const prettier = require('prettier');
const os = require('os');

const readFileContext = (path) => {
    return fs.readFileSync(path).toString();
}

// JSX
const writeJsxFileContext = (path, data) => {
    const code = prettier.format(data, {
        parser: "babel",
    });
    fs.writeFile(`${path}.jsx`, code, () => {
        console.log('写入成功');
    });
}

// JSX
const writeJsxFileContext2 = async (path, data) => {
    const code = prettier.format(data, {
        parser: "babel",
    });
    const jsxObj = await transformJsx(code, null);
    console.log(jsxObj.code);
    fs.writeFile(`${path}.eno.jsx`, jsxObj.code, () => {
        console.log('写入成功');
    });
}

// SCSS
const writeScssFileContext = (path, data) => {
    const code = prettier.format(data, {
        parser: "css",
    });
    fs.writeFile(`${path}.css`, code, () => {
        console.log('写入成功');
    });
}

const readFileName = (path, fileContext) => {
    const platform = os.platform();
    let fileNameWithoutSuffix;
    if (platform === 'win32') {
        fileNameWithoutSuffix = path.match(/\\([^\\]+)\.(omi|eno|scss|jsx)$/g);
    } else {
        fileNameWithoutSuffix = path.match(/\/([^\/]+)\.(omi|eno|scss|jsx)$/g);
    }

    console.log(platform, fileNameWithoutSuffix);
    const fileNameWithoutSuffixArray = fileNameWithoutSuffix[0].split('.');
    console.log(fileNameWithoutSuffixArray[fileNameWithoutSuffixArray.length - 1]);
    switch (fileNameWithoutSuffixArray[fileNameWithoutSuffixArray.length - 1]) {
        case 'omi':
            console.log(fileNameWithoutSuffixArray);
            console.log(omil);
            omil({
                type: 'extension',
                options: null,
                source: fileContext,
                callback(data) {
                    console.log(data)
                    // create jsx file and write component jsx 
                    writeJsxFileContext(path, data);
                }
            });
            break;
        case 'eno':
            console.log(fileNameWithoutSuffixArray);
            console.log(omil);
            omil({
                type: 'extension',
                options: null,
                source: fileContext,
                callback(data) {
                    console.log(data)
                    // create jsx file and write component jsx 
                    writeJsxFileContext(path, data);
                }
            });
            break;
        case 'jsx':
            console.log(fileNameWithoutSuffixArray);
            console.log(path, fileContext);
            writeJsxFileContext2(path, fileContext);
            break;
        case 'scss':
            compileSass(fileContext).then((data) => {
                console.log(data.text);
                writeScssFileContext(path, data.text);
            })
            break;
        default:
            break;
    }
    return fileNameWithoutSuffix;
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