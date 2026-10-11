import { Link, useLocation } from 'react-router-dom'
import type { Service } from '../services/api'

function Confirmation() {
  const location = useLocation()

  const booking = location.state?.booking
  const service = location.state?.service as Service | undefined
  const date = location.state?.date
  const time = location.state?.time

  return (
    <main className="page-container">
      <section className="auth-card confirmation-card">
        <div className="page-heading">
          <span>BOOKING CONFIRMED</span>
          <h1>Your booking is confirmed! 🎉</h1>
          <p>
            Thank you for choosing BookEase. Your service has been successfully booked.
          </p>
        </div>

        {service && (
          <div className="booking-summary">
            <div>
              <strong>{service.name}</strong>
              <span>Service</span>
            </div>

            <div>
              <strong>{date}</strong>
              <span>Date</span>
            </div>

            <div>
              <strong>{time}</strong>
              <span>Time</span>
            </div>

            <div>
              <strong>₹{service.price}</strong>
              <span>Price</span>
            </div>
          </div>
        )}

        {booking && (
          <p className="confirmation-id">
            Booking ID: #{booking.id}
          </p>
        )}

        <Link to="/services" className="hero-btn">
          Browse More Services
        </Link>
      </section>
    </main>
  )
}

export default Confirmation