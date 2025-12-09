# Project: LoveTravel_PWA_Handbook

## Description
這是一個基於 GitHub Pages 的單頁應用 (SPA) 旅遊手冊。
核心功能包含 PWA 離線瀏覽、背景音樂播放、Markdown 內容渲染，
以及基於密碼的「管理者(領隊)/使用者(遊客)」視圖切換功能。
目標場景為網路不穩的旅遊途中，透過藍芽喇叭播放音樂並查看行程。

## Tech Stack
- **Frontend**: HTML5, CSS3 (Tailwind CSS CDN), Vanilla JavaScript
- **Content Source**: Markdown (parsed via marked.js)
- **Offline Capability**: Service Worker (Cache API)
- **Hosting**: GitHub Pages

## User Stories
- **遊客**: 打開網頁時背景會自動快取音樂與圖片，以備離線使用。只能看到公開的行程資訊，看不到驚喜安排。
- **領隊**: 輸入密碼後可解鎖「隱藏區塊 (Surprise Blocks)」並控制音樂播放。透過手機藍芽連接喇叭播放氛圍音樂。

## File Structure
- `index.html`: 主應用程式入口
- `styles.css`: 全站樣式與隱藏邏輯
- `script.js`: 核心邏輯 (Markdown parser, Auth, View Toggle)
- `sw.js`: Service Worker (Offline core)
- `manifest.json`: PWA Configuration
- `handbook.md`: Content Source

## Assets
- `/assets/music.mp3` (Placeholder)
- `/assets/icon.png` (Placeholder)
