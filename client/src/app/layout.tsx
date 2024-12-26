import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import { ThemeToggle } from '@/components/ThemeToggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Event Management Platform',
  description: 'Manage your events with ease'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen bg-background text-foreground max-w-7xl mx-auto">
            <header className="container mx-auto p-8 flex justify-between items-center">
              <h1 className="text-3xl font-bold">Event Management Platform</h1>
              <ThemeToggle />
            </header>
            <main className="container mx-auto p-4">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
