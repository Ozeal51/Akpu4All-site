import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatPrice.js'
import { ordersAPI } from '../services/api.js'

export default function Profile() {
  const { user, loading, logout, updateProfile, changePassword } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({ name: user?.name || '', phone: user?.phone || '' })
  const [pwData, setPwData] = useState({ currentPassword: '', newPassword: '', confirmNew: '' })
  const [profileMsg, setProfileMsg] = useState(null)
  const [pwMsg, setPwMsg] = useState(null)
  const [savingProfile, setSavingProfile] = useState(false)
  const [savingPw, setSavingPw] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [ordersError, setOrdersError] = useState('')

  useEffect(() => {
    if (!user) return

    let isMounted = true

    const loadOrders = async () => {
      setOrdersLoading(true)
      setOrdersError('')

      try {
        const { data } = await ordersAPI.listMine()
        if (isMounted) {
          setOrders(data.orders || [])
        }
      } catch (error) {
        if (isMounted) {
          setOrdersError('We could not load your recent orders right now.')
        }
      } finally {
        if (isMounted) {
          setOrdersLoading(false)
        }
      }
    }

    loadOrders()

    return () => {
      isMounted = false
    }
  }, [user])

  useEffect(() => {
    setProfileData({ name: user?.name || '', phone: user?.phone || '' })
  }, [user])

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders])

  const handleProfileChange = (e) => {
    setProfileData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setProfileMsg(null)
  }

  const handlePwChange = (e) => {
    setPwData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setPwMsg(null)
  }

  const handleProfileSave = async (e) => {
    e.preventDefault()
    if (!profileData.name.trim()) {
      setProfileMsg({ type: 'danger', text: 'Name cannot be empty' })
      return
    }

    setSavingProfile(true)
    const result = await updateProfile(profileData)
    setSavingProfile(false)
    setProfileMsg(result.success ? { type: 'success', text: 'Profile updated!' } : { type: 'danger', text: result.message })
  }

  const handlePwSave = async (e) => {
    e.preventDefault()

    if (!pwData.currentPassword || !pwData.newPassword || !pwData.confirmNew) {
      setPwMsg({ type: 'danger', text: 'Please fill in all fields' })
      return
    }
    if (pwData.newPassword.length < 6) {
      setPwMsg({ type: 'danger', text: 'New password must be at least 6 characters' })
      return
    }
    if (pwData.newPassword !== pwData.confirmNew) {
      setPwMsg({ type: 'danger', text: 'Passwords do not match' })
      return
    }

    setSavingPw(true)
    const result = await changePassword({ currentPassword: pwData.currentPassword, newPassword: pwData.newPassword })
    setSavingPw(false)

    if (result.success) {
      setPwMsg({ type: 'success', text: 'Password changed successfully!' })
      setPwData({ currentPassword: '', newPassword: '', confirmNew: '' })
    } else {
      setPwMsg({ type: 'danger', text: result.message })
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  if (loading) {
    return (
      <section className="section-padding bg-primary-50">
        <div className="container-max max-w-3xl">
          <div className="card animate-pulse rounded-[2rem] bg-white p-8 shadow-soft">
            <div className="h-6 w-32 rounded bg-dark-100" />
            <div className="mt-4 h-10 w-64 rounded bg-dark-100" />
            <div className="mt-6 h-80 rounded-[1.5rem] bg-dark-100" />
          </div>
        </div>
      </section>
    )
  }

  if (!user) return null

  const avatarInitial = user.name?.charAt(0).toUpperCase() || '?'

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-primary-50 px-4 py-12">
      <div className="container-max max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="mb-6 flex flex-wrap items-center gap-4 rounded-[2rem] bg-dark-900 p-6 text-white shadow-soft">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/60 bg-white/20 text-2xl font-bold">
              {avatarInitial}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-white/90">{user.email}</p>
              <span className="mt-1 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold capitalize">{user.role}</span>
            </div>
            <button type="button" className="ml-auto rounded-full border border-white/60 px-4 py-2 text-sm font-semibold hover:bg-white/10" onClick={handleLogout}>
              Sign Out
            </button>
          </div>

          <div className="rounded-[2rem] border border-dark-100 bg-white p-6 shadow-soft">
            <div className="mb-6 flex gap-2 border-b border-dark-200 pb-3">
              <button type="button" onClick={() => setActiveTab('profile')} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === 'profile' ? 'bg-dark-900 text-white' : 'bg-dark-100 text-dark-700 hover:bg-dark-200'}`}>
                Profile Info
              </button>
              <button type="button" onClick={() => setActiveTab('security')} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === 'security' ? 'bg-dark-900 text-white' : 'bg-dark-100 text-dark-700 hover:bg-dark-200'}`}>
                Security
              </button>
              <button type="button" onClick={() => setActiveTab('orders')} className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab === 'orders' ? 'bg-dark-900 text-white' : 'bg-dark-100 text-dark-700 hover:bg-dark-200'}`}>
                Orders
              </button>
            </div>

            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSave} className="space-y-4">
                {profileMsg && (
                  <div className={`rounded-lg border px-4 py-3 text-sm ${profileMsg.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                    {profileMsg.text}
                  </div>
                )}

                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold text-dark-800">Full Name</label>
                  <input id="name" name="name" value={profileData.name} onChange={handleProfileChange} className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark-800">Email</label>
                  <input id="email" type="email" value={user.email} disabled className="w-full rounded-full border-2 border-dark-200 bg-dark-100 px-4 py-3 text-dark-500" />
                  <p className="mt-1 text-xs text-dark-500">Email cannot be changed.</p>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark-800">Phone Number</label>
                  <input id="phone" type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} placeholder="+234 000 000 0000" className="w-full rounded-full border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
                </div>

                <button type="submit" className="btn-primary" disabled={savingProfile}>
                  {savingProfile ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePwSave} className="space-y-4">
                {pwMsg && (
                  <div className={`rounded-lg border px-4 py-3 text-sm ${pwMsg.type === 'success' ? 'border-green-200 bg-green-50 text-green-700' : 'border-red-200 bg-red-50 text-red-700'}`}>
                    {pwMsg.text}
                  </div>
                )}

                <div>
                  <label htmlFor="currentPassword" className="mb-2 block text-sm font-semibold text-dark-800">Current Password</label>
                  <div className="relative">
                    <input id="currentPassword" type={showCurrent ? 'text' : 'password'} name="currentPassword" value={pwData.currentPassword} onChange={handlePwChange} autoComplete="current-password" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 pr-12 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowCurrent((v) => !v)}>
                      {showCurrent ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="newPassword" className="mb-2 block text-sm font-semibold text-dark-800">New Password</label>
                  <div className="relative">
                    <input id="newPassword" type={showNew ? 'text' : 'password'} name="newPassword" value={pwData.newPassword} onChange={handlePwChange} placeholder="Min. 6 characters" autoComplete="new-password" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 pr-12 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
                    <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowNew((v) => !v)}>
                      {showNew ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmNew" className="mb-2 block text-sm font-semibold text-dark-800">Confirm New Password</label>
                  <input id="confirmNew" type="password" name="confirmNew" value={pwData.confirmNew} onChange={handlePwChange} placeholder="Repeat new password" autoComplete="new-password" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
                  {pwData.confirmNew && pwData.newPassword !== pwData.confirmNew && <p className="mt-1 text-xs text-red-600">Passwords do not match</p>}
                </div>

                <button type="submit" className="btn-primary" disabled={savingPw}>
                  {savingPw ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">Recent Orders</p>
                  <h2 className="mt-2 text-2xl font-bold text-dark-900">Your order history</h2>
                  <p className="mt-2 text-sm text-dark-600">Track your latest purchases and review what you ordered.</p>
                </div>

                {ordersError ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
                    {ordersError}
                  </div>
                ) : null}

                {ordersLoading ? (
                  <div className="space-y-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="h-24 animate-pulse rounded-2xl bg-dark-100" />
                    ))}
                  </div>
                ) : recentOrders.length ? (
                  <div className="space-y-3">
                    {recentOrders.map((order) => (
                      <article key={order.id} className="rounded-2xl border border-dark-100 p-4 shadow-sm">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-dark-900">Order #{order.orderNumber || String(order.id).slice(-6)}</p>
                            <p className="text-xs text-dark-500">
                              {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'Recent order'}
                            </p>
                          </div>
                          <span className="rounded-full border border-amber-200 bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-xs font-extrabold text-white shadow-md ring-2 ring-amber-200/60 capitalize">
                            {order.status || 'pending'}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-dark-700">
                          <span>{order.items?.length || 0} item(s)</span>
                          <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 font-semibold text-amber-800">
                            {formatPrice(order.pricing?.total ?? 0)}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dark-100 bg-dark-50 px-4 py-6 text-sm text-dark-600">
                    You have no orders yet. Start with the menu to see your first order here.
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
