import type { StorybookConfig } from '@storybook/react-vite'
import preset from '@qijenchen/storybook-config/preset'

const config: StorybookConfig = {
  ...preset,
  // 2026-05-29 Phase 2 monorepo 2-scenario arch:
  // Published template repo(Scenario B fork user)沒 DS source,storybook 只 glob `apps/**`。
  // 砍掉舊 `../packages/**` glob(per codex r5 Gap 4)— published mirror 不該含 DS internal stories。
  // 2026-06-03 排除 apps/template/ — template 是 create-app scaffold 來源,
  // 不該 ship 到 Netlify(per CLAUDE.md「Storybook = 真實 product UI demo」,
  // template AppShell Dashboard 範例不是 product scenario)。
  // 用 extglob `!(template)` 排除(陣列 `!` 負樣式在 Storybook story indexer 不 work)
  stories: ['../apps/!(template)/**/*.stories.@(tsx|mdx)'],

  // 2026-05-26 fix(per user 「為何都沒吃到正確元件和設計原則」screenshot):
  // 必須在 Storybook 的 vite build 套 tailwindcss plugin,DS 的 utility classes 才會生效。
  // 之前 .storybook 沒 viteFinal → tailwind 沒跑 → DS 元件看起來像 unstyled HTML。
  // 對齊 DS repo root vite.config.ts pattern(plugins: [react(), tailwindcss()])。
  viteFinal: async (vite) => {
    const tailwindcss = (await import('@tailwindcss/vite')).default
    vite.plugins = vite.plugins || []
    vite.plugins.push(tailwindcss())
    return vite
  },
}

export default config
