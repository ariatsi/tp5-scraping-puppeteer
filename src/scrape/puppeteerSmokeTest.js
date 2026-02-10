// src/scrape/puppeteerSmokeTest.js
const puppeteer = require('puppeteer');

async function smokeTest() {
    // 1) Lance un navigateur en mode headless (sans interface graphique)
    const browser = await puppeteer.launch({ headless: true });

    // 2) Ouvre un nouvel onglet
    const page = await browser.newPage();

    // 3) Va sur une page simple
    await page.goto('https://example.com', { waitUntil: 'domcontentloaded' });

    // 4) Récupère le titre de la page
    const title = await page.title();
    console.log('Titre de la page:', title);

    // 5) Ferme le navigateur (important)
    await browser.close();
}

module.exports = { smokeTest };
