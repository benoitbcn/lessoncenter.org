
# LessonCenter.org — Cloudflare Pages + Functions

No framework, no build step: static pages in `/public` and dynamic API in `/functions`.

## Deploy (Cloudflare Pages)
- **Build command:** (leave empty)
- **Build output directory:** `public`
- **Functions directory:** `functions` (auto-detected)
- (Optional) KV binding for subscriptions:
  - Add KV namespace (e.g. `lessoncenter-subs`) and bind as **SUBS**.

## Endpoints
- `/api/health` — JSON heartbeat
- `/api/posts` — demo feed used by **Resources** page
- `/api/subscribe` — POST `{ "email": "you@example.com" }` or form-data; stores to KV if bound

Edit `functions/api/posts.js` to connect real content later.
