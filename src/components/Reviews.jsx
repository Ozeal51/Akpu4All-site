const reviews = [
  { name: 'Mrs Joy', text: 'Amazing Akpu and Nsala! Tastes like home.' },
  { name: 'Mr Smmy', text: 'Fast delivery and great portions.' },
  { name: 'Miss Eliana', text: 'Love the Akpu with oha soup — perfectly made.' },
]

export default function Reviews() {
  return (
    <section className="space-y-4">
      <h3 className="text-2xl font-bold text-dark-900">Customer Reviews</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {reviews.map((r, idx) => (
          <article key={idx} className="card p-5">
            <p className="italic text-dark-700">“{r.text}”</p>
            <p className="mt-3 text-sm text-dark-500">— {r.name}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
