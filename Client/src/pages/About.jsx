import { motion } from 'framer-motion'

export default function About() {
  return (
    <motion.section initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="section-padding bg-primary-50">
      <div className="container-max space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">About Akpu4All</p>
            <h1 className="max-w-2xl font-display text-4xl font-bold text-dark-900 md:text-5xl lg:text-6xl">
              A modern food ordering platform built for everyday swallow cravings.
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-dark-600 md:text-lg">
              Akpu4All connects you to delicious Swallows and refreshing drinks with a smooth cart and checkout flow that stays clean, mobile-first, and easy to use.
            </p>
          </div>

          <div className="card overflow-hidden rounded-[2rem]">
            <img
              src="https://media.istockphoto.com/id/1409729992/photo/hectic-cooks-working-in-a-busy-commercial-kitchen-at-a-restaurant.jpg?s=612x612&w=0&k=20&c=AqHyRan5GxcFgZ7qbkeY7IOM_DNsMUuj2RrnGXvMF2M="
              alt="Akpu4All food ordering experience"
              className="h-full min-h-[320px] w-full object-cover"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: 'Our Story', text: 'Akpu4All was built by Hosea to make ordering of local swallows simple, fast, and reliable for everyone.' },
            { title: 'Our Promise', text: 'From menu discovery to checkout, every step is designed for clarity and convenience.' },
            { title: 'Our Focus', text: 'Mobile-first design, smoother ordering flow, and a better everyday swallow experience.' },
          ].map((item) => (
            <article key={item.title} className="card p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">{item.title}</p>
              <h2 className="mt-3 text-2xl font-bold text-dark-900">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-dark-600">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
