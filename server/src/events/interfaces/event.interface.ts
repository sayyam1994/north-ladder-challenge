import { Location } from '../interfaces/location.interface'

export interface Event {
  id: string
  eventName: string
  eventDate: Date
  organizer: string
  email: string
  phone: string
  location: Location
  createdAt: Date
  updatedAt: Date
}
