import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import omil from 'omil';
import prettier from 'prettier';

/** Omil compiler callback result. */
interface OmilCallbackResult {
  status: 'success' | 'error';
  allScript: string;
  e?: Error;
}

/** Supported file extensions for compilation. */
type CompilableExtension = '.omi' | '.eno';

/**
 * Read an HTML file and convert local resource paths to vscode-resource URIs.
 * @param context - VSCode extension context
 * @param templatePath - Relative path to the HTML template from extension root
 * @returns HTML string with resolved resource URIs
 */
function getWebViewContent(context: vscode.ExtensionContext, templatePath: string): string {
  const resourcePath = path.join(context.extensionPath, templatePath);
  const dirPath = path.dirname(resourcePath);
  let html = fs.readFileSync(resourcePath, 'utf-8');

  // Replace local resource paths with vscode-resource URIs
  html = html.replace(
    /(<link.+?href="|<script.+?src="|<img.+?src=")([^http].+?)"/g,
    (_match: string, prefix: string, relativePath: string) => {
      const uri = vscode.Uri.file(path.resolve(dirPath, relativePath))
        .with({ scheme: 'vscode-resource' });
      return `${prefix}${uri.toString()}"`;
    },
  );

  return html;
}

/**
 * Extract the file extension from a filename.
 * @returns Extension including the dot (e.g. '.omi', '.eno')
 */
function getFileExtension(filename: string): string {
  const dotIndex = filename.lastIndexOf('.');
  return filename.substring(dotIndex);
}

/**
 * Read a file and return its contents as a string.
 */
function readFileContent(filePath: string): string {
  return fs.readFileSync(filePath).toString();
}

/**
 * Remove the file extension from a path.
 * @param filePath - Full file path
 * @param extensionLength - Number of characters to remove from the end
 * @returns Path without the extension
 */
function stripExtension(filePath: string, extensionLength: number): string {
  return filePath.substring(0, filePath.length - extensionLength);
}

/**
 * Compile an .eno file and write the output as a formatted .js file.
 */
function writeJsFile(filePath: string, data: string): void {
  const basePath = stripExtension(filePath, 4);
  const code = prettier.format(data, { parser: 'babel' });

  fs.writeFile(`${basePath}.js`, code, () => {
    vscode.window.showInformationMessage(`Write Success! Js Path: ${basePath}.js`);
  });
}

/**
 * Compile an .omi file and write the output as a formatted .html file.
 */
function writeHtmlFile(filePath: string, data: string): void {
  const basePath = stripExtension(filePath, 4);
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
      <script>${data}</script>
    </body>
    </html>
  `, { parser: 'html' });

  fs.writeFile(`${basePath}.html`, code, () => {
    // HTML file written successfully
  });
}

/**
 * Process a saved file based on its extension.
 * - `.omi` files are compiled to HTML
 * - `.eno` files are compiled to JS
 */
function processFile(filePath: string, fileContent: string): void {
  const extension = getFileExtension(filePath) as CompilableExtension;

  const compilerConfig = {
    '.omi': { file: 'html', writer: writeHtmlFile },
    '.eno': { file: undefined, writer: writeJsFile },
  } as const;

  const config = compilerConfig[extension];
  if (!config) return;

  omil({
    type: 'extension',
    file: config.file,
    options: null,
    source: fileContent,
    callback({ status, allScript, e }: OmilCallbackResult) {
      if (status === 'success') {
        config.writer(filePath, allScript);
      } else {
        vscode.window.showErrorMessage(`Compilation Error: ${e}`);
      }
    },
  });
}

/**
 * Activate the extension.
 * Registers the file-save handler and welcome page command.
 */
export function activate(context: vscode.ExtensionContext): void {
  // Compile .omi/.eno files on save
  vscode.workspace.onDidSaveTextDocument((document: vscode.TextDocument) => {
    const fileContent = readFileContent(document.fileName);
    processFile(document.fileName, fileContent);
  });

  // Register welcome page command
  const disposable = vscode.commands.registerCommand('extension.eno', () => {
    const panel = vscode.window.createWebviewPanel(
      'testWelcome',
      'Welcome to Eno Snippets',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      },
    );
    panel.webview.html = getWebViewContent(context, './libs/welcome/template.html');
  });

  context.subscriptions.push(disposable);
}