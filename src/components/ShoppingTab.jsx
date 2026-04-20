import { useShopping } from '../hooks/useShopping.js'
import { Spinner, PrimaryButton, GhostButton, CachedBadge, Label } from './UI.jsx'

export function ShoppingTab({ recipes, weekNum }) {
  const {
    list, loading, fromCache, checked,
    toggleItem, generate, total, done,
  } = useShopping(recipes, weekNum)

  const count = Object.values(recipes).filter(r => r && !r._error).length

  return (
    <div>
      {/* Résumé */}
      <div style={{
        background: 'var(--bg-2)', border: '1px solid var(--border)',
        borderRadius: 10, padding: '16px', marginBottom: 16,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{
            color: 'var(--gold)', fontFamily: 'var(--font-serif)',
            fontSize: 17, fontWeight: 700,
          }}>
            {count} recette{count !== 1 ? 's' : ''} planifiée{count !== 1 ? 's' : ''}
          </p>
          {fromCache && <CachedBadge />}
        </div>
        {list && (
          <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>
            {done}/{total} articles cochés
          </p>
        )}
      </div>

      {/* État vide */}
      {count === 0 && !list && (
        <p style={{
          color: 'var(--text-faint)', fontSize: 14,
          textAlign: 'center', padding: '30px 0',
        }}>
          Générez d'abord des recettes dans le planning.
        </p>
      )}

      {/* Bouton générer */}
      {count > 0 && !list && !loading && (
        <PrimaryButton onClick={generate}>
          Générer la liste de courses
        </PrimaryButton>
      )}

      {loading && <Spinner />}

      {/* Liste */}
      {list && !loading && (
        <div className="fade-up">
          {(list.rayons || []).map((rayon, ri) => (
            <div key={ri} style={{ marginBottom: 18 }}>
              <p style={{
                color: 'var(--gold)', fontSize: 10, fontWeight: 700,
                letterSpacing: 2, textTransform: 'uppercase',
                borderBottom: '1px solid var(--border-dim)',
                paddingBottom: 7, marginBottom: 8,
              }}>
                {rayon.nom}
              </p>
              {(rayon.items || []).map((item, ii) => {
                const k = `${ri}-${ii}`
                return (
                  <div
                    key={ii}
                    onClick={() => toggleItem(k)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 11,
                      padding: '8px 0', borderBottom: '1px solid var(--bg-2)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, minWidth: 18,
                      border: `2px solid ${checked[k] ? 'var(--gold)' : 'var(--border)'}`,
                      borderRadius: 4,
                      background: checked[k] ? 'var(--gold)' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all .15s', flexShrink: 0,
                    }}>
                      {checked[k] && (
                        <span style={{ color: '#0A0804', fontSize: 10, fontWeight: 900 }}>✓</span>
                      )}
                    </div>
                    <span style={{
                      color: checked[k] ? 'var(--text-faint)' : 'var(--text)',
                      fontSize: 14,
                      textDecoration: checked[k] ? 'line-through' : 'none',
                      transition: 'all .15s',
                    }}>
                      {item}
                    </span>
                  </div>
                )
              })}
            </div>
          ))}

          <GhostButton onClick={generate}>
            Recalculer la liste (nouvelle requête)
          </GhostButton>
        </div>
      )}
    </div>
  )
}
