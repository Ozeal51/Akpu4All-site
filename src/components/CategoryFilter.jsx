export default function CategoryFilter({ categories, active, onChange }) {
  return (
    <div className="mb-3 flex flex-wrap gap-3">
      <button
        type="button"
        className={`rounded-full px-5 py-2 font-medium transition-all ${active === 'All' ? 'bg-accent-500 text-white shadow-md' : 'bg-dark-100 text-dark-900 hover:bg-dark-200'}`}
        onClick={() => onChange('All')}
      >
        All
      </button>
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          className={`rounded-full px-5 py-2 font-medium transition-all ${active === c ? 'bg-accent-500 text-white shadow-md' : 'bg-dark-100 text-dark-900 hover:bg-dark-200'}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  )
}
