# 🚀 快速启动指南

## 立即运行（推荐新手）

### 1. 安装依赖
```bash
cd flomo-clone
npm install
```

### 2. 启动开发服务器
```bash
npx expo start
```

### 3. 在手机上运行
- 下载 **Expo Go** App（App Store 或 Google Play）
- 扫描终端显示的二维码
- 应用立即在手机上运行！

## 功能演示

### ✅ 已实现功能

1. **首页笔记列表**
   - 显示所有笔记（按时间倒序）
   - 下拉刷新
   - 空状态提示

2. **快速记录**
   - 点击右下角蓝色按钮
   - 输入笔记内容
   - 添加标签（回车确认）
   - 自动保存

3. **标签管理**
   - 查看所有标签
   - 显示标签使用次数
   - 点击标签查看相关笔记

4. **搜索功能**
   - 支持关键词搜索
   - 支持标签搜索
   - 实时显示结果

5. **数据统计**
   - 总笔记数
   - 7 天趋势图
   - 常用标签 TOP5
   - 激励语录

### 🎨 设计特点

- **极简风格** - 类似 flomo 的简洁设计
- **蓝色主题** - #007AFF 经典配色
- **卡片布局** - 每条笔记独立卡片
- **流畅交互** - 自然的过渡动画

## 技术架构

```
App.js (入口)
  └── Navigation (React Navigation)
       ├── HomeScreen (首页)
       ├── NoteEditorScreen (编辑)
       ├── TagScreen (标签)
       ├── SearchScreen (搜索)
       └── StatsScreen (统计)
  
  └── Storage (AsyncStorage)
       ├── saveNote
       ├── getNotes
       ├── deleteNote
       ├── getTags
       └── searchNotes
```

## 下一步

### 开发
- 修改代码后自动热重载
- 无需重新编译

### 打包
- 查看 `BUILD_GUIDE.md`
- 使用 EAS Build 打包 APK

### 定制
- 修改颜色：`src/screens/*.js` 中的颜色值
- 修改文字：直接编辑对应文件
- 添加功能：参考现有代码结构

## 项目文件

```
flomo-clone/
├── App.js                    # 主入口
├── app.json                  # 应用配置
├── package.json              # 依赖配置
├── eas.json                  # 构建配置
├── README.md                 # 项目说明
├── BUILD_GUIDE.md           # 打包指南
└── src/
    ├── screens/             # 页面组件
    ├── components/          # 通用组件
    └── utils/               # 工具函数
```

## 需要帮助？

1. 查看 `README.md` - 完整项目说明
2. 查看 `BUILD_GUIDE.md` - 打包详细指南
3. 查看 Expo 文档 - https://docs.expo.dev

---

**开始记录你的想法吧！** 💡
