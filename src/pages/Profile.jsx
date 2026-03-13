import { useState } from 'react'
import { Container, Form, Button, Alert, Spinner, Tab, Nav, Badge } from 'react-bootstrap'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import './Auth.css'

export default function Profile() {
  const { user, logout, updateProfile, changePassword } = useAuth()
  const navigate = useNavigate()

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
    <div className="profile-page">
      <Container className="profile-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">{avatarInitial}</div>
            <div>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-email">{user.email}</p>
              <Badge bg={user.role === 'admin' ? 'danger' : 'success'} className="text-capitalize">
                {user.role}
              </Badge>
            </div>
            <button className="btn btn-outline-danger ms-auto profile-logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <Tab.Container defaultActiveKey="profile">
            <Nav variant="tabs" className="profile-tabs">
              <Nav.Item>
                <Nav.Link eventKey="profile">Profile Info</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="security">Security</Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content className="profile-tab-content">
              {/* Profile Info Tab */}
              <Tab.Pane eventKey="profile">
                {profileMsg && (
                  <Alert variant={profileMsg.type} dismissible onClose={() => setProfileMsg(null)}>
                    {profileMsg.text}
                  </Alert>
                )}
                <Form onSubmit={handleProfileSave}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className="auth-input"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={user.email} disabled className="auth-input" />
                    <Form.Text className="text-muted">Email cannot be changed.</Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileChange}
                      placeholder="+234 000 000 0000"
                      className="auth-input"
                    />
                  </Form.Group>
                  <Button type="submit" className="auth-btn" disabled={savingProfile}>
                    {savingProfile ? <><Spinner size="sm" className="me-2" />Saving...</> : 'Save Changes'}
                  </Button>
                </Form>
              </Tab.Pane>

              {/* Security Tab */}
              <Tab.Pane eventKey="security">
                {pwMsg && (
                  <Alert variant={pwMsg.type} dismissible onClose={() => setPwMsg(null)}>
                    {pwMsg.text}
                  </Alert>
                )}
                <Form onSubmit={handlePwSave}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <div className="password-wrapper">
                      <Form.Control
                        type={showCurrent ? 'text' : 'password'}
                        name="currentPassword"
                        value={pwData.currentPassword}
                        onChange={handlePwChange}
                        className="auth-input"
                        autoComplete="current-password"
                      />
                      <button type="button" className="password-toggle" onClick={() => setShowCurrent((v) => !v)}>
                        {showCurrent ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <div className="password-wrapper">
                      <Form.Control
                        type={showNew ? 'text' : 'password'}
                        name="newPassword"
                        value={pwData.newPassword}
                        onChange={handlePwChange}
                        className="auth-input"
                        placeholder="Min. 6 characters"
                        autoComplete="new-password"
                      />
                      <button type="button" className="password-toggle" onClick={() => setShowNew((v) => !v)}>
                        {showNew ? '🙈' : '👁️'}
                      </button>
                    </div>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmNew"
                      value={pwData.confirmNew}
                      onChange={handlePwChange}
                      className="auth-input"
                      placeholder="Repeat new password"
                      autoComplete="new-password"
                    />
                    {pwData.confirmNew && pwData.newPassword !== pwData.confirmNew && (
                      <small className="text-danger">Passwords do not match</small>
                    )}
                  </Form.Group>
                  <Button type="submit" className="auth-btn" disabled={savingPw}>
                    {savingPw ? <><Spinner size="sm" className="me-2" />Updating...</> : 'Update Password'}
                  </Button>
                </Form>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </motion.div>
      </Container>
    </div>
  )
}
