
import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../services/api'

function Register() {
  const [name, setName] = useState('')
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
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      navigate('/login')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Registration failed'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-container">
      <section className="auth-card">
        <div className="page-heading">
          <span>CREATE ACCOUNT</span>
          <h1>Join BookEase</h1>
          <p>
            Create an account to book and manage your services.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Full Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              required
            />
          </label>

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
              placeholder="Create a password"
              required
              minLength={6}
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
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default Register
