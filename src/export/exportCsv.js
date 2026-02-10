// src/export/exportCsv.js
const fs = require('fs');
const path = require('path');

function loadJson(relativePath) {
    const fullPath = path.join(__dirname, '..', '..', relativePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
}

function csvEscape(value) {
    if (value === null || value === undefined) return '';
    const str = String(value);

    // Si le champ contient " , ou \n → on met entre guillemets
    if (/[",\n]/.test(str)) {
        // Les guillemets " deviennent ""
        return `"${str.replace(/"/g, '""')}"`;
    }

    return str;
}


function exportCountriesCsv() {
    const countries = loadJson('data/countries.json');
    console.log(`Chargé : ${countries.length} pays depuis data/countries.json`);

    const headers = [
        'rank',
        'country',
        'capital',
        'population',
        'flagThumbUrl',
        'flagLinkUrl'
    ];

    const lines = [];
    lines.push(headers.join(','));

    countries.forEach((c) => {
        const row = [
            csvEscape(c.rank),
            csvEscape(c.country),
            csvEscape(c.capital),
            csvEscape(c.population),
            csvEscape(c.flagThumbUrl),
            csvEscape(c.flagLinkUrl)
        ];
        lines.push(row.join(','));
    });

    const csvContent = lines.join('\n');

    const outputPath = path.join(__dirname, '..', '..', 'data', 'countries.csv');
    fs.writeFileSync(outputPath, csvContent, 'utf-8');

    console.log('Fichier écrit : data/countries.csv');

}


module.exports = { exportCountriesCsv };
