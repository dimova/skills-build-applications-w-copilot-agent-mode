import { apiBaseUrl, useApiCollection } from '../api.js'
import { Message } from './Users.jsx'

const teamsApiUrl = `${apiBaseUrl}/api/teams/`

function Teams() { const { items, error, isLoading } = useApiCollection(teamsApiUrl); return <section><header className="page-heading"><div><p>Community</p><h1>Teams</h1><span>Groups working toward shared training goals.</span></div><b>{items.length} teams</b></header><div className="row g-3">{isLoading ? <Message>Loading teams...</Message> : error ? <Message error={error} /> : items.map((team) => <div className="col-md-6" key={team._id || team.id}><article className="data-card"><small>{team.memberIds?.length || 0} members</small><h2>{team.name}</h2><p>{team.description || 'No team description yet.'}</p></article></div>)}</div></section> }
export default Teams