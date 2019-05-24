var fs = require('fs');
var Sass = require('./sass.sync.js');
var pathModule = require('path');

function fileExists(filePath) {

    var stat = fs.statSync(filePath);
    return stat && stat.isFile();
}

function importFileToSass(orgPath, path, done) {

    var requestedPath;
    if (path.startsWith("~")) {
        path = path.substring(1);
        requestedPath = pathModule.join(orgPath, path);
    }
    else if (pathModule.isAbsolute(path))
        requestedPath = path;
    else
        requestedPath = pathModule.join(orgPath, path);

    var filesystemPath = Sass.findPathVariation(fileExists, requestedPath);
    if (!filesystemPath) {
        done({
            error: 'File "' + requestedPath + '" not found',
        });

        return;
    }

    var content = fs.readFileSync(filesystemPath, {encoding: 'utf8'});
    Sass.writeFile(filesystemPath, content, function() {
        done({
            path: filesystemPath,
        });
    });
}

function importerCallback(orgPath, request, done) {

    var requestedPath;
    if (process.platform == "win32") {
        requestedPath = request.resolved.replace(/^\/sass\//, '' );
    } else {
        requestedPath = request.resolved.replace(/^\/sass/, '');
    }

    importFileToSass(orgPath, requestedPath, done);
}

function compileFile(path, options, callback) {

    if (!callback) {
        callback = options;
        options = {};
    }

    var originalFilePath = pathModule.dirname(path);
    var originalFileName = pathModule.basename(path);

    Sass.importer(function(filePath, done) {
        return importerCallback(originalFilePath, filePath, done);
    });

    importFileToSass(originalFilePath, originalFileName, function() {
        Sass.compileFile(path, options, callback);
    });
}

compileFile.importFileToSass = importFileToSass;
compileFile.Sass = Sass;

module.exports = compileFile;
