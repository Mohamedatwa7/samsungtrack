# SamsungTrack — Samsung Sentiment Dashboard

Next.js dashboard for Samsung Gulf social sentiment: brand comments, campaign
trackers (Galaxy Unpacked, iFold competition watch), influencer roster, and
review analytics.

This repo contains the **dashboard application only**. Data collection runs in
a separate private pipeline that writes to Supabase; the app reads from
Supabase at runtime. The `data/` folder holds small truncated samples so the
static sections render during development — they are not the full dataset.

## Setup

```bash
pnpm install
pnpm dev
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (browser reads) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side reads/writes in API routes |
| `OPENAI_API_KEY` | LLM sentiment scoring + chat (`/api/analyze-sentiment`, `/api/chat`) |
| `CRON_SECRET` | Bearer token guarding cron-triggered routes |

`next build` needs at least placeholder values for the Supabase variables —
some API routes construct clients at module scope.
