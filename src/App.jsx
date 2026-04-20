import { useState } from 'react'
import { useRecipes } from './hooks/useRecipes.js'
import { Header } from './components/Header.jsx'
import { PlanningTab } from './components/PlanningTab.jsx'
import { ShoppingTab } from './components/ShoppingTab.jsx'

const TAB_STYLE = (active) => ({
  padding: '12px 18px',
  background: 'transparent',
  border: 'none',
  borderBottom: `2px solid ${active ? 'var(--gold)' : 'transparent'}`,
  color: active ? 'var(--gold)' : 'var(--text-faint)',
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: active ? 600 : 400,
  transition: 'all .2s',
  fontFamily: 'var(--font-sans)',
})

export default function App() {
  const [tab, setTab] = useState('planning')

  const {
    weekOffset, setWeekOffset,
    weekNum, weekDates, weekTheme,
    recipes, loading, storageReady,
    loadFromCache, generateRecipe,
    generatedCount, cachedCount,
  } = useRecipes()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-0)',
      color: 'var(--text)',
      fontFamily: 'var(--font-sans)',
      maxWidth: 480,
      margin: '0 auto',
    }}>
      <Header
        weekNum={weekNum}
        weekDates={weekDates}
        weekTheme={weekTheme}
        weekOffset={weekOffset}
        setWeekOffset={setWeekOffset}
        generatedCount={generatedCount}
        cachedCount={cachedCount}
      />

      {/* Tabs */}
      <div style={{ display: 'flex', padding: '0 20px', borderBottom: '1px solid var(--bg-3)' }}>
        <button onClick={() => setTab('planning')} style={TAB_STYLE(tab === 'planning')}>Planning</button>
        <button onClick={() => setTab('courses')}  style={TAB_STYLE(tab === 'courses')}>Courses</button>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 20px 60px' }}>
        {tab === 'planning' && (
          <PlanningTab
            weekNum={weekNum}
            weekDates={weekDates}
            recipes={recipes}
            loading={loading}
            storageReady={storageReady}
            onGenerate={generateRecipe}
            onLoadCache={loadFromCache}
          />
        )}
        {tab === 'courses' && (
          <ShoppingTab recipes={recipes} weekNum={weekNum} />
        )}
      </div>
    </div>
  )
}
