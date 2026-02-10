// src/scrape/scrapePopulation.js
const puppeteer = require('puppeteer');
const { writeJson } = require('../utils/fileWriter');
const { parsePopulation, parseRank, cleanCountryName } = require('../utils/cleaners');

async function scrapePopulation() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
        'https://fr.wikipedia.org/wiki/Liste_des_pays_par_population',
        { waitUntil: 'domcontentloaded' }
    );

    console.log('Page Wikipedia chargée');

    const rows = await page.evaluate(() => {
        // const table = document.querySelector('table.wikitable');
        const table = document.querySelector('table.sticky-header-multi.wikitable.sortable');

        const bodyRows = table.querySelectorAll('tbody tr');

        const result = [];

        // for (let i = 0; i < 50; i++) {
        //     const cells = bodyRows[i].querySelectorAll('td');
        //
        //     const rank = cells[0]?.innerText.trim();
        //     const country = cells[1]?.innerText.trim();
        //     const population = cells[2]?.innerText.trim();
        //
        //     result.push({ rank, country, population });
        // }

        for (const row of bodyRows) {
            const cells = row.querySelectorAll('td');

            result.push({
                rank: cells[0]?.innerText,
                country: cells[1]?.innerText,
                population: cells[2]?.innerText
            });
        }

        return result;
    });

    // const cleaned = rows.map((r) => ({
    //     rank: parseRank(r.rank),
    //     country: cleanText(r.country),
    //     population: parsePopulation(r.population)
    // }));
    const cleaned = rows
        .map((r) => ({
            rank: parseRank(r.rank),
            // country: cleanText(r.country),
            country: cleanCountryName(r.country),
            population: parsePopulation(r.population)
        }))
        .filter((r) => r.rank > 0 && r.population);

    writeJson('data/population.json', cleaned);
    console.log('Fichier écrit : data/population.json');

    // console.log(rows);
    console.log('Aperçu (3 premières lignes) :');
    console.log(cleaned.slice(0, 3));

    await browser.close();
}

module.exports = { scrapePopulation };
