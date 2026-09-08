import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import CollectionState from './CollectionState.jsx'

function Users() {
  const [users, setUsers] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    fetchCollection('users')
      .then((data) => mounted && setUsers(data))
      .catch((requestError) => mounted && setError(requestError.message))
    return () => { mounted = false }
  }, [])

  return (
    <section className="data-page">
      <div className="section-heading"><div><p className="eyebrow">The OctoFit community</p><h1>Users</h1></div>{users && <span className="section-count">{users.length} profiles</span>}</div>
      <CollectionState error={error} items={users} resource="users">
        <div className="table-wrap"><table className="data-table"><thead><tr><th>Profile</th><th>Username</th><th>Goal</th><th>Joined</th></tr></thead><tbody>
          {users?.map((user) => <tr key={user._id || user.username}><td><strong>{user.displayName}</strong><small className="table-subtext">{user.email}</small></td><td>@{user.username}</td><td><span className="tag">{user.fitnessGoal}</span></td><td>{user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : '—'}</td></tr>)}
        </tbody></table></div>
      </CollectionState>
    </section>
  )
}

export default Users