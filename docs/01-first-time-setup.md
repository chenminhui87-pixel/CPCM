# Day 0 — First-Time Setup

5 min to ready-to-code state.

## Prerequisites

- Node 22+ (`node -v`)
- npm 10+ (`npm -v`)
- Git
- Claude Code CLI installed

## Steps

```bash
# 1. Clone
git clone https://github.com/chenminhui87-pixel/CPCM.git
cd CPCM

# 2. Install workspace deps
npm install

# 3. Open in Claude Code
claude
```

Then run these in the Claude Code session:

```text
/plugin marketplace add github:ajenchen/design-system
/plugin install design-system@qijenchen-ds
```

After plugin install, restart the Claude Code session so skills and hooks are loaded.

## Verify

- `cd apps/computer-management && npm run dev` opens a styled Vite app.
- `npm run storybook` shows the CPCM `Prototype (PC)` story with DS components styled correctly.
- Claude `/` shows DS skills such as `/design-system-audit`, `/component-quality-gate`, `/visual-audit`, and `/prototype`.

## Next

Run `npm run setup:netlify` to connect the Storybook deploy, then see `docs/03-co-edit-workflow.md`.
