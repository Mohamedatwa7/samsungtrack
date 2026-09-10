// iFold competition watch — shared constants and text filters used by the
// read API (/api/ifold). Data ingest runs in a separate private pipeline;
// this app only reads the resulting rows from Supabase.

export const IFOLD_ID_PREFIX = "ifold_"
// YouTube/news rows live under platform="twitter" — the sub-prefix keeps them
// distinguishable (and still matches the ifold_% predicate everywhere).
export const IFOLD_YT_PREFIX = `${IFOLD_ID_PREFIX}yt_`
export const IFOLD_NEWS_PREFIX = `${IFOLD_ID_PREFIX}news_`

export function stripIFoldPrefix(id: string): string {
  return id.startsWith(IFOLD_ID_PREFIX) ? id.slice(IFOLD_ID_PREFIX.length) : id
}

// GCC relevance — Arabic script is the strongest available proxy for the
// Arab/Gulf audience on global hashtag feeds; explicit Gulf geography terms
// catch the English-language GCC conversation.
const ARABIC_SCRIPT = /[؀-ۿ]/
const GCC_TERMS =
  /\buae\b|dubai|abu\s*dhabi|saudi|\bksa\b|riyadh|jeddah|kuwait|qatar|doha|bahrain|\boman\b|muscat|\bgulf\b|\bgcc\b|خليج|[اإ]مارات|دبي|[اأ]بو\s*ظبي|سعودي|الرياض|جد[هة]|كويت|قطر|الدوحة|بحرين|عمان|مسقط/i

export function isGccText(text: string | null | undefined): boolean {
  const t = text || ""
  return ARABIC_SCRIPT.test(t) || GCC_TERMS.test(t)
}
