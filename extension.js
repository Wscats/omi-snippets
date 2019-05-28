const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const omil = require('omil');
const prettier = require('prettier')

const readFileContext = (path) => {
    return fs.readFileSync(path).toString();
}

const writeFileContext = (path, data) => {
    const code = prettier.format(data, {
        parser: "babel",
    });
    fs.writeFile(`${path}.jsx`, code, () => {
        console.log('写入成功')
    });
}

const readFileName = (path, fileContext) => {
    const fileNameWithoutSuffix = path.match(/\/([^\/]+)\.omi|eno$/g);
    const fileNameWithoutSuffixArray = fileNameWithoutSuffix[0].split('.');
    switch (fileNameWithoutSuffixArray[fileNameWithoutSuffixArray.length - 1]) {
        case 'omi':
            console.log(fileNameWithoutSuffixArray);
            console.log(omil);
            omil({
                sass: 'extension',
                options: null,
                source: fileContext,
                callback(data) {
                    console.log(data)
                    // create jsx file and write component jsx 
                    writeFileContext(path, data)
                }
            });
            break;
        default:
            break;
    }
    return fileNameWithoutSuffix;
}

function activate(context) {
    // when you click ctrl+s, fn will action
    vscode.workspace.onDidSaveTextDocument((document) => {
        const {
            fileName
        } = document
        const fileContext = readFileContext(fileName);
        readFileName(fileName, fileContext);
    });
}

exports.activate = activate;