import { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout, updateProfile, changePassword } = useAuth()
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

  if (!user) return null

  const avatarInitial = user.name?.charAt(0).toUpperCase() || '?'

  return (
    <section className="min-h-[calc(100vh-5rem)] bg-dark-50 px-4 py-12">
      <div className="container-max max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          <div className="mb-6 flex flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-r from-accent-500 to-accent-600 p-6 text-white shadow-lift">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/60 bg-white/20 text-2xl font-bold">
              {avatarInitial}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm text-white/90">{user.email}</p>
              <span className="mt-1 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-semibold capitalize">{user.role}</span>
            </div>
            <button type="button" className="ml-auto rounded-lg border border-white/60 px-4 py-2 text-sm font-semibold hover:bg-white/10" onClick={handleLogout}>
              Sign Out
            </button>
          </div>

          <div className="rounded-2xl border border-dark-100 bg-white p-6 shadow-soft">
            <div className="mb-6 flex gap-2 border-b border-dark-200 pb-3">
              <button type="button" onClick={() => setActiveTab('profile')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${activeTab === 'profile' ? 'bg-accent-500 text-white' : 'bg-dark-100 text-dark-700 hover:bg-dark-200'}`}>
                Profile Info
              </button>
              <button type="button" onClick={() => setActiveTab('security')} className={`rounded-lg px-4 py-2 text-sm font-semibold ${activeTab === 'security' ? 'bg-accent-500 text-white' : 'bg-dark-100 text-dark-700 hover:bg-dark-200'}`}>
                Security
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
                  <input id="name" name="name" value={profileData.name} onChange={handleProfileChange} className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold text-dark-800">Email</label>
                  <input id="email" type="email" value={user.email} disabled className="w-full rounded-lg border-2 border-dark-200 bg-dark-100 px-4 py-3 text-dark-500" />
                  <p className="mt-1 text-xs text-dark-500">Email cannot be changed.</p>
                </div>

                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-dark-800">Phone Number</label>
                  <input id="phone" type="tel" name="phone" value={profileData.phone} onChange={handleProfileChange} placeholder="+234 000 000 0000" className="w-full rounded-lg border-2 border-dark-200 px-4 py-3 focus:border-accent-500 focus:ring-2 focus:ring-accent-100" />
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
          </div>
        </motion.div>
      </div>
    </section>
  )
}
