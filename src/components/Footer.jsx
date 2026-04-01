import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      {/* Main Footer */}
      <div className="section-padding">
        <div className="container-max">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="font-display font-bold text-2xl gradient-text inline-block">
                Akpu4All
              </Link>
              <p className="text-dark-300 text-sm">
                Experience authentic Nigerian cuisine delivered fresh to your doorstep.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-dark-800 hover:bg-accent-500 flex items-center justify-center transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-dark-800 hover:bg-accent-500 flex items-center justify-center transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4c0 3.2-2.6 5.8-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2zm0 2C5.7 4 4 5.7 4 7.8v8.4c0 2.1 1.7 3.8 3.8 3.8h8.4c2.1 0 3.8-1.7 3.8-3.8V7.8c0-2.1-1.7-3.8-3.8-3.8H7.8zm7 2.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5-1.5-.7-1.5-1.5.7-1.5 1.5-1.5zm-4 1.5c2.5 0 4.5 2 4.5 4.5s-2 4.5-4.5 4.5-4.5-2-4.5-4.5 2-4.5 4.5-4.5zm0 2c-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5-1.1-2.5-2.5-2.5z" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-dark-800 hover:bg-accent-500 flex items-center justify-center transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Quick Links</h4>
              <ul className="space-y-2 text-dark-300">
                <li><Link to="/meals" className="hover:text-accent-400 transition-colors">Meals</Link></li>
                <li><Link to="/drinks" className="hover:text-accent-400 transition-colors">Drinks</Link></li>
                <li><Link to="/about" className="hover:text-accent-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-accent-400 transition-colors">Contact</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Support</h4>
              <ul className="space-y-2 text-dark-300">
                <li><a href="#" className="hover:text-accent-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Delivery Info</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Track Order</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Legal</h4>
              <ul className="space-y-2 text-dark-300">
                <li><a href="#" className="hover:text-accent-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-accent-400 transition-colors">Accessibility</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-dark-800"></div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-dark-400 text-sm">
              © 2026 Akpu4All. All rights reserved.
            </p>
            <div className="flex gap-4">
              <span className="text-dark-400 text-sm">Secure Payments:</span>
              <span className="text-dark-300 text-xs">💳 All Major Cards</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
