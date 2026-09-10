// Influencer roster — shared constants and helpers used by the read API
// (/api/roster). Data ingest runs in a separate private pipeline; this app
// only reads the resulting rows from Supabase.

export function youtubeVideoId(url: string): string | null {
  const m = String(url || "").match(/(?:v=|youtu\.be\/|\/shorts\/|\/embed\/)([A-Za-z0-9_-]{6,})/)
  return m ? m[1] : null
}

export const ROSTER_ID_PREFIX = "roster_"

// Historical F7-launch posts by the same roster (July 2025) — kept separate
// from the current FF8 videos so they feed the launch-comparison pie without
// appearing in the FF8 roster cards.
export const F7_ROSTER_PREFIX = `${ROSTER_ID_PREFIX}f7_`

export function stripRosterPrefix(id: string): string {
  return id.startsWith(ROSTER_ID_PREFIX) ? id.slice(ROSTER_ID_PREFIX.length) : id
}
