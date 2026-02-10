// src/scrape/scrapeCapitals.js
const puppeteer = require('puppeteer');
const { writeJson } = require('../utils/fileWriter');

function toAbsoluteUrl(url) {
    if (!url) return '';
    if (url.startsWith('//')) return 'https:' + url;
    if (url.startsWith('/')) return 'https://fr.wikipedia.org' + url;
    return url;
}

async function scrapeCapitals() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
        'https://fr.wikipedia.org/wiki/Liste_des_capitales_du_monde',
        { waitUntil: 'domcontentloaded' }
    );

    console.log('Page "capitales" chargée');


    const rows = await page.evaluate(() => {
        // const table = document.querySelector('table.wikitable');
        const h3 = document.querySelector('#Liste_principale');
        if (!h3) return [];

        const sectionRoot = h3.closest('.mw-heading')?.parentElement || document;
        const table = sectionRoot.querySelector('table.wikitable');
        if (!table) return [];


        const bodyRows = table.querySelectorAll('tbody tr');

        const result = [];

        // for (let i = 0; i < 50; i++) {
        //     const row = bodyRows[i];
        //     const cells = row.querySelectorAll('td');
        //
        //     // Selon la structure Wikipedia, la colonne "pays" et "capitale"
        //     // sont dans des cellules distinctes (on récupère le texte brut)
        //     const country = cells[0]?.innerText?.trim() || '';
        //     const capital = cells[1]?.innerText?.trim() || '';
        //
        //     // Drapeau : on cherche une image (si présente) dans la ligne
        //     const img = row.querySelector('img');
        //     const flagThumbUrl = img?.getAttribute('src') || '';
        //
        //     // Lien cliquable : souvent l'image est dans un <a href="...">
        //     const link = img?.closest('a');
        //     const flagLinkUrl = link?.getAttribute('href') || '';
        //
        //     result.push({ country, capital, flagThumbUrl, flagLinkUrl });
        // }

        for (const row of bodyRows) {
            const cells = row.querySelectorAll('td');

            const country = cells[0]?.innerText?.trim() || '';
            const capital = cells[1]?.innerText?.trim() || '';

            const img = row.querySelector('img');
            const flagThumbUrl = img?.getAttribute('src') || '';

            const link = img?.closest('a');
            const flagLinkUrl = link?.getAttribute('href') || '';

            result.push({ country, capital, flagThumbUrl, flagLinkUrl });
        }

        return result;
    });

    const normalized = rows.map((r) => ({
        country: r.country,
        capital: r.capital,
        flagThumbUrl: toAbsoluteUrl(r.flagThumbUrl),
        flagLinkUrl: toAbsoluteUrl(r.flagLinkUrl)
    }));

    const cleaned = normalized
        .map((r) => ({
            country: r.country.replace(/\s+/g, ' ').trim(),
            capital: r.capital.replace(/\s+/g, ' ').trim(),
            flagThumbUrl: r.flagThumbUrl,
            flagLinkUrl: r.flagLinkUrl
        }))
        .filter((r) => r.country.length > 0 && r.capital.length > 0);

    writeJson('data/capitals.json', cleaned);
    console.log('Fichier écrit : data/capitals.json');


    console.log('Aperçu (3 lignes normalisées) :');
    console.log(normalized.slice(0, 3));


    await browser.close();
}

module.exports = { scrapeCapitals };