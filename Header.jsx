const navBtn = {
  flex: 1,
  background: 'var(--bg-2)',
  border: '1px solid var(--border-dim)',
  color: 'var(--text-muted)',
  borderRadius: 6,
  padding: '7px 0',
  cursor: 'pointer',
  fontSize: 12,
}

export function Header({
  weekNum, weekDates, weekTheme,
  weekOffset, setWeekOffset,
  generatedCount, cachedCount,
}) {
  return (
    <div style={{
      padding: '22px 20px 14px',
      borderBottom: '1px solid var(--bg-3)',
      position: 'sticky', top: 0, zIndex: 50,
      background: 'var(--bg-0)',
    }}>
      {/* Titre + compteur */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-serif)', fontSize: 28,
            fontWeight: 700, color: 'var(--gold)', letterSpacing: '-0.3px',
          }}>
            La Cuisine
          </h1>
          <p style={{
            color: 'var(--text-faint)', fontSize: 11,
            letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 2,
          }}>
            Semaine {weekNum} · {weekDates[0]} – {weekDates[6]}
          </p>
        </div>

        {generatedCount > 0 && (
          <div style={{ textAlign: 'right' }}>
            <div style={{
              background: 'var(--bg-3)', border: '1px solid var(--gold-faint)',
              borderRadius: 20, padding: '5px 12px',
              color: 'var(--gold)', fontSize: 12, fontWeight: 600,
            }}>
              {generatedCount} recette{generatedCount > 1 ? 's' : ''}
            </div>
            {cachedCount > 0 && (
              <p style={{ color: '#4A6A24', fontSize: 10, marginTop: 4 }}>
                {cachedCount} en cache
              </p>
            )}
          </div>
        )}
      </div>

      {/* Thème semaine */}
      <div style={{
        marginTop: 12, background: 'var(--bg-2)',
        border: '1px solid var(--border)', borderRadius: 8, padding: '9px 13px',
      }}>
        <span style={{
          color: '#6A5A34', fontSize: 10, fontWeight: 700,
          letterSpacing: 1.5, textTransform: 'uppercase',
        }}>
          THÈME S{weekNum}  
        </span>
        <p style={{
          color: 'var(--gold)', fontSize: 14,
          fontFamily: 'var(--font-serif)', fontWeight: 600, marginTop: 2,
        }}>
          {weekTheme.label}
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 1 }}>
          {weekTheme.detail}
        </p>
      </div>

      {/* Navigation semaines */}
      <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
        <button onClick={() => setWeekOffset(w => w - 1)} style={navBtn}>← Préc.</button>
        <button
          onClick={() => setWeekOffset(0)}
          style={{ ...navBtn, flex: '0 0 auto', padding: '7px 14px' }}
        >
          Auj.
        </button>
        <button onClick={() => setWeekOffset(w => w + 1)} style={navBtn}>Suiv. →</button>
      </div>
    </div>
  )
}
