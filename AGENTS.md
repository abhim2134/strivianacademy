<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Adding a free skill
1. Put the skill folder in `content/skills/<id>/` and add an entry to `SKILLS` in `lib/skills.ts` (`zip` = `<id>.zip`, `prompt` = what to say to Claude once it's installed).
2. The install steps in the email (`app/api/unlock/route.ts`) and the unlock popup (`components/UnlockModal.tsx`) come from `installPrompt(skill)`: download the zip, then paste "Install the Claude skill <zip> from my Downloads folder, then <prompt>" into Claude Code (no path, so it works on Mac, Windows and Linux). Don't write per-skill install steps there.
3. The skill's own `README.md` starts its Install section with that same one-line paste (manual copy into `~/.claude/skills/` as the fallback).
4. `npm run zip-skills`, `npm run build`, then push to main (Vercel deploys on push; ask first).
