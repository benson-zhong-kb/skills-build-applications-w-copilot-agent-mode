import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import CollectionState from './CollectionState.jsx'

function formatDate(value) {
  return value ? new Date(value).toLocaleDateString() : '—'
}

function Activities() {
  const [activities, setActivities] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    fetchCollection('activities')
      .then((data) => mounted && setActivities(data))
      .catch((requestError) => mounted && setError(requestError.message))
    return () => { mounted = false }
  }, [])

  return (
    <section className="data-page">
      <div className="section-heading">
        <div><p className="eyebrow">Movement log</p><h1>Activities</h1></div>
        {activities && <span className="section-count">{activities.length} logged</span>}
      </div>
      <CollectionState error={error} items={activities} resource="activities">
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Student</th><th>Activity</th><th>Duration</th><th>Calories</th><th>Date</th></tr></thead><tbody>
          {activities?.map((activity) => <tr key={activity._id || `${activity.username}-${activity.activityDate}`}><td><strong>{activity.username}</strong></td><td>{activity.activityType}</td><td>{activity.durationMinutes} min</td><td>{activity.caloriesBurned} kcal</td><td>{formatDate(activity.activityDate)}</td></tr>)}
        </tbody></table></div>
      </CollectionState>
    </section>
  )
}

export default Activities