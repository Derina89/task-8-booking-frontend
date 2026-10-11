import { Link } from 'react-router-dom'

function Home() {
  return (
    <main className="hero-section">
      <div className="hero-content">
        <span className="hero-badge">BOOKEASE</span>

        <h1>
          Book the right service.
          <br />
          At the right time.
        </h1>

        <p>
          Discover trusted services, choose a convenient time,
          and manage your bookings in one simple place.
        </p>

        <Link to="/services" className="hero-btn">
          Explore Services
        </Link>
      </div>
    </main>
  )
}

export default Home