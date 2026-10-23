
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../services/api'

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

 
useEffect(() => {
  const checkLogin = () => {
    fetch(`${API_URL}/profile`, {
      credentials: 'include',
    })
      .then((response) => {
        setIsLoggedIn(response.ok)
      })
      .catch(() => {
        setIsLoggedIn(false)
      })
  }

  checkLogin()

  window.addEventListener('auth-change', checkLogin)

  return () => {
    window.removeEventListener('auth-change', checkLogin)
  }
}, [])


  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_URL}/logout`, {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        setIsLoggedIn(false)
        window.dispatchEvent(new Event('auth-change'))
        navigate('/login')
      } else {
        alert('Unable to logout. Please try again.')
      }
    } catch (error) {
      console.error('Logout error:', error)
      alert('Unable to connect to the server.')
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="logo">
          BookEase
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>

          {isLoggedIn ? (
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
