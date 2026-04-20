import { useState } from 'react'
import { Spinner, PrimaryButton, CachedBadge } from './UI.jsx'
import { RecipeView } from './RecipeView.jsx'

export function MealRow({ weekNum, day, meal, recipe, loading, onGenerate, onLoadCache }) {
  const [open, setOpen] = useState(false)
  const key = `${day}-${meal}`

  const toggle = async () => {
    const next = !open
    setOpen(next)
    if (next && !recipe && !loading) {
      const found = await onLoadCache(key, day, meal)
      if (!found) onGenerate(key, day, meal)
    }
  }

  return (
    <div style={{
      border: `1px solid ${open ? 'var(--border)' : '#1A1A14'}`,
      borderRadius: 10, overflow: 'hidden',
      background: open ? 'var(--bg-2)' : 'var(--bg-1)',
      marginBottom: 6, transition: 'all .25s',
    }}>
      {/* Header cliquable */}
      <div onClick={toggle} style={{
        padding: '13px 16px', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span style={{
              color: 'var(--text-muted)', fontSize: 11,
              textTransform: 'uppercase', letterSpacing: 1,
            }}>
              {meal}
            </span>
            {recipe?._cached && <CachedBadge />}
          </div>
          {recipe && !recipe._error && (
            <p style={{
              color: 'var(--text)', fontSize: 14, fontStyle: 'italic',
              marginTop: 2, fontFamily: 'var(--font-serif)',
            }}>
              {recipe.name}
            </p>
          )}
          {recipe?._error && (
            <p style={{ color: '#A04040', fontSize: 13, marginTop: 2 }}>
              Erreur — cliquer pour réessayer
            </p>
          )}
          {!recipe && !loading && (
            <p style={{ color: 'var(--text-faint)', fontSize: 13, marginTop: 2 }}>
              Appuyer pour générer
            </p>
          )}
          {loading && (
            <p style={{ color: 'var(--gold)', fontSize: 13, marginTop: 2, opacity: 0.6 }}>
              Génération en cours…
            </p>
          )}
        </div>
        <span style={{
          color: 'var(--gold)', fontSize: 16,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform .25s', display: 'block',
        }}>
          ∨
        </span>
      </div>

      {/* Contenu déplié */}
      {open && (
        <div style={{ padding: '0 16px 16px' }}>
          {loading && <Spinner />}
          {!recipe && !loading && (
            <PrimaryButton onClick={() => onGenerate(key, day, meal)}>
              Générer la recette
            </PrimaryButton>
          )}
          {recipe && !loading && !recipe._error && (
            <RecipeView recipe={recipe} onRegen={() => onGenerate(key, day, meal)} />
          )}
          {recipe?._error && !loading && (
            <PrimaryButton onClick={() => onGenerate(key, day, meal)}>
              Réessayer
            </PrimaryButton>
          )}
        </div>
      )}
    </div>
  )
}
