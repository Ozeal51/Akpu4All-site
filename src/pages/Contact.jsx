import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  const onSubmit = (e) => {
    e.preventDefault()
    alert('Thanks for contacting Akpu4All! We will reach out shortly.')
    setForm({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <section className="section-padding bg-gradient-to-b from-primary-50 to-white">
        <div className="container-max grid gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-display font-bold text-dark-900 md:text-6xl">Contact Us</h1>
            <p className="mt-4 text-dark-600">Send us a message and our team will get back shortly.</p>
            <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-dark-100 bg-white p-6 shadow-soft">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-semibold text-dark-800">Name</label>
                <input id="name" name="name" value={form.name} onChange={onChange} required className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark-800">Email</label>
                <input id="email" type="email" name="email" value={form.email} onChange={onChange} required className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark-800">Phone</label>
                <input id="phone" name="phone" value={form.phone} onChange={onChange} className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-dark-800">Message</label>
                <textarea id="message" rows={4} name="message" value={form.message} onChange={onChange} required className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
              </div>
              <button type="submit" className="btn-primary">Submit</button>
            </form>
          </div>

          <div className="overflow-hidden rounded-2xl border border-dark-100 bg-white p-2 shadow-soft">
            <div className="aspect-[4/3]">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3939.866798474902!2d7.462087869598943!3d9.075897464086673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0b6a51fb0f3b%3A0x5a97c0944d66fc0a!2sDELIZZ%20SUPERMARKET%20ABUJA!5e0!3m2!1sen!2sng!4v1772630055183!5m2!1sen!2sng" 
            className="h-full w-full"
            style={{border:0}} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
