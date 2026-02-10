// src/utils/fileWriter.js
const fs = require('fs');
const path = require('path');

function writeJson(relativePath, data) {
    const fullPath = path.join(__dirname, '..', '..', relativePath);
    const json = JSON.stringify(data, null, 2);
    fs.writeFileSync(fullPath, json, 'utf-8');
}

module.exports = { writeJson };
