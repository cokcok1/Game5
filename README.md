# 生字偵探 · Word Detective v1.0

可以直接部署到 GitHub Pages 的英文找物件遊戲。100 個場景、1,000 個不同英文名稱，每個場景 10 件物件；每關可選 5 件或全 10 件。介面與中文解釋使用繁體中文。

## 上載到 GitHub Pages

1. 解壓 ZIP。不要直接把 ZIP 上載成網站。
2. 在 GitHub 建立一個公開 repository，例如 `word-detective`。
3. 打開 repository，選 **Add file → Upload files**。
4. 將解壓後的 `index.html`、`assets` 資料夾、`sw.js`、README 等全部內容放到 repository 的最外層，再 Commit changes。不要再套一層資料夾：repository 第一層應直接看見 `index.html`。
5. 前往 **Settings → Pages**。
6. 在 **Source** 選 **Deploy from a branch**；Branch 選 **main**；Folder 選 **/(root)**；按 **Save**。
7. 等 GitHub 顯示網站網址後開啟。網址通常是 `https://你的用戶名.github.io/word-detective/`。

若 repository 名稱不同，網址最後一段也會不同。無需 npm、Node、編譯、API Key 或後端。

官方說明（核對於 2026-10-12）：
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## 本機試玩

解壓後直接打開 `index.html` 即可試玩，資料透過本地 JS 檔載入，不使用 fetch 讀取題庫。部分瀏覽器對 `file://` 的儲存功能有限；若不能記錄進度，可先用設定的匯出功能備份。部署到 GitHub Pages 後使用標準 HTTPS。

## 遊戲功能

- 100 個可選場景，10 個主題，每場景 10 個物件名稱。
- 小學探索、高小進階、中學挑戰：場景參考難度，不是正式年級課程對照。
- 每關抽 5 件，或全 10 件；優先出未找到過的字，再考慮提示／試錯較多的字。
- 點對 +1 分及閃星效果；點錯不扣分；已找到的物件不能重複計分。
- 中文提示、位置閃光、英文發音、中文標籤學習模式。
- 星級：零試錯及零提示為 3 星；試錯不多於 3 次為 2 星；其餘為 1 星。
- 生字簿查詢全部 1,000 字、已找到的字及需要重溫的字。
- 瀏覽器儲存分數與進度，可匯出／匯入 JSON 備份。
- 手機可左右滑動放大的場景；「全景」可縮小查看整個場景。
- 支援鍵盤 Tab、Enter／空格選擇物件；跟隨裝置減少動畫偏好。
- Service Worker：HTTPS 首次成功載入及快取後，可在離線狀態開啟已快取的程式。發音是否離線可用，取決於裝置英文語音包。

## 插畫與內容

這是完整可玩的**簡化向量圖解版**。100 場景按主題使用不同背景、配色與佈置；圖示由共享 SVG 元件組合，並非 100 張獨立手繪寫實場景。所有 1,000 個詞條均有圖示與點擊區域。部分專門器材是概括示意圖，可能無法只憑外觀準確辨識，建議先開中文標籤學習，再關閉標籤挑戰。

數量包含單字及固定詞組，例如 `torque wrench`，並非 1,000 個單一字根。已檢查英文名稱沒有完全相同的重複項；相關器材仍可能共用相近外形。部分用語採用英式拼寫。

生字簿包含找物件提示句；常見專門詞有額外使用例句。尚未逐一撰寫 1,000 條獨立情境例句。

學習記錄儲存在目前瀏覽器的 localStorage，不能自動跨裝置同步。清除瀏覽器資料或更換網站來源會影響記錄，請先匯出備份。

## 檔案

- `index.html`：遊戲介面
- `assets/style.css`：桌面及手機樣式
- `assets/data.js`：100 場景、1,000 生字資料
- `assets/art.js`：每個物件的 SVG 圖示
- `assets/art-manifest.json`：生字與圖示元件對照
- `assets/scenes.js`：場景背景及物件位置
- `assets/core.js`：出題、計分、提示及進度驗證
- `assets/app.js`：介面操作、發音、記錄及備份
- `assets/icon.svg`：網站圖示
- `sw.js`：離線快取
- `.nojekyll`：靜態網站標記
- `tests/verify.cjs`、`tests/ui-wiring.cjs`：開發驗證，不是遊戲運行所需

## 更新與修改

修改檔案後再次上載並 Commit。更新任何運行檔案時，請同時改 `sw.js` 的 CACHE 版本，例如由 `v1.0.0` 改為 `v1.0.1`，讓離線快取更新。

修改 `assets/data.js` 需保留 100 場景 ID／1,000 個生字 ID 的對應。改英文名稱時，也請確認 `assets/art.js` 的物件圖示仍相符。改物件位置時，保留彼此間足夠距離，避免點擊區域重疊。

## 已完成驗證

- 100 場景、每場景 10 字、總共 1,000 不重複英文名稱。
- 1,000 物件圖示綁定與所有 SVG XML 有效。
- 100 場景各跑 5 件及 10 件，共 200 次完整回合。
- 正確／錯誤回答、提示、重複點擊、完成判定、重玩覆蓋全部 10 字。
- 物件點擊範圍無重疊、無超出場景。
- 備份資料清理、靜態檔案路徑、JS 語法。
- DOM 模擬驗證選關、五次點擊、過關視窗、重玩、生字簿、儲存事件。
- 渲染並檢視 12 個代表場景。

此版本尚未在真實 iPhone Safari／桌面瀏覽器做端到端測試，也未替你實際部署到 GitHub。離線快取與瀏覽器發音亦需部署後在實際裝置確認。

開發檢查（如果有 Node）：

```sh
node tests/verify.cjs
node tests/ui-wiring.cjs
```

## 授權

遊戲程式及向量元件採 MIT 授權，可修改及放上 GitHub。詳見 LICENSE。
