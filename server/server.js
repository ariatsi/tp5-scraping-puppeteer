// server/server.js
const http = require('http');
const fs = require('fs');
const path = require('path');

function loadCountries() {
    const filePath = path.join(__dirname, '..', 'data', 'countries.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
}

function formatNumber(n) {
    if (!n) return '';
    return Number(n).toLocaleString('fr-FR');
}

function renderCountriesPage(countries) {
    const rowsHtml = countries.map((c) => {
        const flagHtml = c.flagThumbUrl
            ? `<a href="${c.flagLinkUrl || c.flagThumbUrl}" target="_blank" rel="noopener">
           <img src="${c.flagThumbUrl}" width="25" alt="Drapeau ${c.country}">
         </a>`
            : '';

        return `<tr>
      <td style="text-align:right;">${c.rank}</td>
      <td style="text-align:center;">${flagHtml}</td>
      <td>${c.country}</td>
      <td>${c.capital || ''}</td>
      <td style="text-align:right;">${formatNumber(c.population)}</td>
    </tr>`;
    }).join('\n');

    return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Countries</title>
</head>
<body>
  <h1>Liste des pays (Wikipedia)</h1>
  <p><a href="/">Accueil</a></p>
  <p><a href="/export.csv">Télécharger le CSV</a></p>

  <table border="1" cellpadding="6" cellspacing="0">
    <thead>
      <tr>
        <th>N°</th>
        <th>Drapeau</th>
        <th>État</th>
        <th>Capitale</th>
        <th>Population</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
  </table>
</body>
</html>`;
}

function loadCsv() {
    const filePath = path.join(__dirname, '..', 'data', 'countries.csv');
    return fs.readFileSync(filePath, 'utf-8');
}

function startServer() {
    const server = http.createServer((req, res) => {
        if (req.method === 'GET' && req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h1>Serveur TP5 Scraping Puppeteer</h1>' +
                '<p>Aller sur <a href="/countries">/countries</a></p>');
            return;
        }

        if (req.method === 'GET' && req.url === '/countries') {
            const countries = loadCountries();
            const html = renderCountriesPage(countries);

            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(html);
            return;
        }

        if (req.method === 'GET' && req.url === '/export.csv') {
            const csv = loadCsv();
            res.writeHead(200, {
                'Content-Type': 'text/csv; charset=utf-8',
                'Content-Disposition': 'attachment; filename="countries.csv"'
            });
            res.end(csv);
            return;
        }


        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('404 - Not Found');
    });

    const PORT = 3000;
    server.listen(PORT, () => {
        console.log(`Serveur démarré sur http://localhost:${PORT}`);
    });
}

module.exports = { startServer };
