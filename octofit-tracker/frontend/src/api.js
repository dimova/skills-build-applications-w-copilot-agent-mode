import { useEffect, useState } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const configuredApiBaseUrl = import.meta.env.VITE_API_BASE_URL
const browserApiBaseUrl = typeof window !== 'undefined' && window.location.hostname.endsWith('-5173.app.github.dev')
  ? window.location.origin.replace('-5173.', '-8000.')
  : 'http://localhost:8000'

export const apiBaseUrl = configuredApiBaseUrl
  || (codespaceName ? `https://${codespaceName}-8000.app.github.dev` : browserApiBaseUrl)

export function apiUrl(resource) {
  return `${apiBaseUrl}/api/${resource}/`
}

export function extractCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  return ['data', 'items', 'results', 'docs', 'content'].find((key) => Array.isArray(payload[key]))
    ? payload[['data', 'items', 'results', 'docs', 'content'].find((key) => Array.isArray(payload[key]))]
    : []
}

export function useApiCollection(endpoint) {
  const [items, setItems] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    async function load() {
      setIsLoading(true); setError('')
      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        if (!response.ok) throw new Error(`The API returned ${response.status}.`)
        setItems(extractCollection(await response.json()))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') setError(requestError.message || 'Unable to load API data.')
      } finally {
        if (!controller.signal.aborted) setIsLoading(false)
      }
    }
    load()
    return () => controller.abort()
  }, [endpoint])

  return { items, error, isLoading }
}