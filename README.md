# CPCM — Computer Management

> Product app consuming [`@qijenchen/design-system`](https://github.com/ajenchen/design-system)。
>
> 單一 product app repo:`apps/computer-management/`。Storybook 展示真實 product UI,經 Netlify 部署。

## Status

- 單一 app:`apps/computer-management/`(CPCM)。
- 原多-app scaffolding(`npm run create-app` / `apps/template/`)已移除 — 本 repo 專注 CPCM 一個 app。
- 元件庫:`@qijenchen/design-system`(升版經 Dependabot / `npm update`)。

## Onboarding

### Step 1 — clone + install

```bash
git clone https://github.com/chenminhui87-pixel/CPCM.git
cd CPCM
npm install   # 拉 DS deps + DS canonical 隨 npm 落地；postinstall 印 plugin 提示
```

### Step 2 — Claude Code:plugin install(本地 / 桌面 session)

```
/plugin marketplace add github:ajenchen/design-system
/plugin install design-system@qijenchen-ds
```

裝完 **restart session**。你會拿到 22+ skills、59 hooks、31 M-rules 的 DS 治理。

> **遠端(claude.ai/code web)session 注意**:web session 無法互動安裝 plugin(需 `/plugin` 指令 + restart)。本 repo 已在 `.claude/settings.json` 啟用 hook 自帶的官方 escape `CLAUDE_BYPASS_PLUGIN_BOOTSTRAP=1`,讓遠端也能編輯 `apps/**`。此時治理改由:npm install 落地的 ds-canonical 規則 + 只用 DS 元件不自寫 mock + CI `audit.yml` 把關。

### Step 3 — Setup Netlify(自動 site + 手動 password)

```bash
npm run setup:netlify   # CLI install + GitHub OAuth login + site 建 + 連 repo
                        # 最後印 dashboard URL + 教你 30 秒設 Basic Password
```

### Step 4 — 本地 verify + 部署

```bash
npm run storybook       # 本地確認 DS 元件視覺正確
git push origin main    # Netlify auto build storybook + per-branch preview
```

## Layout

```
CPCM/
├── apps/
│   └── computer-management/    ← CPCM product app (Vite + React)
│       ├── src/
│       │   ├── main.tsx        ← React root + TooltipProvider
│       │   ├── App.tsx         ← product UI (import DS 元件)
│       │   ├── App.stories.tsx ← Storybook: Prototype (PC)
│       │   ├── AllDsComponents.stories.tsx ← DS canonical proxy portal
│       │   └── globals.css     ← @import tailwindcss + DS tokens
│       ├── index.html
│       ├── package.json
│       ├── tsconfig.json
│       └── vite.config.ts
├── scripts/
│   ├── lint-ds-internal-imports.mjs  ← Guard against importing DS internals
│   ├── setup-netlify-access.mjs      ← npm run setup:netlify
│   ├── deploy-url.mjs                ← npm run deploy-url
│   └── sync-all.mjs                  ← npm run sync-all
├── .claude/
│   ├── settings.json           ← Claude Code config (plugin flow + remote escape)
│   └── hooks/                  ← fork-committed bootstrap hooks
├── .storybook/                 ← Storybook config (imports @qijenchen/storybook-config)
├── .github/workflows/
│   ├── audit.yml               ← tsc + lint:imports + build per push/PR
│   └── sync-design-system.yml  ← Dependabot + DS 版本同步(repository_dispatch)
├── netlify.toml                ← Netlify Git integration (build + access headers)
├── package.json                ← workspaces + DS deps
└── README.md                   ← You are here
```

## Consumer rules(read DS CLAUDE.md via plugin / `node_modules/@qijenchen/design-system/`)

- **Never modify** `node_modules/@qijenchen/design-system/` — 有需求 file PR 回 DS repo。
- Import public surface only:`@qijenchen/design-system` top barrel。**禁** import `/src/...` 或 `/dist/...` internals。
- Run `npm run lint:imports` before commit to catch internal-path leaks。
- App-level CSS 只 extend / override,不重寫 DS tokens(`--color-*` / `--space-*`)。
- App.tsx 起點走 AppShell + Sidebar,不從孤立 Button 開始。

## Keep DS deps 最新

```bash
npm run sync-all              # update npm deps + plugin marketplace + plugin install
# 或單獨: npm update @qijenchen/design-system @qijenchen/storybook-config
```

DS repo push main 時,`sync-design-system.yml`(Dependabot + `repository_dispatch`)會自動 bump deps + commit。

## Storybook deploy(無需 GitHub secret)

**Step 1 — Connect Netlify**:
1. Netlify Dashboard → **Add new project** → 連本 repo
2. Netlify 自動讀根目錄 `netlify.toml` → build `storybook-static` → deploy
3. 每次 push main → Netlify auto rebuild。Per-branch preview 自動啟用。

**Step 2 — 🔒 設 Basic Password Protection**(free-tier 唯一可用 access control):

`npm run setup:netlify` 跑完會印 dashboard 連結 + password 設定指引。跟著做:
1. 打開 `https://app.netlify.com/projects/<your-site>/configuration/visitor-access`
2. **Password Protection** → 選「**Basic protection**」→ 輸 password → **Save**
3. 把 site URL + password 私訊給 stakeholder

**為何只用 Basic Password?**
- ❌ **Identity** = 2024 起 Netlify deprecated,新帳號看不到 menu
- ❌ **Team protection** = 要 Pro plan $19/mo
- ✅ **Basic Password** = free-tier 唯一真擋陌生人的方法

**Defense-in-depth**(`netlify.toml` 已 ship):X-Robots-Tag noindex + Referrer strict-origin + X-Frame SAMEORIGIN — SEO 層加固;**真實擋人**靠 Basic Password。

## Workflow 機制總覽

deploy 不走 GitHub Actions,只有 2 個 workflow:

| 機制 | 觸發 | 做什麼 |
|---|---|---|
| `audit.yml` | push / PR | tsc + `lint:imports` + build CI gate |
| `sync-design-system.yml` | Dependabot daily + `repository_dispatch` | `npm update @qijenchen/*` + commit + push |
| `netlify.toml`(Netlify Git integration)| push main / per-branch | build `storybook-static` → deploy(無需 secret)|

完整 step-by-step 詳 `docs/01-first-time-setup.md`。

## License

UNLICENSED — internal use only.
