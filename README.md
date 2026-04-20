# La Cuisine

Planificateur de repas hebdomadaire avec recettes innovantes générées par IA (Claude).

## Fonctionnalités

- Planning 7 jours × 2 repas (déjeuner + dîner)
- Recettes générées par Claude, thème qui change chaque semaine automatiquement
- Sauvegarde locale — pas de requête si la recette existe déjà
- Liste de courses consolidée par rayon, générée depuis les recettes planifiées
- Navigation entre semaines passées et futures
- Badge "SAUVEGARDÉ" sur les recettes en cache

## Stack

- React 18 + Vite
- Anthropic API (claude-sonnet-4-20250514)
- Stockage : `localStorage` en production, `window.storage` dans l'artifact Claude

## Installation

```bash
npm install
npm run dev
```

## Déploiement GitHub Pages

1. Installer le plugin :
```bash
npm install --save-dev gh-pages
```

2. Ajouter dans `package.json` :
```json
"homepage": "https://<TON_USERNAME>.github.io/la-cuisine",
"scripts": {
  "deploy": "gh-pages -d dist"
}
```

3. Déployer :
```bash
npm run build
npm run deploy
```

## Clé API

L'application appelle directement `api.anthropic.com/v1/messages` depuis le navigateur.

**Dans l'artifact Claude** : la clé est injectée automatiquement par Claude.ai.

**En production (GitHub Pages)** : tu dois exposer ta clé. Deux options :

### Option A — Variable d'environnement Vite (simple, clé visible côté client)
Créer un fichier `.env` à la racine :
```
VITE_ANTHROPIC_KEY=sk-ant-...
```
Puis dans `src/lib/api.js`, ajouter le header :
```js
headers: {
  'Content-Type': 'application/json',
  'x-api-key': import.meta.env.VITE_ANTHROPIC_KEY,
  'anthropic-version': '2023-06-01',
}
```
> ⚠️ La clé sera visible dans le bundle JS. Acceptable pour usage personnel.

### Option B — Proxy backend (recommandé si usage public)
Déployer un petit serveur (Vercel serverless, Cloudflare Worker) qui relaie les appels API sans exposer la clé.

## Structure

```
src/
├── lib/
│   ├── api.js          # Appels Claude + prompts
│   ├── constants.js    # Thèmes, jours, repas
│   ├── dates.js        # Utilitaires semaine ISO
│   └── storage.js      # Abstraction localStorage / window.storage
├── hooks/
│   ├── useRecipes.js   # État recettes + génération + cache
│   └── useShopping.js  # État liste de courses
├── components/
│   ├── UI.jsx          # Primitives (Spinner, Tag, Button…)
│   ├── Header.jsx      # En-tête sticky
│   ├── MealRow.jsx     # Ligne repas dépliable
│   ├── RecipeView.jsx  # Affichage recette complète
│   ├── PlanningTab.jsx # Onglet planning
│   └── ShoppingTab.jsx # Onglet courses
├── App.jsx
├── main.jsx
└── index.css
```
