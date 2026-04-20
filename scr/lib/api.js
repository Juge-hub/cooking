const API_URL = 'https://api.anthropic.com/v1/messages'
const MODEL   = 'claude-sonnet-4-20250514'
const MAX_TOK = 2000

// Extrait le premier objet JSON complet d'un texte brut
export function extractJSON(text) {
  const start = text.indexOf('{')
  if (start === -1) throw new Error('Pas de JSON trouvé dans la réponse')
  let depth = 0, inStr = false, escape = false
  for (let i = start; i < text.length; i++) {
    const c = text[i]
    if (escape)             { escape = false; continue }
    if (c === '\\' && inStr){ escape = true;  continue }
    if (c === '"')          { inStr = !inStr; continue }
    if (inStr)               continue
    if (c === '{') depth++
    if (c === '}') { depth--; if (depth === 0) return JSON.parse(text.slice(start, i + 1)) }
  }
  throw new Error('JSON incomplet — réponse tronquée')
}

function buildHeaders() {
  const headers = { 'Content-Type': 'application/json', 'anthropic-version': '2023-06-01' }
  // Dans l'artifact Claude, la clé est injectée automatiquement.
  // En production, on lit VITE_ANTHROPIC_KEY depuis .env
  const key = typeof import.meta !== 'undefined' && import.meta.env?.VITE_ANTHROPIC_KEY
  if (key) headers['x-api-key'] = key
  return headers
}

export async function callClaude(systemPrompt, userPrompt) {
  const body = {
    model:      MODEL,
    max_tokens: MAX_TOK,
    messages:   [{ role: 'user', content: userPrompt }],
  }
  if (systemPrompt) body.system = systemPrompt

  const res = await fetch(API_URL, {
    method:  'POST',
    headers: buildHeaders(),
    body:    JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `HTTP ${res.status}`)
  }

  const data = await res.json()
  const raw  = data.content?.find(b => b.type === 'text')?.text ?? '{}'
  return extractJSON(raw)
}

// ── Prompts ────────────────────────────────────────────────────────────────────
export function buildRecipePrompt(day, meal, theme) {
  return `Génère une recette innovante pour le ${meal} du ${day}.
Thème : ${theme.label} — ${theme.detail}.
Créative, surprenante, réalisable à la maison en moins d'1h.
Réponds uniquement avec un objet JSON valide, sans texte avant ni après, sans backticks.
Format exact :
{"name":"Nom du plat","description":"2 phrases appétissantes","time":"30 min","servings":"2 personnes","difficulty":"Facile","ingredients":["200g de X","1 c.s. de Y","3 Z"],"steps":["Étape 1 détaillée","Étape 2 détaillée","Étape 3 détaillée","Étape 4 détaillée","Étape 5 dressage"],"tip":"Astuce du chef"}`
}

export function buildShoppingPrompt(ingredients) {
  return `Voici tous les ingrédients de mes recettes de la semaine : ${ingredients}
Génère une liste de courses consolidée, sans doublons, quantités regroupées, organisée par rayon de supermarché.
Réponds uniquement avec un objet JSON valide, sans texte avant ni après, sans backticks :
{"rayons":[{"nom":"Fruits et légumes","items":["2 tomates","1 oignon rouge"]},{"nom":"Épicerie","items":["huile d'olive 1 bouteille"]}]}`
}
