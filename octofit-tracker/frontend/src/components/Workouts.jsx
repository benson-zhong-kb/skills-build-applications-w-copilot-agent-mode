import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import CollectionState from './CollectionState.jsx'

function Workouts() {
  const [workouts, setWorkouts] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    fetchCollection('workouts')
      .then((data) => mounted && setWorkouts(data))
      .catch((requestError) => mounted && setError(requestError.message))
    return () => { mounted = false }
  }, [])

  return (
    <section className="data-page">
      <div className="section-heading"><div><p className="eyebrow">Suggested for you</p><h1>Workouts</h1></div>{workouts && <span className="section-count">{workouts.length} plans</span>}</div>
      <CollectionState error={error} items={workouts} resource="workouts">
        <div className="card-grid workout-grid">{workouts?.map((workout) => <article className="workout-card" key={workout._id || workout.title}><div className="workout-card-top"><span className="tag">{workout.difficulty}</span><span>{workout.durationMinutes} min</span></div><h3>{workout.title}</h3><p>{workout.focusArea}</p><footer>Best for <strong>{workout.recommendedForGoal}</strong></footer></article>)}</div>
      </CollectionState>
    </section>
  )
}

export default Workouts