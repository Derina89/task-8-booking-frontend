import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../services/api'
function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      navigate('/services')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Login failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-container">
      <section className="auth-card">

        <div className="page-heading">
          <span>WELCOME BACK</span>
          <h1>Login to BookEase</h1>
          <p>
            Sign in to continue with your booking.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
            />
          </label>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <button
            type="submit"
            className="hero-btn auth-btn"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

        </form>

        <p className="auth-footer">
          Don't have an account?{' '}
          <Link to="/register">Create an account</Link>
        </p>

      </section>
    </main>
  )
}

export default Login