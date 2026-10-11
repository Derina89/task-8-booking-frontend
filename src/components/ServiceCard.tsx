import type { Service } from '../services/api'

interface ServiceCardProps {
  service: Service
  onBook: (service: Service) => void
}

function ServiceCard({ service, onBook }: ServiceCardProps) {
  return (
    <article className="service-card">
      <span className="service-duration">
        {service.duration}
      </span>

      <h3>{service.name}</h3>

      <p>{service.description}</p>

      <div className="service-bottom">
        <strong>₹{service.price}</strong>

        <button
          className="service-btn"
          onClick={() => onBook(service)}
        >
          Book Now
        </button>
      </div>
    </article>
  )
}

export default ServiceCard