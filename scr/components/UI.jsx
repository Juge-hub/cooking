export function Spinner() {
  return (
    <div style={{ display: 'flex', gap: 5, justifyContent: 'center', padding: '18px 0' }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: '50%',
          background: 'var(--gold)',
          animation: `pulse 1.1s ease-in-out ${i * 0.18}s infinite`,
        }} />
      ))}
    </div>
  )
}

export function Tag({ children }) {
  return (
    <span style={{
      background: 'var(--bg-3)', border: '1px solid var(--border)',
      borderRadius: 5, padding: '3px 9px',
      color: 'var(--gold)', fontSize: 11, fontWeight: 600,
      letterSpacing: '0.5px', textTransform: 'uppercase',
    }}>
      {children}
    </span>
  )
}

export function CachedBadge() {
  return (
    <span style={{
      background: 'var(--green-bg)', border: '1px solid var(--green-border)',
      borderRadius: 4, padding: '1px 6px',
      color: 'var(--green)', fontSize: 9, fontWeight: 700, letterSpacing: 1,
    }}>
      SAUVEGARDÉ
    </span>
  )
}

export function PrimaryButton({ onClick, disabled, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: '100%',
      background: disabled
        ? 'var(--border)'
        : 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
      border: 'none', borderRadius: 8,
      color: '#0A0804', fontWeight: 700, fontSize: 14,
      padding: '13px', cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      transition: 'opacity .2s',
    }}>
      {children}
    </button>
  )
}

export function GhostButton({ onClick, children }) {
  return (
    <button onClick={onClick} style={{
      width: '100%',
      background: 'transparent', border: '1px solid var(--border)',
      borderRadius: 7, color: 'var(--text-muted)',
      padding: '9px 0', cursor: 'pointer', fontSize: 12.5,
    }}>
      {children}
    </button>
  )
}

export function Label({ children }) {
  return (
    <p style={{
      color: 'var(--text-muted)', fontSize: 10, fontWeight: 700,
      letterSpacing: 2, textTransform: 'uppercase',
      marginBottom: 8,
    }}>
      {children}
    </p>
  )
}
