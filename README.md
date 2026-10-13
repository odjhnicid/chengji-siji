# 四级单词 · 苹果风 PWA 背词应用

纯前端、无后端、离线可用的 iPhone 背单词 PWA，内置 **2607 个四级高频核心词**（含美式音标与中文释义），基于艾宾浩斯遗忘曲线（第 1/2/4/7/15 天）安排复习。

## 文件清单

| 文件 | 说明 |
|------|------|
| `index.html` | 全部页面、样式、逻辑与词库数据（单文件自包含） |
| `manifest.json` | PWA 配置，standalone 全屏模式 |
| `sw.js` | Service Worker，静态资源缓存，离线可用 |
| `icon-192.png` / `icon-512.png` | 应用图标 |

## 功能
- 底部 5 Tab：首页仪表盘 / 学习 / 单词表（筛选+搜索）/ 错题本 / 设置
- 学习流程：先完成当日到期复习 → 新词翻卡认词 → 新词测试（看英选中 / 看中写英 随机）
- 答错自动入错题本，错题按约 25% 穿插进每日测试，连续答对 3 次自动移除
- 连续学习天数打卡、进度条、每日新词数量与发音语速可调
- 数据全部存于浏览器 localStorage，支持导出 / 导入 / 重置
- 发音使用 Web Speech API（speechSynthesis）

## 本地预览
由于 Service Worker 需在 http(s) 下运行，任选其一：
```bash
# 方式一：Python
python -m http.server 8080
# 方式二：Node
npx serve .
```
浏览器打开 `http://localhost:8080`。

## 部署到 GitHub Pages
1. 把以上 5 个文件新建一个仓库并推送（例如仓库名 `cet4-pwa`）。
2. 仓库 **Settings → Pages**，Source 选 `main` 分支根目录 `/ (root)`，保存。
3. 等待 1 分钟后访问 `https://<你的用户名>.github.io/cet4-pwa/`。
4. 注意：GitHub Pages 强制 HTTPS，满足 PWA 与 Service Worker 要求。

## 部署到 Vercel
1. 把仓库导入 Vercel（New Project → 选择仓库）。
2. 框架预设选 **Other**，无构建命令，输出目录留空（即根目录）。
3. 点击 Deploy，得到 `https://xxx.vercel.app` 域名即可。

## iPhone 添加到主屏幕（全屏 PWA）
1. 用 **Safari** 打开部署后的网址（微信/Chrome 内打开无效）。
2. 点击底部 **分享** 按钮（方框向上箭头）。
3. 滑动选择 **添加到主屏幕**。
4. 桌面图标打开后即为全屏 App 形态，无地址栏；首次加载后断网也可使用。

> 提示：学习数据只保存在当前设备的浏览器中，清理 Safari 数据会丢失进度，建议定期在「设置 → 导出学习数据」备份。
