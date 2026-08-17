'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

const inputClass =
  'w-full rounded-sm border border-border bg-secondary/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring'

export function ContactForm({ email }: { email: string }) {
  const [name, setName] = useState('')
  const [senderEmail, setSenderEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = `Portfolio message from ${name || 'website visitor'}`
    const body = `${message}\n\n— ${name}${senderEmail ? ` (${senderEmail})` : ''}`
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-6">
      <h2 className="font-heading text-lg font-semibold tracking-tight">Send Feedback</h2>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          placeholder="Your Email"
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Feedback"
          className={`${inputClass} resize-y`}
        />
      </div>

      <Button type="submit" className="mt-2 w-fit">
        Submit
      </Button>
    </form>
  )
}
