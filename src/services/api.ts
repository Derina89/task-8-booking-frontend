
export interface Service {
  id: number
  name: string
  description: string
  duration: string
  price: number
}

export const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function getServices(): Promise<Service[]> {
  const response = await fetch(`${API_URL}/services`)

  if (!response.ok) {
    throw new Error('Failed to load services')
  }

  const data = await response.json()

  return data.services
}
