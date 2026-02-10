// src/merge/mergeCountries.js
const fs = require('fs');
const path = require('path');

function loadJson(relativePath) {
    const fullPath = path.join(__dirname, '..', '..', relativePath);
    const content = fs.readFileSync(fullPath, 'utf-8');
    return JSON.parse(content);
}

function normalizeCountryName(name) {
    return name
        .toLowerCase()
        .normalize('NFD')               // enlève accents
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\(.*?\)/g, '')        // enlève parenthèses
        .replace(/[^a-z\s]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function mergeCountries() {
    const populations = loadJson('data/population.json');
    const capitals = loadJson('data/capitals.json');

    const capitalsIndex = {};

    capitals.forEach((c) => {
        const key = normalizeCountryName(c.country);
        capitalsIndex[key] = c;
    });

    const merged = populations.map((p) => {
        const key = normalizeCountryName(p.country);
        const capitalData = capitalsIndex[key];

        return {
            rank: p.rank,
            country: p.country,
            capital: capitalData?.capital || null,
            population: p.population,
            flagThumbUrl: capitalData?.flagThumbUrl || null,
            flagLinkUrl: capitalData?.flagLinkUrl || null
        };
    });
    const cleaned = merged.filter(
        (c) => c.capital && c.flagThumbUrl
    );


    const outputPath = path.join(__dirname, '..', '..', 'data', 'countries.json');
    fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2), 'utf-8');

    console.log(`Fichier écrit : data/countries.json (${cleaned.length} pays)`);


    console.log(
        `Population: ${populations.length} lignes | Capitales: ${capitals.length} lignes`
    );
}


module.exports = { mergeCountries };