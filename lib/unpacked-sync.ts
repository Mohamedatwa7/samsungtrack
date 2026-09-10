// Galaxy Unpacked campaign tracker — shared constants and filters used by the
// read API (/api/unpacked). Data ingest runs in a separate private pipeline;
// this app only reads the resulting rows from Supabase.

export const CAMPAIGN_END = new Date("2026-08-01T00:00:00+04:00")

// Teaser campaign started mid-July — the #samsunggulf feed also surfaces the
// brand's older collabs (S25/S26 era) which match the markers but are not
// this campaign.
export const CAMPAIGN_START = new Date("2026-07-10T00:00:00+04:00")

export function isInCampaignWindow(publishedAt: string | Date | null | undefined): boolean {
  if (!publishedAt) return false
  const t = new Date(publishedAt).getTime()
  return !isNaN(t) && t >= CAMPAIGN_START.getTime()
}

export function campaignEnded(now = new Date()): boolean {
  return now.getTime() >= CAMPAIGN_END.getTime()
}

export const UNPACKED_ID_PREFIX = "unpacked_"

export function stripUnpackedPrefix(id: string): string {
  return id.startsWith(UNPACKED_ID_PREFIX) ? id.slice(UNPACKED_ID_PREFIX.length) : id
}

// Creators excluded from the campaign tracker by request (removed 2026-07-20:
// agency/aggregator accounts and creators outside the teaser roster). Their
// posts are filtered in /api/unpacked so they stay gone even if an old row
// lingers in the database.
export const EXCLUDED_CREATORS = new Set([
  "aesectorsignals",
  "uniquetalents.me",
  "abodelrahman_mohamed",
  "joycegchamoun",
  "farhaahmd",
  "yazxan",
  "basharkk",
])

export function isExcludedCreator(username: string | null | undefined): boolean {
  return EXCLUDED_CREATORS.has((username || "").toLowerCase().trim().replace(/^@/, ""))
}
