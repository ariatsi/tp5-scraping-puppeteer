// // app.js
// const { smokeTest } = require('./src/scrape/puppeteerSmokeTest');
//
// (async () => {
//     await smokeTest();
// })();


/*
// scrape Population
const { scrapePopulation } = require('./src/scrape/scrapePopulation');

(async () => {
    await scrapePopulation();
})();

// scrape Capitals
const { scrapeCapitals } = require('./src/scrape/scrapeCapitals');

(async () => {
    await scrapeCapitals();
})();


// merge Countries (Population + Capitals)
const { mergeCountries } = require('./src/merge/mergeCountries');

mergeCountries();
*/

// app.js
// const { exportCountriesCsv } = require('./src/export/exportCsv');
//
// exportCountriesCsv();

// app.js
// const { startServer } = require('./server/server');
//
// startServer();

// app.js
const { exists } = require('./src/utils/fileExists');

const { scrapePopulation } = require('./src/scrape/scrapePopulation');
const { scrapeCapitals } = require('./src/scrape/scrapeCapitals');

const { mergeCountries } = require('./src/merge/mergeCountries');
const { exportCountriesCsv } = require('./src/export/exportCsv');

const { startServer } = require('./server/server');

(async () => {
    // 1) Scrape si cache absent
    if (!exists('data/population.json')) {
        console.log('Cache absent: data/population.json → scraping population...');
        await scrapePopulation();
    } else {
        console.log('Cache OK: data/population.json');
    }

    if (!exists('data/capitals.json')) {
        console.log('Cache absent: data/capitals.json → scraping capitales...');
        await scrapeCapitals();
    } else {
        console.log('Cache OK: data/capitals.json');
    }

    // 2) Fusion + export
    console.log('Fusion des données...');
    mergeCountries();

    console.log('Export CSV...');
    exportCountriesCsv();

    // 3) Serveur HTTP
    console.log('Démarrage serveur...');
    startServer();
})();
