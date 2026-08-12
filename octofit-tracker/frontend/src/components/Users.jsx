import { useApiCollection } from '../api.js'

function Users() {
  const { items, error, isLoading } = useApiCollection('users')
  return <section><header className="page-heading"><div><p>Community</p><h1>Users</h1><span>Member profiles and current challenge points.</span></div><b>{items.length} members</b></header>
    <div className="data-panel table-responsive">{isLoading ? <Message>Loading users...</Message> : error ? <Message error={error} /> : <table className="table align-middle mb-0"><thead><tr><th>Member</th><th>Email</th><th className="text-end">Points</th></tr></thead><tbody>{items.map((user) => <tr key={user._id || user.id}><td><i className="avatar">{user.name?.[0] || '?'}</i>{user.name}</td><td>{user.email}</td><td className="text-end fw-semibold">{user.points?.toLocaleString() || 0}</td></tr>)}</tbody></table>}</div>
  </section>
}
export function Message({ children, error }) { return <p className={`panel-message${error ? ' error' : ''}`}>{error || children}</p> }
export default Users