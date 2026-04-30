import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState('')
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setStatus('')

    const subject = encodeURIComponent(`Akpu4All contact from ${form.name || 'Website visitor'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`,
    )

    const mailtoUrl = `mailto:sirozeal51@gmail.com?subject=${subject}&body=${body}`
    const whatsappText = encodeURIComponent(
      `Hello Akpu4All, my name is ${form.name}. ${form.message}`,
    )

    window.open(mailtoUrl, '_blank', 'noopener,noreferrer')
    window.open(`https://wa.me/2349021927275?text=${whatsappText}`, '_blank', 'noopener,noreferrer')

    setForm({ name: '', email: '', phone: '', message: '' })
    setStatus('Your message is ready in email and WhatsApp. Send it from either tab that opened.')
    setSending(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <section className="section-padding bg-primary-50">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">Contact</p>
              <h1 className="mt-3 font-display text-4xl font-bold text-dark-900 md:text-5xl">Get in touch</h1>
              <p className="mt-4 max-w-xl text-sm text-dark-600 md:text-lg">Send us a message and our team will get back shortly.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Email', value: 'sirozeal51@gmail.com' },
                { label: 'Phone', value: '+234 9021927275' },
                { label: 'Hours', value: 'Mon - Sat · 9am - 11pm' },
              ].map((item) => (
                <article key={item.label} className="card p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-dark-900">{item.value}</p>
                </article>
              ))}
            </div>

            <form onSubmit={onSubmit} className="space-y-4 rounded-[2rem] border border-dark-100 bg-white p-6 shadow-soft">
              {status ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {status}
                </div>
              ) : null}

              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-dark-800">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark-800">Email</label>
                <input id="email" type="email" name="email" value={form.email} onChange={onChange} required className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark-800">Phone</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange} className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-dark-800">Message</label>
                <textarea id="message" rows={4} name="message" value={form.message} onChange={onChange} required className="w-full rounded-[1.5rem] border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto" disabled={sending}>
                {sending ? 'Opening contact options...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-dark-100 bg-white p-3 shadow-soft">
            <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] sm:aspect-[4/3]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.866798474902!2d7.462087869598943!3d9.075897464086673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b6a51fb0f3b%3A0x5a97c0944d66fc0a!2sDELIZZ%20SUPERMARKET%20ABUJA!5e0!3m2!1sen!2sng!4v1772630055183!5m2!1sen!2sng"
                className="h-full w-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
