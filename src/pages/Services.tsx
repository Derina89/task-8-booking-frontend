import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import Loading from '../components/Loading'
import { getServices, type Service } from '../services/api'

function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    async function loadServices() {
      try {
        const data = await getServices()
        setServices(data)
      } catch {
        setError('Unable to load services. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadServices()
  }, [])

  function handleBook(service: Service) {
    navigate(`/booking/${service.id}`, {
      state: { service }
    })
  }

  if (loading) {
    return (
      <main className="page-container">
        <Loading />
      </main>
    )
  }

  if (error) {
    return (
      <main className="page-container">
        <div className="state-message error-state">
          <h2>Something went wrong</h2>
          <p>{error}</p>
        </div>
      </main>
    )
  }

  if (services.length === 0) {
    return (
      <main className="page-container">
        <div className="state-message">
          <h2>No services available</h2>
          <p>Please check again later.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="page-container">

      <section className="page-heading">
        <span>OUR SERVICES</span>

        <h1>Choose a Service</h1>

        <p>
          Select a service that fits your needs and
          book a convenient time.
        </p>
      </section>

      <section className="service-grid">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onBook={handleBook}
          />
        ))}
      </section>

    </main>
  )
}

export default Services