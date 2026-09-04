export const manifest = {
  id: 'torrentio',
  name: 'Torrentio',
  version: '1.1.0',
  hosts: ['torrentio.strem.fun'],
  updateUrl: 'https://github.com/DOG248/torrentioss',
}

// Torrentio speaks the Stremio stream protocol, and so does ss: the addon's
// answer is handed back untouched, and the parsing of release names, sizes
// and language flags happens on the other side, where it is tested.
//
// `api.fetch` is the only way out of the worker this runs in. It is a message
// to the page, which performs the request only against the hosts declared
// above — so adding a host here is a permission the person installing this
// plugin has to approve.
export async function streams(target, api) {
  // Torrentio only knows IMDb ids. The ss catalog now runs on TMDB, and hands
  // over the IMDb id when it has one; anything else has no answer here.
  const imdbId = typeof target.imdbId === 'string' ? target.imdbId : target.id
  if (!/^tt\d+$/.test(imdbId)) throw new Error(`torrentio needs an IMDb id, got ${target.id}`)
  const id = target.season != null && target.episode != null
    ? `${imdbId}:${target.season}:${target.episode}`
    : imdbId
  const response = await api.fetch(
    `https://torrentio.strem.fun/stream/${target.type}/${encodeURIComponent(id)}.json`,
  )
  if (!response.ok) throw new Error(`torrentio answered ${response.status}`)
  const body = await response.json()
  return Array.isArray(body.streams) ? body.streams : []
}
