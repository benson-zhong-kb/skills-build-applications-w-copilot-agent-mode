import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import logo from '../../../docs/octofitapp-small.png'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Overview', path: '/' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Teams', path: '/teams' },
  { label: 'Users', path: '/users' },
  { label: 'Workouts', path: '/workouts' },
]

function Overview() {
  return (
    <div className="overview-page">
      <section className="welcome-panel">
        <p className="eyebrow">Mergington High School / Fitness hub</p>
        <h1>Make every move count.</h1>
        <p className="welcome-copy">
          Track momentum, celebrate consistency, and keep the whole school moving together.
        </p>
        <NavLink className="primary-action" to="/activities">
          View activity feed
          <span aria-hidden="true">-&gt;</span>
        </NavLink>
      </section>

      <section className="overview-grid" aria-label="Tracker sections">
        {navigation.slice(1).map(({ label, path }, index) => (
          <NavLink className="overview-link" key={path} to={path}>
            <span className="overview-index">0{index + 1}</span>
            <span>
              <strong>{label}</strong>
              <small>Explore the {label.toLowerCase()} view</small>
            </span>
            <span className="overview-arrow" aria-hidden="true">-&gt;</span>
          </NavLink>
        ))}
      </section>
    </div>
  )
}

function NotFound() {
  return (
    <section className="empty-state">
      <p className="eyebrow">404</p>
      <h1>That view is not on the roster.</h1>
      <NavLink className="primary-action" to="/">Back to overview</NavLink>
    </section>
  )
}

function App() {
  const location = useLocation()
  const activePage = navigation.find((item) => item.path === location.pathname)?.label || 'OctoFit'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink className="brand" to="/" aria-label="OctoFit overview">
          <img src={logo} alt="" />
          <span>OctoFit<span className="brand-dot">.</span></span>
        </NavLink>
        <p className="sidebar-label">Workspace</p>
        <nav className="main-nav" aria-label="Main navigation">
          {navigation.map(({ label, path }) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={path === '/'}
              key={path}
              to={path}
            >
              <span className="nav-mark" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-footer">
          <span className="status-dot" aria-hidden="true" />
          <span>API connected</span>
        </div>
      </aside>

      <div className="content-shell">
        <header className="topbar">
          <div>
            <p className="topbar-kicker">OctoFit Tracker</p>
            <h2>{activePage}</h2>
          </div>
          <div className="profile-chip">
            <span className="profile-avatar">PC</span>
            <span><strong>Paul Octo</strong><small>PE department</small></span>
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route element={<Overview />} path="/" />
            <Route element={<Activities />} path="/activities" />
            <Route element={<Leaderboard />} path="/leaderboard" />
            <Route element={<Teams />} path="/teams" />
            <Route element={<Users />} path="/users" />
            <Route element={<Workouts />} path="/workouts" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App