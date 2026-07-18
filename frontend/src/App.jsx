import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [backendStatus, setBackendStatus] = useState('checking')
  const [backendData, setBackendData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${apiBaseUrl}/api/health`)
      if (!response.ok) throw new Error(`HTTP error status: ${response.status}`)
      const data = await response.json()
      setBackendStatus('connected')
    } catch (err) {
      console.error('Failed to connect to backend:', err)
      setBackendStatus('disconnected')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${apiBaseUrl}/api/data`)
      if (!response.ok) throw new Error(`HTTP error status: ${response.status}`)
      const data = await response.json()
      setBackendData(data.items)
      setBackendStatus('connected')
    } catch (err) {
      console.error('Failed to fetch data:', err)
      setBackendStatus('disconnected')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkHealth()
  }, [])

  return (
    <div className="app-container">
      <header className="header">
        <div className="badge">
          ⚡ Vite + React & FastAPI Boilerplate
        </div>
        <h1 className="title">Full-Stack Application</h1>
        <p className="subtitle">Configured with Environment Variables & Clean Architecture</p>
      </header>

      <div className="status-card">
        <div className="card-header">
          <h2 className="card-title">Backend Connection</h2>
          <div className={`status-indicator ${backendStatus}`}>
            <span className="status-dot"></span>
            {backendStatus === 'connected' && 'Connected'}
            {backendStatus === 'disconnected' && 'Disconnected'}
            {backendStatus === 'checking' && 'Checking...'}
          </div>
        </div>
        <div className="env-info">
          <strong>Configured API URL:</strong> {apiBaseUrl}
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={fetchData} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch Sample Data from FastAPI'}
        </button>
        <button className="btn" onClick={checkHealth} style={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}>
          Re-check Connection
        </button>
      </div>

      {error && (
        <div style={{
          padding: '1rem',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '0.5rem',
          color: '#fca5a5',
          marginBottom: '2rem'
        }}>
          ⚠️ Could not connect to FastAPI server at <code>{apiBaseUrl}</code>. Make sure the backend is running.
        </div>
      )}

      {backendData && (
        <section>
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>Items from FastAPI Backend</h2>
          <div className="grid">
            {backendData.map((item) => (
              <div key={item.id} className="data-card">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span className="tag">{item.status}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default App
