import { DAYS, MEALS } from '../lib/constants.js'
import { MealRow } from './MealRow.jsx'
import { Spinner } from './UI.jsx'

export function PlanningTab({
  weekNum, weekDates,
  recipes, loading, storageReady,
  onGenerate, onLoadCache,
}) {
  if (!storageReady) {
    return (
      <div style={{ textAlign: 'center', padding: '40px 0' }}>
        <Spinner />
        <p style={{ color: 'var(--text-faint)', fontSize: 13, marginTop: 8 }}>
          Chargement des recettes sauvegardées…
        </p>
      </div>
    )
  }

  return (
    <div className="fade-up">
      {DAYS.map((day, di) => (
        <div key={day} style={{ marginBottom: 20 }}>
          {/* Séparateur jour */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{
              color: 'var(--gold)', fontFamily: 'var(--font-serif)',
              fontSize: 17, fontWeight: 700,
            }}>
              {day}
            </span>
            <span style={{ color: 'var(--text-faint)', fontSize: 12 }}>
              {weekDates[di]}
            </span>
            <div style={{ flex: 1, height: 1, background: '#1A1408' }} />
          </div>

          {MEALS.map(meal => {
            const k = `${day}-${meal}`
            return (
              <MealRow
                key={k}
                weekNum={weekNum}
                day={day}
                meal={meal}
                recipe={recipes[k]}
                loading={!!loading[k]}
                onGenerate={onGenerate}
                onLoadCache={onLoadCache}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
