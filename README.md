# flomo 笔记 - 极简卡片笔记应用

 inspired by flomo 浮墨笔记的设计理念

## 🎯 设计理念

- **极简输入** - 无需格式、无需排版、无需分类，像微信聊天一样简单
- **快速记录** - 随时随地记录想法，支持文字输入
- **标签管理** - 用标签而非文件夹分类，支持搜索
- **每日回顾** - 统计功能帮助习惯养成
- **专注记录** - 拒绝 All in one，只专注于记录与整理想法

## ✨ 核心功能

### 📝 快速记录
- 首页浮动按钮，一键开启记录
- 支持添加多个标签
- 自动保存，无需担心丢失

### 🏷️ 标签管理
- 独立的标签页面
- 显示每个标签的使用次数
- 点击标签查看相关笔记

### 🔍 搜索功能
- 支持全文搜索
- 支持按标签搜索
- 实时搜索结果

### 📊 数据统计
- 总笔记数统计
- 7 天记录趋势图
- 常用标签 TOP5
- 激励语录

## 🚀 运行项目

```bash
# 安装依赖
npm install

# 启动开发服务器
npx expo start

# 在 Android 设备上运行
npm run android

# 在 iOS 设备上运行
npm run ios

# 在网页上运行
npm run web
```

## 📱 打包 APK

### 使用 EAS Build（推荐）

```bash
# 安装 EAS CLI
npm install -g eas-cli

# 登录 Expo 账号
eas login

# 配置 EAS Build
eas build:configure

# 构建 Android APK
eas build --platform android --profile preview

# 或者构建生产版本
eas build --platform android --profile production
```

### 本地构建（需要 Android Studio）

```bash
# 安装必要依赖
npm install -g eas-cli

# 配置项目
eas build:configure

# 本地构建
eas build --platform android --local
```

## 📁 项目结构

```
flomo-clone/
├── App.js                          # 主应用入口
├── app.json                        # Expo 配置
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js          # 首页（笔记列表）
│   │   ├── NoteEditorScreen.js    # 笔记编辑页
│   │   ├── TagScreen.js           # 标签页
│   │   ├── SearchScreen.js        # 搜索页
│   │   └── StatsScreen.js         # 统计页
│   └── utils/
│       └── storage.js             # 本地存储工具
└── assets/                         # 资源文件
```

## 🎨 设计特点

- **简约不简单** - 界面简洁但功能完整
- **蓝色主题** - 采用 flomo 经典的蓝色 (#007AFF)
- **卡片式设计** - 每条笔记都是独立的卡片
- **流畅动画** - 自然的过渡效果
- **响应式布局** - 适配不同屏幕尺寸

## 💾 数据存储

- 使用 AsyncStorage 本地存储
- 数据完全私有，不上传云端
- 支持永久保存

## 📝 使用技巧

1. **快速记录**：点击首页右下角蓝色按钮
2. **添加标签**：在编辑页面输入标签名称后按回车
3. **查看标签**：底部导航点击"标签"
4. **搜索笔记**：顶部搜索框输入关键词
5. **查看统计**：底部导航点击"统计"

## 🔧 技术栈

- React Native
- Expo
- React Navigation
- AsyncStorage
- @expo/vector-icons

## 📄 License

MIT

---

**flomo = flow + memo**

让知识如川流般持续流动 🌊
