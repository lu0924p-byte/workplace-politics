# 《職場政治學》網站操作規範

本檔案適用於此 Repository 的所有 Codex／自動化操作。除非網站主管另有明確指示，以下規則均為永久規則。

## 核心原則

1. 一律採取 Minimum Change（最小修改）原則，只做完成明確需求所必要的改動。
2. 修改一段文字時，只修改指定文字，不得順手改寫其他文案、格式、版型或程式。
3. 不得自行重構 HTML、CSS 或 JavaScript。
4. 不得自行新增、擴充或移除網站功能。
5. 不得修改 Google、OAuth、Apps Script、Google Sheet、Gmail 或相關帳號與權限設定。
6. 不得提交 API Key、Password、Access Token、Refresh Token、OAuth Client Secret、Service Account、Private Key、Cookie、Session 或其他 Secret。
7. 每次 Push 前必須逐項檢查 `git diff` 與 `git status`，確認只有主管核准的內容。
8. 禁止 force push，包括 `git push --force` 與 `git push --force-with-lease`。
9. 禁止自行 rewrite Git history，包括 rebase、amend 已發布 commit、filter-branch、filter-repo 或其他改寫歷史的操作。
10. 禁止自行刪除 production files；若需求可能造成正式網站檔案消失，必須先停止並請主管確認。
11. 修改完成不代表可以發布；「修改」與「正式發布」是兩個獨立動作。
12. 未收到主管明確的「確認內容無誤，請正式發布」指示時，只能修改、本機預覽與回報，不得 Push、Deploy 或變更 GitHub Pages 設定。
13. 執行正式發布前，必須再次掃描全部待發布檔案中的敏感資訊。
14. 發布後必須驗證正式網址與六個頁面：首頁、關於本書、專文推薦、作者介紹、量表、讀者回響。

## V1 功能邊界

- GitHub Pages 的發布來源固定為 `main` 分支的 `/docs`。
- `docs/` 只放公開網站執行需要的檔案，不放開發工具、測試檔、本機設定或 credential。
- `docs/assets/js/content-data.js` 中 `submission.enabled` 必須維持 `false`，`submission.endpoint` 必須維持空字串。
- 不得建立或填入 Apps Script endpoint，也不得建立任何新的資料收集機制。
- 不得修改量表題目、計分邏輯或結果判定，除非主管明確指定內容並另行核准。
- 純靜態 GitHub Pages 足以發布本網站，不得自行增加後端服務或不必要的 GitHub Actions。

## 修改與檢查流程

1. 修改前先確認主管指定的頁面、區塊與文字或圖片。
2. 只修改必要檔案，保留其他內容不變。
3. 本機預覽並檢查受影響頁面；涉及共用導覽或樣式時，檢查全部六頁。
4. 檢查內部連結、圖片、CSS、JavaScript、手機版與瀏覽器 console。
5. 回報修改內容與驗證結果，等待主管確認。
6. 只有收到明確正式發布指示後，才可進行 Push／Deploy。

## 正式發布前後

正式發布前必須：

- 再次執行敏感資訊掃描。
- 確認投稿仍顯示「即將開放」，且不會送出任何資料。
- 完整操作 20 題量表並確認能產生結果。
- 執行並檢查 `git diff` 與 `git status`。
- 禁止將 ZIP、暫存檔、測試檔、`preview-server.mjs`、`tools/` 或本機設定放入 `docs/`。

正式發布後必須：

- 開啟正式網址，逐頁檢查六個頁面。
- 再次確認導覽、圖片、樣式、外部連結、量表及投稿停用狀態。
- 若正式網站與本機預覽不一致，停止後續修改並先向主管回報。
