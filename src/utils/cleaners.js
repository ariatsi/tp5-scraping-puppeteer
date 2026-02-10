// src/utils/cleaners.js
function parsePopulation(raw) {
    if (!raw) return null;

    // Exemple Wikipédia : "1 428 627 663" (espaces), parfois notes ou retours ligne
    const digitsOnly = raw.replace(/[^\d]/g, '');
    if (!digitsOnly) return null;

    return Number(digitsOnly);
}

function cleanText(raw) {
    if (!raw) return '';
    return raw.replace(/\s+/g, ' ').trim();
}

function parseRank(raw) {
    const n = Number(String(raw).replace(/[^\d]/g, ''));
    return Number.isFinite(n) ? n : null;
}


function cleanCountryName(raw) {
    if (!raw) return '';

    // 1) Nettoyage de base des espaces
    let s = raw.replace(/\s+/g, ' ').trim();

    // 2) Supprime les références Wikipédia : [a], [1], [Note 2], etc.
    // Exemple: "Inde[a]" -> "Inde"
    s = s.replace(/\[[^\]]*]/g, '');

    // 3) Re-nettoyage espaces (au cas où)
    s = s.replace(/\s+/g, ' ').trim();

    return s;
}

module.exports = { parsePopulation, cleanText, parseRank, cleanCountryName };
