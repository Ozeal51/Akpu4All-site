export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input
      type="search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mb-4 w-full rounded-full border border-dark-300 bg-white px-5 py-3 text-sm text-dark-800 placeholder:text-dark-500 focus:border-dark-600 focus:ring-0"
    />
  )
}
