function CollectionState({ children, error, items, resource }) {
  if (error) {
    return <div className="alert alert-danger" role="alert">{error}</div>
  }

  if (items === null) {
    return <div className="loading-state">Loading {resource}...</div>
  }

  if (items.length === 0) {
    return <div className="empty-state compact"><p>No {resource} found yet.</p></div>
  }

  return children
}

export default CollectionState