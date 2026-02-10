// src/utils/fileExists.js
const fs = require('fs');
const path = require('path');

function exists(relativePath) {
    const fullPath = path.join(__dirname, '..', '..', relativePath);
    return fs.existsSync(fullPath);
}

module.exports = { exists };
