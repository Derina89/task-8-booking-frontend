import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import type { Service } from '../services/api'

function Review() {
  const location = useLocation()
  const navigate = useNavigate()

  const service = location.state?.service as Service | undefined
  const date = location.state?.date as string | undefined
  const time = location.state?.time as string | undefined
  const review = location.state?.review as string | undefined

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check that all required booking information exists
  if (!service || !date || !time) {
    return (
      <main className="page-container">
        <div className="state-message">
          <h2>Booking details not found</h2>
          <p>Please select a service and start the booking again.</p>

          <Link to="/services" className="hero-btn">
            View Services
          </Link>
        </div>
      </main>
    )
  }

  // At this point TypeScript knows these values exist
  const selectedService = service
  const selectedDate = date
  const selectedTime = time

  async function handleConfirm() {
    setError('')
    setLoading(true)

    try {
      const response = await fetch(
        'http://localhost:3000/api/bookings',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            service_id: selectedService.id,
            booking_date: selectedDate,
            booking_time: selectedTime,
            review: review || '',
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Unable to create booking.'
        )
      }

      navigate('/confirmation', {
        state: {
          booking: data.booking,
          service: selectedService,
          date: selectedDate,
          time: selectedTime,
        },
      })
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create booking.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="page-container">
      <section className="auth-card">

        <div className="page-heading">
          <span>REVIEW BOOKING</span>

          <h1>Check Your Details</h1>

          <p>
            Please review your booking before confirming it.
          </p>
        </div>

        <div className="booking-summary">

          <div>
            <strong>{selectedService.name}</strong>
            <span>Service</span>
          </div>

          <div>
            <strong>{selectedDate}</strong>
            <span>Date</span>
          </div>

          <div>
            <strong>{selectedTime}</strong>
            <span>Time</span>
          </div>

          <div>
            <strong>₹{selectedService.price}</strong>
            <span>Price</span>
          </div>

        </div>

        {review && (
          <div className="review-note">
            <strong>Your Notes</strong>
            <p>{review}</p>
          </div>
        )}

        {error && (
          <p className="form-error">
            {error}
          </p>
        )}

        <button
          className="hero-btn auth-btn"
          onClick={handleConfirm}
          disabled={loading}
        >
          {loading
            ? 'Confirming Booking...'
            : 'Confirm Booking'}
        </button>

      </section>
    </main>
  )
}

export default Review