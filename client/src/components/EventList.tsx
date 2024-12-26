import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import EventForm from './EventForm'
import { Event } from '@/types/event'
import { useState } from 'react'

interface EventListProps {
  events: Event[]
  onEventUpdated: () => void
}

export default function EventList({ events, onEventUpdated }: EventListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const deleteEvent = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/events/${id}`, {
      method: 'DELETE'
    })
    onEventUpdated()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.eventName}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Date:</strong>{' '}
                {new Date(event.eventDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Organizer:</strong> {event.organizer}
              </p>
              <p>
                <strong>Location:</strong> {event.location.city},{' '}
                {event.location.state}
              </p>
              <div className="flex gap-2 mt-4">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Event</DialogTitle>
                    </DialogHeader>
                    <EventForm
                      event={event}
                      onSubmit={() => {
                        setIsDialogOpen(false)
                        onEventUpdated()
                      }}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => deleteEvent(event.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
