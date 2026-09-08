const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const browserHost = typeof window !== 'undefined' ? window.location.hostname : ''
const forwardedCodespaceHost = browserHost.endsWith('-5173.app.github.dev')
  ? browserHost.replace(/-5173\.app\.github\.dev$/, '-8000.app.github.dev')
  : ''
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : forwardedCodespaceHost
    ? `https://${forwardedCodespaceHost}`
    : 'http://localhost:8000'

export const API_BASE_URL = `${apiOrigin}/api`

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.results)) return payload.results
  if (Array.isArray(payload?.data?.results)) return payload.data.results
  return []
}

export async function fetchCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)
  if (!response.ok) {
    throw new Error(`Unable to load ${resource} (${response.status})`)
  }
  return normalizeCollection(await response.json())
}