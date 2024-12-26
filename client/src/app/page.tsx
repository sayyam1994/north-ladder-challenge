'use client'

import { useEffect, useState } from 'react'
import { Event, EventFilters } from '@/types/event'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import EventList from '@/components/EventList'
import EventForm from '@/components/EventForm'

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [filters, setFilters] = useState<EventFilters>({
    organizer: '',
    city: '',
    state: '',
    fromDate: null,
    toDate: null,
    eventName: ''
  })

  const clearFilters = () => {
    setFilters({
      organizer: '',
      city: '',
      state: '',
      fromDate: null,
      toDate: null,
      eventName: ''
    })
  }

  const fetchEvents = async () => {
    const queryParams = new URLSearchParams()
    if (filters.organizer) queryParams.append('organizer', filters.organizer)
    if (filters.city) queryParams.append('city', filters.city)
    if (filters.state) queryParams.append('state', filters.state)
    if (filters.eventName) queryParams.append('eventName', filters.eventName)
    if (filters.fromDate)
      queryParams.append('fromDate', filters.fromDate.toISOString())
    if (filters.toDate)
      queryParams.append('toDate', filters.toDate.toISOString())

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/events?${queryParams}`
    )
    const data = await response.json()
    setEvents(data)
  }

  useEffect(() => {
    fetchEvents()
  }, [filters])

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Input
              placeholder="Event name"
              value={filters.eventName}
              onChange={(e) =>
                setFilters({ ...filters, eventName: e.target.value })
              }
              className="max-w-xs"
            />
            <Input
              placeholder="Filter by organizer"
              value={filters.organizer}
              onChange={(e) =>
                setFilters({ ...filters, organizer: e.target.value })
              }
              className="max-w-xs"
            />
            <Input
              placeholder="Filter by city"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              className="max-w-xs"
            />
            <Input
              placeholder="Filter by state"
              value={filters.state}
              onChange={(e) =>
                setFilters({ ...filters, state: e.target.value })
              }
              className="max-w-xs"
            />
          </div>
          <div className="flex gap-4 items-center">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">Select Date Range</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select Date Range</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4">
                  <div>
                    <p className="mb-2">From Date</p>
                    <Calendar
                      mode="single"
                      selected={filters.fromDate || undefined}
                      onSelect={(date) =>
                        setFilters({ ...filters, fromDate: date || null })
                      }
                    />
                  </div>
                  <div>
                    <p className="mb-2">To Date</p>
                    <Calendar
                      mode="single"
                      selected={filters.toDate || undefined}
                      onSelect={(date) =>
                        setFilters({ ...filters, toDate: date || null })
                      }
                    />
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="ml-auto"
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-8">Create New Event</Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Event</DialogTitle>
          </DialogHeader>
          <EventForm
            onSubmit={() => {
              fetchEvents()
              setIsDialogOpen(false)
            }}
          />
        </DialogContent>
      </Dialog>

      <EventList events={events} onEventUpdated={fetchEvents} />
    </div>
  )
}
