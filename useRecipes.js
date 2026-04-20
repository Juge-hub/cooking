import { useState, useEffect, useCallback } from 'react'
import { DAYS, MEALS, THEMES } from '../lib/constants.js'
import { getISOWeek, getMondayOf, getWeekDates } from '../lib/dates.js'
import { storageGet, storageSet, recipeKey } from '../lib/storage.js'
import { callClaude, buildRecipePrompt } from '../lib/api.js'

const TODAY = new Date()

export function useRecipes() {
  const [weekOffset, setWeekOffset]   = useState(0)
  const [recipes,    setRecipes]      = useState({})
  const [loading,    setLoading]      = useState({})
  const [storageReady, setStorageReady] = useState(false)

  const monday      = getMondayOf(TODAY, weekOffset)
  const weekDates   = getWeekDates(monday)
  const weekNum     = getISOWeek(monday)
  const weekTheme   = THEMES[weekNum % THEMES.length]

  // Charge les recettes sauvegardées à chaque changement de semaine
  useEffect(() => {
    setRecipes({})
    setStorageReady(false)
    ;(async () => {
      const cached = {}
      for (const day of DAYS) {
        for (const meal of MEALS) {
          const data = await storageGet(recipeKey(weekNum, day, meal))
          if (data) cached[`${day}-${meal}`] = { ...data, _cached: true }
        }
      }
      setRecipes(cached)
      setStorageReady(true)
    })()
  }, [weekNum])

  // Charge une recette individuelle depuis le cache (appelé au premier clic)
  const loadFromCache = useCallback(async (key, day, meal) => {
    const data = await storageGet(recipeKey(weekNum, day, meal))
    if (data) {
      setRecipes(p => ({ ...p, [key]: { ...data, _cached: true } }))
      return true
    }
    return false
  }, [weekNum])

  // Génère une recette via l'API et la sauvegarde
  const generateRecipe = useCallback(async (key, day, meal) => {
    setLoading(p  => ({ ...p, [key]: true }))
    setRecipes(p => ({ ...p, [key]: null }))
    try {
      const data = await callClaude(null, buildRecipePrompt(day, meal, weekTheme))
      await storageSet(recipeKey(weekNum, day, meal), data)
      setRecipes(p => ({ ...p, [key]: { ...data, _cached: false } }))
    } catch (e) {
      setRecipes(p => ({
        ...p,
        [key]: {
          name: 'Erreur',
          description: e.message,
          ingredients: [], steps: [],
          time: '–', servings: '–', difficulty: '–',
          _error: true,
        },
      }))
    }
    setLoading(p => ({ ...p, [key]: false }))
  }, [weekTheme, weekNum])

  const generatedCount = Object.values(recipes).filter(r => r && !r._error).length
  const cachedCount    = Object.values(recipes).filter(r => r?._cached).length

  return {
    weekOffset, setWeekOffset,
    weekNum, weekDates, weekTheme,
    recipes, loading, storageReady,
    loadFromCache, generateRecipe,
    generatedCount, cachedCount,
  }
}
