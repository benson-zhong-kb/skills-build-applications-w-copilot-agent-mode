import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import CollectionState from './CollectionState.jsx'

function Leaderboard() {
  const [entries, setEntries] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    fetchCollection('leaderboard')
      .then((data) => mounted && setEntries(data.sort((left, right) => (left.rank ?? 999) - (right.rank ?? 999))))
      .catch((requestError) => mounted && setError(requestError.message))
    return () => { mounted = false }
  }, [])

  return (
    <section className="data-page">
      <div className="section-heading"><div><p className="eyebrow">Friendly competition</p><h1>Leaderboard</h1></div>{entries && <span className="section-count">{entries.length} athletes</span>}</div>
      <CollectionState error={error} items={entries} resource="leaderboard entries">
        <div className="ranking-list">{entries?.map((entry, index) => <div className="ranking-row" key={entry._id || `${entry.username}-${entry.teamName}`}><span className={`rank-badge rank-${index + 1}`}>{entry.rank ?? index + 1}</span><span className="ranking-person"><strong>{entry.username}</strong><small>{entry.teamName}</small></span><strong className="ranking-points">{entry.points} <small>pts</small></strong></div>)}</div>
      </CollectionState>
    </section>
  )
}

export default Leaderboard