export interface Location {
  street: string
  city: string
  state: string
  zip: string
}

export interface Event {
  id: string
  eventName: string
  eventDate: string
  organizer: string
  email: string
  phone: string
  location: Location
  createdAt: string
  updatedAt: string
}

export interface EventFormData {
  eventName: string
  eventDate: string
  organizer: string
  email: string
  phone: string
  location: Location
}

export interface EventFilters {
  organizer: string
  city: string
  state: string
  fromDate: Date | null
  toDate: Date | null
  eventName: string
}
