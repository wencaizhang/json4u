# 上游同步记录

## 2026-07-07 — 首次同步

**基 commit:** `fa7c2ea`（开始修改时上游的最新 commit）
**同步范围:** `fa7c2ea..upstream/main`

### 决策记录

| # | Commit | 内容 | 决策 |
|---|---|---|---|
| ① | `850704f` | feat(cn): add json4u.cn sunset banner | ❌ 跳过 |
| ② | `c2f997e` | fix: make footer copyright year dynamic | ❌ 跳过 |
| ③ | `111d9da` | fix: improve footer links for small screens | ❌ 跳过 |
| ④ | `3d3f679` | feat: load editor json from URL params | ✅ 采纳 `useRef` 写法 |

### 下次同步步骤

```bash
git fetch upstream
git tag --list 'upstream/*'                    # 查看上次同步的 tag
git log --oneline upstream/sync-20260707..upstream/main  # 列出新 commit
```

然后逐个审查，与 `UPSTREAM.md` 中的策略说明保持一致。

### 策略说明

- 上游中涉及已删除文件（`(home)/`、`Footer`、`Header`、`Pricing` 等）的 commit 直接跳过
- 涉及编辑器核心逻辑、jq、table、graph 等功能的 commit，需逐个审查 diff
- 采纳前检查是否已自行实现过类似功能
