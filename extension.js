const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const omil = require('omil');
const {
    compileSass
} = require('omil/libs/styles/extension');
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
        fileNameWithoutSuffix = path.match(/\\([^\\]+)\.(omi|eno|scss)$/g);
    } else {
        fileNameWithoutSuffix = path.match(/\/([^\/]+)\.(omi|eno|scss)$/g);
    }

    console.log(platform, fileNameWithoutSuffix);
    const fileNameWithoutSuffixArray = fileNameWithoutSuffix[0].split('.');
    console.log(fileNameWithoutSuffixArray[fileNameWithoutSuffixArray.length - 1]);
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
                    writeJsxFileContext(path, data);
                }
            });
            break;
        case 'scss':
            // omil({
            //     sass: 'extension',
            //     options: null,
            //     source: `
            //         <template>
            //             <div>eno</div>
            //         </template>
            //     `,
            //     callback(data) {
            //         console.log(data);
            //     }
            // }).
            compileSass(fileContext).then((data)=>{
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