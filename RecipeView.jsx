import { Tag, GhostButton, Label } from './UI.jsx'

export function RecipeView({ recipe, onRegen }) {
  return (
    <div className="fade-up">
      {/* En-tête recette */}
      <div style={{
        background: '#100E0B', borderRadius: 10,
        padding: '14px 16px', borderLeft: '3px solid var(--gold)',
        marginBottom: 14,
      }}>
        <p style={{
          color: 'var(--gold)', fontFamily: 'var(--font-serif)',
          fontSize: 20, fontWeight: 700,
        }}>
          {recipe.name}
        </p>
        <p style={{ color: '#7A6A54', fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>
          {recipe.description}
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          <Tag>{recipe.time}</Tag>
          <Tag>{recipe.servings}</Tag>
          <Tag>{recipe.difficulty}</Tag>
        </div>
      </div>

      {/* Ingrédients */}
      <Label>Ingrédients</Label>
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 5, marginBottom: 16,
      }}>
        {(recipe.ingredients || []).map((ing, i) => (
          <div key={i} style={{
            background: '#131008', border: '1px solid var(--border-dim)',
            borderRadius: 6, padding: '7px 10px',
            color: 'var(--text-dim)', fontSize: 12.5,
            display: 'flex', gap: 7, alignItems: 'flex-start',
          }}>
            <span style={{ color: 'var(--gold)', fontSize: 8, marginTop: 4 }}>◆</span>
            {ing}
          </div>
        ))}
      </div>

      {/* Étapes */}
      <Label>Préparation</Label>
      {(recipe.steps || []).map((s, i) => (
        <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
          <div style={{
            minWidth: 28, height: 28, borderRadius: 7,
            background: 'linear-gradient(135deg, #2A2010, #1A1408)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--gold)', fontSize: 12, fontWeight: 700,
            flexShrink: 0,
          }}>
            {i + 1}
          </div>
          <p style={{ color: '#BBA888', fontSize: 13.5, lineHeight: 1.65, paddingTop: 4 }}>
            {s}
          </p>
        </div>
      ))}

      {/* Astuce */}
      {recipe.tip && (
        <div style={{
          background: 'var(--bg-3)', border: '1px solid var(--gold-faint)',
          borderRadius: 8, padding: '11px 14px',
          marginTop: 6, marginBottom: 14,
        }}>
          <span style={{ color: 'var(--gold)', fontSize: 11, fontWeight: 700 }}>ASTUCE  </span>
          <span style={{ color: '#8A7A64', fontSize: 13 }}>{recipe.tip}</span>
        </div>
      )}

      <GhostButton onClick={onRegen}>Régénérer (nouvelle requête)</GhostButton>
    </div>
  )
}
