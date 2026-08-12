import { apiBaseUrl, useApiCollection } from '../api.js'
import { Message } from './Users.jsx'

const activitiesApiUrl = import.meta.env.VITE_CODESPACE_NAME
	? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
	: `${apiBaseUrl}/api/activities/`

function Activities() { const { items, error, isLoading } = useApiCollection(activitiesApiUrl); return <section><header className="page-heading"><div><p>Training log</p><h1>Activities</h1><span>Recent movement across the Octofit community.</span></div><b>{items.length} logged</b></header><div className="data-panel table-responsive">{isLoading ? <Message>Loading activities...</Message> : error ? <Message error={error} /> : <table className="table align-middle mb-0"><thead><tr><th>Activity</th><th>Completed</th><th className="text-end">Duration</th><th className="text-end">Calories</th></tr></thead><tbody>{items.map((item) => <tr key={item._id || item.id}><td className="fw-semibold">{item.type}</td><td>{item.completedAt ? new Date(item.completedAt).toLocaleDateString() : '—'}</td><td className="text-end">{item.durationMinutes} min</td><td className="text-end">{item.caloriesBurned || 0}</td></tr>)}</tbody></table>}</div></section> }
export default Activities