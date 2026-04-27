import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-dark-200 bg-white text-dark-800">
      <div className="section-padding">
        <div className="container-max">
          <div className="mb-12 rounded-[2rem] border border-dark-200 bg-primary-50 p-6 md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-dark-500">Get 10% off your first order</p>
                <h3 className="mt-3 font-display text-3xl font-bold text-dark-900 md:text-4xl">Join for fresh meal updates and featured picks.</h3>
                <p className="mt-3 max-w-2xl text-sm text-dark-600 md:text-base">Get updates on trending dishes, refreshing drinks, and limited-time offers from Akpu4All.</p>
              </div>

              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-full border border-dark-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-dark-400 focus:ring-0"
                />
                <button type="button" className="whitespace-nowrap rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="mb-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <Link to="/" className="inline-block font-display text-2xl font-bold text-dark-900">Akpu4All</Link>
              <p className="text-sm text-dark-600">A modern food-ordering platform built around African Swallows, drinks, and smooth delivery checkout.</p>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-dark-900">Shop</h4>
              <ul className="space-y-2 text-sm text-dark-600">
                <li><Link to="/meals" className="hover:text-dark-900">Meals</Link></li>
                <li><Link to="/drinks" className="hover:text-dark-900">Drinks</Link></li>
                <li><Link to="/cart" className="hover:text-dark-900">Cart</Link></li>
                <li><Link to="/checkout" className="hover:text-dark-900">Checkout</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-dark-900">Company</h4>
              <ul className="space-y-2 text-sm text-dark-600">
                <li><Link to="/about" className="hover:text-dark-900">About</Link></li>
                <li><Link to="/contact" className="hover:text-dark-900">Contact</Link></li>
                <li><Link to="/login" className="hover:text-dark-900">Login</Link></li>
                <li><Link to="/register" className="hover:text-dark-900">Create Account</Link></li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-dark-900">Follow</h4>
              <div className="flex gap-3">
                {['Facebook', 'Instagram', 'YouTube'].map((label) => (
                  <a key={label} href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-dark-200 bg-white text-dark-700 transition-colors hover:bg-dark-100" aria-label={label}>
                    <span className="text-xs font-semibold uppercase tracking-wide">{label.charAt(0)}</span>
                  </a>
                ))}
              </div>
              <p className="text-sm text-dark-600">Recipes, offers, and food highlights in one place.</p>
            </div>
          </div>

          <div className="border-t border-dark-200 pt-8">
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
              <p className="text-sm text-dark-500">© 2026 Akpu4All. All rights reserved.</p>
              <p className="text-sm text-dark-500">Secure payments · fast checkout · Fast delievery</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
