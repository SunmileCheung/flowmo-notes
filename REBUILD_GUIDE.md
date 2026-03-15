# 🔄 完全清理并重新打包指南

## ⚠️ 问题诊断

如果安装后没有变化，可能是：
1. **缓存问题** - Expo/Metro 缓存未清理
2. **打包问题** - 使用了旧的构建
3. **安装问题** - 安装了旧版本

---

## ✅ 完整解决方案

### 步骤 1：完全清理缓存

```bash
cd C:\Users\82464\.openclaw\workspace\flomo-clone

# 1. 清理 Expo 缓存
npx expo start -c

# 2. 清理 node_modules（可选，如果上面不行）
rm -rf node_modules
npm install

# 3. 清理 Android 缓存（如果之前构建过）
rm -rf android ios
```

### 步骤 2：验证代码已更新

检查以下文件是否包含最新代码：

**NoteEditorScreen.js**:
- ✅ 应该有 `Markdown` 组件
- ✅ 应该有 `renderContainer` 和 `inputLayer` 样式
- ✅ 应该有透明 TextInput 覆盖在渲染层上

**HomeScreen.js**:
- ✅ 应该有 `renderMarkdownPreview` 函数
- ✅ 底部导航应该有 `navIconWrapper` 样式
- ✅ 应该有 SafeAreaView

### 步骤 3：重新打包

```bash
# 确保在 flomo-clone 目录
cd C:\Users\82464\.openclaw\workspace\flomo-clone

# 打包（带清理缓存参数）
eas build --platform android --profile preview --clear-cache
```

### 步骤 4：完全卸载旧版本

**在手机上**:
1. 找到旧的 FlowMo 应用
2. 长按图标
3. 点击"卸载"
4. 确认卸载

### 步骤 5：安装新版本

1. 等待构建完成（10-15 分钟）
2. 从构建页面下载新 APK
3. 发送到手机
4. 安装新版本
5. 打开应用测试

---

## ✅ 验证新功能

### Markdown 实时预览
1. 点击加号创建笔记
2. 输入 `- 测试`
3. **应该立即看到**：• 测试（不是 `- 测试` 源码）
4. 输入 `1. 编号`
5. **应该立即看到**：1. 编号
6. 输入 `# 标题`
7. **应该立即看到**：大标题

### 底部导航
- ✅ 只有 3 个入口（首页、标签、统计）
- ✅ 选中项有圆形背景
- ✅ 不遮挡蓝色加号

### App 图标
- ✅ 三色渐变（蓝→紫→红）
- ✅ 有流动书本图案
- ✅ 有"FlowMo"文字

### 首页列表
- ✅ 笔记内容显示渲染后的效果
- ✅ 列表显示为 • 符号
- ✅ 待办显示为 □ ☑

---

## 🔍 常见问题

### Q1: 为什么安装后没变化？

**A**: 可能是以下原因：
1. 安装了旧版本（先卸载旧的）
2. 打包时使用了缓存（使用 `--clear-cache`）
3. 代码没有正确保存（检查文件修改时间）

### Q2: 如何确认打包的是最新代码？

**A**: 
1. 检查文件修改时间应该是最新的
2. 打包时看到"Compressed project files"大小应该是 1.8MB 左右
3. 构建日志中应该显示最新的代码

### Q3: Markdown 还是不渲染怎么办？

**A**:
1. 确认 NoteEditorScreen.js 包含 `Markdown` 组件
2. 确认有 `renderContainer` 和 `inputLayer` 样式
3. 重新清理缓存并打包
4. 完全卸载旧版本后安装新版本

---

## 📝 完整的打包命令

```bash
cd C:\Users\82464\.openclaw\workspace\flomo-clone

# 完全清理
npx expo start -c

# 在另一个窗口打包
eas build --platform android --profile preview --clear-cache
```

---

## 🎯 构建信息

- **产品名称**: FlowMo - 流动的智慧
- **版本**: v1.0.0
- **包名**: com.flowmo.notes
- **预计时间**: 10-15 分钟

---

## ✅ 最后确认

打包前确认：
- [ ] 文件已保存
- [ ] 缓存已清理
- [ ] 使用 `--clear-cache` 参数
- [ ] 完全卸载旧版本
- [ ] 安装新版本

---

**现在重新打包吧！** 🚀

```bash
eas build --platform android --profile preview --clear-cache
```
