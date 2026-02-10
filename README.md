# TP5 - Web Scraping avec Puppeteer (Node.js)

## Objectif pédagogique

Ce TP a pour objectif de vous faire pratiquer **l’utilisation concrète d’une bibliothèque externe** en Node.js : **Puppeteer**.

À la fin de ce TP, vous saurez :
- utiliser Puppeteer pour lancer un navigateur **headless** (sans interface graphique),
- scraper des pages web réelles (Wikipedia),
- extraire et nettoyer des données depuis le DOM,
- fusionner plusieurs sources de données,
- exporter des données en **CSV**,
- afficher les résultats via un **serveur HTTP Node.js**,
- appliquer les **bonnes pratiques Git / Node.js**.


## Sujet du TP

Vous devez scraper deux pages Wikipedia publiques :

- **Liste des pays par population**  
  https://fr.wikipedia.org/wiki/Liste_des_pays_par_population

- **Liste des capitales du monde**  
  https://fr.wikipedia.org/wiki/Liste_des_capitales_du_monde

Puis :
1. Extraire les données (pays, population, capitales, drapeaux),
2. Nettoyer les données (notes Wikipedia, formats numériques),
3. Fusionner les sources,
4. Générer un fichier `countries.csv`,
5. Afficher les données dans une page HTML accessible via `/countries`.


## Structure du projet

```
tp5-scraping-puppeteer/
├── app.js
├── package.json
├── package-lock.json
├── .gitignore
├── data/
│   ├── population.json
│   ├── capitals.json
│   ├── countries.json
│   └── countries.csv
├── src/
│   ├── scrape/
│   ├── merge/
│   ├── export/
│   └── utils/
└── server/
```


## Prérequis techniques

### 1. Installer Git
Télécharger et installer Git :
- https://git-scm.com/downloads

Vérifier l’installation :
```bash
git --version
```


### 2. Installer Node.js (LTS)
Télécharger Node.js :
- https://nodejs.org (version **LTS recommandée**)

Vérifier :
```bash
node --version
npm --version
```

---

## Installation du projet

### 1. Cloner le dépôt Git

```bash
git clone <URL_DU_DEPOT>
cd tp5-scraping-puppeteer
```

### 2. Installer les dépendances

```bash
npm install
```

Cette commande :
- lit `package.json`
- télécharge **Puppeteer** et ses dépendances
- recrée automatiquement le dossier `node_modules`


### 3. Lancer le projet

```bash
npm start
```

Selon l’état du cache :
- le scraping est exécuté automatiquement (si nécessaire),
- les fichiers JSON / CSV sont générés,
- le serveur HTTP démarre.


## Accès à l’application

Une fois le serveur lancé :

- Page principale :  
  http://localhost:3000

- Liste des pays :  
  http://localhost:3000/countries

- (Optionnel) Export CSV :  
  http://localhost:3000/export.csv


## Bonnes pratiques appliquées

-  utilisation d’un navigateur **headless**
-  scraping limité et responsable
-  cache local pour éviter les appels inutiles
- séparation claire des responsabilités :
  - scraping
  - nettoyage
  - fusion
  - export
  - affichage
- `.gitignore` pour éviter de versionner :
  - `node_modules/`
  - `.idea/`
  - fichiers temporaires


## Rappel important (scraping)

Le scraping est réalisé :
- uniquement sur des pages **publiques**,
- sans authentification,
- à des fins **strictement pédagogiques**.

Il est interdit de :
- contourner des protections,
- scraper des données personnelles,
- scraper des sites interdisant explicitement le scraping.


## Licence

Ce projet est distribué sous la licence **Academic Free License v3.0 ([AFL-3.0](https://opensource.org/licenses/AFL-3.0))**.
