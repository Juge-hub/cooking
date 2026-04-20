import { useState, useEffect } from 'react'
import { storageGet, storageSet, shoppingKey } from '../lib/storage.js'
import { callClaude, buildShoppingPrompt } from '../lib/api.js'

export function useShopping(recipes, weekNum) {
  const [list,      setList]      = useState(null)
  const [loading,   setLoading]   = useState(false)
  const [fromCache, setFromCache] = useState(false)
  const [checked,   setChecked]   = useState({})

  useEffect(() => {
    setList(null)
    setFromCache(false)
    setChecked({})
    ;(async () => {
      const data = await storageGet(shoppingKey(weekNum))
      if (data) { setList(data); setFromCache(true) }
    })()
  }, [weekNum])

  const generate = async () => {
    setLoading(true)
    setList(null)
    setFromCache(false)
    const ings = Object.values(recipes)
      .filter(Boolean)
      .flatMap(r => r.ingredients || [])
      .join(', ')
    try {
      const data = await callClaude(null, buildShoppingPrompt(ings))
      await storageSet(shoppingKey(weekNum), data)
      setList(data)
    } catch (e) {
      setList({ rayons: [{ nom: 'Erreur', items: [e.message] }] })
    }
    setLoading(false)
  }

  const toggleItem = (k) => setChecked(p => ({ ...p, [k]: !p[k] }))

  const total = list?.rayons?.flatMap(r => r.items).length ?? 0
  const done  = Object.values(checked).filter(Boolean).length

  return { list, loading, fromCache, checked, toggleItem, generate, total, done }
}
