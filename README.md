# SkilFor
A platform for learning and teaching skill.

## 專案介紹
SkilFor 是一個兼具「教」與「學」的平台。
1. 關於「教」：提供給有一技之長的人，於下班後的時間在平台上教學技能，開啟職涯新篇章。
2. 關於「學」：提供給渴望彈性學習的學習者，更多時間、預算、學習內容等不同的選擇。

## 專案靈感
和大家分享兩則小故事：
1. 我有一個設計師朋友，設計雖然不強，但 b-box 起來真的超強！某天他又在 b-box 的時候，我心裡不禁讚嘆的想著：「哇！這種程度已經可以去當 b-box 老師了吧！」但可惜目前台灣沒有一個這樣的舞台讓這位朋友發光發熱，但我仍然相信一定有人會想學 b-box 的。
2. 我平常是一個很愛線上學習的人，買了不少線上課程，雖然時間上蠻彈性的，想學就可以學，但課程內容都是老師規劃好的，要購買只能整個課程購買（即使我真的對課程中某些內容沒興趣），讓我覺得線上課程在內容彈性上很可惜。

## User Story
https://few-weather-9a4.notion.site/10-21-User-Story-b5245f553a9841a2bec02107a3b9fcaa

## User Flow
https://whimsical.com/mtr-05-W9KwquMBSCPHosycDw3rhC

## 核心功能
- 篩選系統：讓使用者根據學習領域、時間、預算來篩選出符合其條件的課程。
- 會員系統：分為學生與老師身份，不同身份能使用的功能不同，前端看到的網頁內容也會有所不同。
- 後台系統：讓平台方管理審核老師的流程，以及平台上的會員。
- 論壇系統：讓學生上完課程後可以針對課程給予評價，讓真實的評價成為留任好老師的市場機制。
- 課程搜尋系統：讓學生在搜尋框輸入想學的內容關鍵字，平台可以推薦給學生相關的課程。
- 購物車系統：讓學生可以將有興趣的課程加入待購買清單。
- 行事曆系統：讓學生可以查詢自己的購買的課程與上課時間；讓老師可以看見自己課程的預約狀況。
- 金流系統：平台將以「儲值點數」的方式做課程的購買，使用者必須先儲值足夠的點數，才可以購買相對應點數的課程。

## 使用技術與資源
1. 前端：採用前端框架 React、Style 開發工具 Sass、圖片優化資源 imgur API。
2. 後端：Express + Sequelize + firebase （第三方登入）

## 團隊成員
1. 前端：[@hazel-shih](https://github.com/hazel-shih)、[@ZoeLiuhy](https://github.com/ZoeLiuhy)
2. 後端：[@chengcheng1231](https://github.com/chengcheng1231)、[@Wangpoching](https://github.com/Wangpoching)
