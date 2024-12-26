import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateEventDto } from './dto/create-event.dto'
import { UpdateEventDto } from './dto/update-event.dto'
import { Event } from './interfaces/event.interface'
import { FilterEventsDto } from './dto/filter-events.dto'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class EventsService {
  private events: Map<string, Event> = new Map()

  create(createEventDto: CreateEventDto): Event {
    const id = uuidv4()
    const now = new Date()
    const event: Event = {
      id,
      ...createEventDto,
      createdAt: now,
      updatedAt: now,
    }
    this.events.set(id, event)
    return event
  }

  findAll(filters: FilterEventsDto): Event[] {
    let events = Array.from(this.events.values())

    if (filters.eventName) {
      events = events.filter((event) =>
        event.eventName.toLowerCase().includes(filters.eventName.toLowerCase()),
      )
    }

    if (filters.organizer) {
      events = events.filter((event) =>
        event.organizer.toLowerCase().includes(filters.organizer.toLowerCase()),
      )
    }
    if (filters.city) {
      events = events.filter(
        (event) =>
          event.location.city.toLowerCase() === filters.city.toLowerCase(),
      )
    }

    if (filters.state) {
      events = events.filter(
        (event) =>
          event.location.state.toLowerCase() === filters.state.toLowerCase(),
      )
    }

    if (filters.fromDate) {
      events = events.filter(
        (event) => new Date(event.eventDate) >= new Date(filters.fromDate),
      )
    }
    if (filters.toDate) {
      events = events.filter(
        (event) => new Date(event.eventDate) <= new Date(filters.toDate),
      )
    }

    return events
  }

  findOne(id: string): Event {
    const event = this.events.get(id)
    if (!event) {
      throw new NotFoundException(`Event with ID ${id} not found`)
    }
    return event
  }

  update(id: string, updateEventDto: UpdateEventDto): Event {
    const event = this.findOne(id)
    const updatedEvent = {
      ...event,
      ...updateEventDto,
      updatedAt: new Date(),
    }
    this.events.set(id, updatedEvent)
    return updatedEvent
  }

  remove(id: string): void {
    if (!this.events.delete(id)) {
      throw new NotFoundException(`Event with ID ${id} not found`)
    }
  }
}
