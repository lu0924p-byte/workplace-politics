# 《職場政治學》官方網站

本 Repository 保存《職場政治學》第一版官方網站。網站為純 HTML、CSS、JavaScript 的靜態網站，不需要後端服務或資料庫。

## Repository 結構

```text
workplace-politics/
├─ AGENTS.md
├─ README.md
├─ .gitignore
└─ docs/
   ├─ .nojekyll
   ├─ index.html
   ├─ about.html
   ├─ recommendations.html
   ├─ author.html
   ├─ quiz.html
   ├─ readers.html
   └─ assets/
```

`docs/` 是唯一發布至 GitHub Pages 的目錄，只包含網站執行所需檔案。

## 六個頁面

- `docs/index.html`：首頁
- `docs/about.html`：關於本書
- `docs/recommendations.html`：專文推薦
- `docs/author.html`：作者介紹
- `docs/quiz.html`：20 題量表
- `docs/readers.html`：讀者回響

## V1 功能邊界

- 不使用後端服務、Google Sheet、Apps Script 或 Gmail。
- `docs/assets/js/content-data.js` 的投稿設定必須維持 `enabled: false` 與 `endpoint: ""`。
- V1 不傳送或儲存讀者投稿資料。
- 不得自行更改量表題目、計分邏輯或結果判定。

## 修改與發布

網站修改、預覽、確認與正式發布是四個獨立階段。未收到主管明確的正式發布指示前，不得 Push、Deploy 或調整 GitHub Pages。

詳細操作原則請閱讀 `AGENTS.md`。

## GitHub Pages 設定

- Repository：`workplace-politics`
- Branch：`main`
- Publishing source：`/docs`
- Source：Deploy from a branch
- 不使用額外 GitHub Actions
