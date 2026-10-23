
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { Service } from '../services/api'

function Booking() {
  const location = useLocation()
  const navigate = useNavigate()

  const service = location.state?.service as Service | undefined

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [review, setReview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Get today's date in local YYYY-MM-DD format.
  const now = new Date()
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-')

  if (!service) {
    return (
      <main className="page-container">
        <div className="state-message">
          <h2>No service selected</h2>
          <p>Please choose a service before booking.</p>

          <button
            className="hero-btn"
            onClick={() => navigate('/services')}
          >
            View Services
          </button>
        </div>
      </main>
    )
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (!date || !time) {
      setError('Please select a date and time.')
      return
    }

    // Prevent past dates even if the input restriction is bypassed.
    if (date < today) {
      setError('Please select today or a future date.')
      return
    }

    setLoading(true)

    navigate('/review', {
      state: {
        service,
        date,
        time,
        review,
      },
    })
  }

  return (
    <main className="page-container">
      <section className="auth-card">
        <div className="page-heading">
          <span>BOOKING</span>
          <h1>{service.name}</h1>
          <p>{service.description}</p>
        </div>

        <div className="booking-summary">
          <strong>₹{service.price}</strong>
          <span>{service.duration}</span>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Booking Date

            <input
              type="date"
              min={today}
              value={date}
              onChange={(event) => {
                setDate(event.target.value)
                setError('')
              }}
              required
            />
          </label>

          <label>
            Choose Time

            <select
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            >
              <option value="">Select a time</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:30">10:30 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">02:00 PM</option>
              <option value="16:00">04:00 PM</option>
            </select>
          </label>

          <label>
            Review / Notes

            <textarea
              value={review}
              onChange={(event) => setReview(event.target.value)}
              placeholder="Add any notes for your booking..."
              rows={4}
            />
          </label>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="hero-btn auth-btn"
            disabled={loading}
          >
            {loading ? 'Opening Review...' : 'Review Booking'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default Booking
