// Abstraction de stockage : localStorage avec fallback mémoire.
// Dans l'artifact Claude, window.storage est disponible.
// Sur un vrai serveur (GitHub Pages, Vercel…), on utilise localStorage.

const memoryFallback = {}

function getStorage() {
  if (typeof window !== 'undefined' && window.storage) return 'claude'
  if (typeof localStorage !== 'undefined') return 'local'
  return 'memory'
}

export async function storageGet(key) {
  const type = getStorage()
  if (type === 'claude') {
    try {
      const result = await window.storage.get(key)
      return result?.value ? JSON.parse(result.value) : null
    } catch { return null }
  }
  if (type === 'local') {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  }
  return memoryFallback[key] ?? null
}

export async function storageSet(key, value) {
  const type = getStorage()
  if (type === 'claude') {
    try { await window.storage.set(key, JSON.stringify(value)) } catch {}
    return
  }
  if (type === 'local') {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
    return
  }
  memoryFallback[key] = value
}

export async function storageDel(key) {
  const type = getStorage()
  if (type === 'claude') {
    try { await window.storage.delete(key) } catch {}
    return
  }
  if (type === 'local') {
    try { localStorage.removeItem(key) } catch {}
    return
  }
  delete memoryFallback[key]
}

// ── Clés recettes ──────────────────────────────────────────────────────────────
export const recipeKey   = (weekNum, day, meal) => `recipe:S${weekNum}:${day}-${meal}`
export const shoppingKey = (weekNum)             => `shopping:S${weekNum}`
