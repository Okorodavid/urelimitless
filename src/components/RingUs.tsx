import { useState, type FormEvent } from 'react'
import { CONTACT_EMAIL, FORM_ENDPOINT } from '../config'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function RingUs() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>
    setError(null)

    if (!data.need?.trim()) {
      setError('Tell us what you need; one line is enough.')
      form.querySelector<HTMLTextAreaElement>('[name=need]')?.focus()
      return
    }

    if (FORM_ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error(`The form endpoint answered ${res.status}.`)
        setStatus('sent')
        form.reset()
      } catch (err) {
        setStatus('error')
        setError(err instanceof Error ? err.message : 'The ticket did not send. Try the email address below instead.')
      }
      return
    }

    const subject = encodeURIComponent(`Ticket from ${data.company || 'a company'}: ${data.need.slice(0, 60)}`)
    const body = encodeURIComponent(
      `Company: ${data.company || '-'}\nWhat we need: ${data.need}\nTools we already use: ${data.tools || '-'}\nReply to: ${data.email || '-'}\n`,
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
    setStatus('sent')
  }

  return (
    <section id="ring" className="border-t border-brass/30 bg-bakelite-deep/60">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-10 lg:py-28">
        <div className="lg:col-span-5">
          <h2 className="display text-[2.8rem] text-cream sm:text-[3.6rem] lg:text-[4.4rem]">Ring the operator.</h2>
          <p className="mt-5 max-w-[30rem] text-cream-dim">
            Raise a ticket with what you need. We read every one, reply by email, and if it is a fit we book a call to
            patch the line.
          </p>
          <dl className="mt-8 grid max-w-[30rem] gap-5 border-t border-brass/40 pt-6">
            <div>
              <dt className="label text-[0.68rem] text-brass-hi">Good tickets</dt>
              <dd className="mt-1.5 text-cream-dim">
                A job in plain words, the tools you already pay for, and who will use the result.
              </dd>
            </div>
            <div>
              <dt className="label text-[0.68rem] text-brass-hi">Prefer email</dt>
              <dd className="mt-1.5">
                <a href={`mailto:${CONTACT_EMAIL}`} className="ticket text-cream underline decoration-brass/60 hover:decoration-amber">
                  {CONTACT_EMAIL}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <form onSubmit={onSubmit} className="paper relative rounded-sm px-6 pb-8 pt-7 sm:px-9 lg:col-span-7 lg:col-start-6" noValidate>
          <div className="flex items-center justify-between border-b-2 border-ink/80 pb-3">
            <span className="ticket text-[0.95rem] text-ink">TOLL TICKET · NEW</span>
            <span className="ticket text-[0.95rem] text-ink/70">urelimitless exchange</span>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Company" name="company" placeholder="Acme Logistics" autoComplete="organization" />
            <Field label="Reply to" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
          </div>
          <Field
            label="What do you need"
            name="need"
            as="textarea"
            placeholder="An agent that answers customer email in our tone, and a person to run it for the first month."
            required
            className="mt-5"
          />
          <Field label="Tools you already use" name="tools" placeholder="Gmail, HubSpot, Slack, Google Sheets" className="mt-5" />

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
              <span className={`lamp ${status === 'sending' ? '' : 'is-lit'}`} aria-hidden />
              {status === 'sending' ? 'Ringing…' : 'Ring the operator'}
            </button>
            <p className="ticket text-[0.85rem] text-ink/70" aria-live="polite">
              {status === 'sent' && 'Ticket raised. We will reply by email.'}
              {status === 'idle' && !FORM_ENDPOINT && 'Opens your mail app with the ticket filled in.'}
            </p>
          </div>
          {error && (
            <p role="alert" className="ticket mt-4 border-l-[1px] border-cord-red pl-3 text-[0.9rem] text-cord-red">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  as = 'input',
  type = 'text',
  placeholder,
  required,
  autoComplete,
  className = '',
}: {
  label: string
  name: string
  as?: 'input' | 'textarea'
  type?: string
  placeholder?: string
  required?: boolean
  autoComplete?: string
  className?: string
}) {
  const id = `field-${name}`
  const base =
    'ticket mt-1 w-full border-0 border-b border-ink/40 bg-transparent px-0 py-1.5 text-[1.05rem] text-ink placeholder:text-ink/60 focus:border-cord-blue focus:outline-none'
  return (
    <div className={className}>
      <label htmlFor={id} className="label block text-[0.66rem] text-ink/70">
        {label}
        {required && <span className="ml-1 text-cord-red">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea id={id} name={name} rows={3} placeholder={placeholder} required={required} className={`${base} resize-y`} />
      ) : (
        <input id={id} name={name} type={type} placeholder={placeholder} required={required} autoComplete={autoComplete} className={base} />
      )}
    </div>
  )
}
