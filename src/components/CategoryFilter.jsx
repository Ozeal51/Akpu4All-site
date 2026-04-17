export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      <button
        type="button"
        className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all sm:text-sm ${active === 'All' ? 'border-dark-900 bg-dark-900 text-white' : 'border-dark-300 bg-white text-dark-700 hover:border-dark-600'}`}
        onClick={() => onChange('All')}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition-all sm:text-sm ${active === c ? 'border-dark-900 bg-dark-900 text-white' : 'border-dark-300 bg-white text-dark-700 hover:border-dark-600'}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
