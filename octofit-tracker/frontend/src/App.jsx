import { NavLink, Outlet } from 'react-router-dom'
import octofitLogo from '../../../docs/octofitapp-small.png'
import './App.css'

const navigation = [
  ['users', 'Users'], ['teams', 'Teams'], ['activities', 'Activities'],
  ['leaderboard', 'Leaderboard'], ['workouts', 'Workouts'],
]

function App() {
  return <div className="app-shell">
    <header className="app-header">
      <div className="app-brand"><img src={octofitLogo} alt="Octofit" /><div><strong>Octofit</strong><span>Team fitness tracker</span></div></div>
      <span className="api-status"><i />API connected</span>
    </header>
    <div className="app-body">
      <nav className="sidebar" aria-label="Application navigation">
        <p>Workspace</p>
        {navigation.map(([path, label]) => <NavLink key={path} to={`/${path}`} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>{label}</NavLink>)}
      </nav>
      <main className="content-area"><Outlet /></main>
    </div>
  </div>
}

export default App