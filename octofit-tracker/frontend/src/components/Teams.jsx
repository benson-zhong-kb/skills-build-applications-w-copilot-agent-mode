import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import CollectionState from './CollectionState.jsx'

function Teams() {
  const [teams, setTeams] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    fetchCollection('teams')
      .then((data) => mounted && setTeams(data))
      .catch((requestError) => mounted && setError(requestError.message))
    return () => { mounted = false }
  }, [])

  return (
    <section className="data-page">
      <div className="section-heading"><div><p className="eyebrow">Find your people</p><h1>Teams</h1></div>{teams && <span className="section-count">{teams.length} teams</span>}</div>
      <CollectionState error={error} items={teams} resource="teams">
        <div className="card-grid">{teams?.map((team) => <article className="info-card" key={team._id || team.name}><div className="card-symbol">{team.mascot?.slice(0, 1) || 'T'}</div><div><h3>{team.name}</h3><p>{team.city}</p></div><span className="card-stat">{team.memberCount}<small> members</small></span></article>)}</div>
      </CollectionState>
    </section>
  )
}

export default Teams