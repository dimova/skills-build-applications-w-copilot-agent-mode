import { apiBaseUrl, useApiCollection } from '../api.js'
import { Message } from './Users.jsx'

const workoutsApiUrl = `${apiBaseUrl}/api/workouts/`

function Workouts() { const { items, error, isLoading } = useApiCollection(workoutsApiUrl); return <section><header className="page-heading"><div><p>Suggested sessions</p><h1>Workouts</h1><span>Practical sessions for your next training block.</span></div><b>{items.length} plans</b></header><div className="row g-3">{isLoading ? <Message>Loading workouts...</Message> : error ? <Message error={error} /> : items.map((workout) => <div className="col-lg-4" key={workout._id || workout.id}><article className="data-card"><small>{workout.category} · {workout.durationMinutes} min</small><h2>{workout.title}</h2><p>{workout.description || 'A focused session for your fitness goals.'}</p><mark className={workout.difficulty || 'beginner'}>{workout.difficulty || 'beginner'}</mark></article></div>)}</div></section> }
export default Workouts