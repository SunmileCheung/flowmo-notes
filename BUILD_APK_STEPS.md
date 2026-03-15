# 📦 一键打包 APK - 完整步骤

## ⚡ 快速打包（推荐）

### 第一步：注册 Expo 账号（免费）

访问：https://expo.dev/signup
- 填写邮箱和密码
- 验证邮箱

### 第二步：登录 EAS

打开命令行（PowerShell 或 CMD）：

```bash
# 进入项目目录
cd C:\Users\82464\.openclaw\workspace\flomo-clone

# 登录 Expo
eas login
```

**按提示操作：**
1. 输入邮箱
2. 输入密码
3. 登录成功会显示 "Logged in"

### 第三步：配置项目（仅首次）

```bash
eas build:configure
```

**选择：**
- Android: 选择默认或创建新的 keystore
- 按回车确认

### 第四步：开始构建 APK

```bash
# 构建内部测试版（快速，5-10 分钟）
eas build --platform android --profile preview
```

**或者构建生产版：**
```bash
eas build --platform android --profile production
```

### 第五步：等待构建完成

- 构建会在云端进行
- 终端会显示构建进度链接
- 完成后提供下载链接
- 通常 5-15 分钟完成

### 第六步：下载并安装

1. 点击终端显示的下载链接
2. 下载 `.apk` 文件
3. 发送到手机
4. 在手机上安装（需要开启"未知来源"）

---

## 🔧 问题排查

### 问题 1：找不到 eas 命令

**解决：**
```bash
npm install -g eas-cli
```

### 问题 2：登录失败

**解决：**
- 检查网络连接
- 确认账号密码正确
- 使用科学上网（如果需要）

### 问题 3：构建失败

**常见原因：**
- 配置错误
- 依赖问题
- 网络问题

**解决：**
```bash
# 清理并重新安装依赖
rm -rf node_modules
npm install

# 重新配置
eas build:configure

# 重试构建
eas build --platform android --profile preview
```

### 问题 4：构建太慢

**解决：**
- 使用 preview 模式（更快）
- 选择非高峰时段（凌晨或清晨）
- 检查网络连接

---

## 📱 替代方案：Expo Go（立即使用）

如果不想等待打包，可以立即使用：

### 1. 手机安装 Expo Go

**Android:**
- Google Play: 搜索 "Expo Go"
- 或直接下载：https://play.google.com/store/apps/details?id=host.exp.exponent

### 2. 启动开发服务器

```bash
cd C:\Users\82464\.openclaw\workspace\flomo-clone
npx expo start
```

### 3. 扫码运行

- 终端会显示二维码
- 用 Expo Go 扫描
- 应用立即运行！

**优点：**
- ✅ 无需等待打包
- ✅ 即时测试
- ✅ 代码修改自动刷新

**缺点：**
- ❌ 需要 Expo Go App
- ❌ 不能独立安装
- ❌ 不能分享给他人

---

## 🎯 推荐流程

### 方案 A：快速测试（现在就用）
```bash
npx expo start
```
→ 手机扫码 → 立即使用

### 方案 B：打包 APK（最终产品）
```bash
eas login
eas build:configure
eas build --platform android --profile preview
```
→ 等待 10 分钟 → 下载 APK → 安装到手机

---

## 📊 构建时间估算

| 构建类型 | 预计时间 | 文件大小 | 用途 |
|---------|---------|---------|------|
| Preview | 5-10 分钟 | ~35 MB | 测试 |
| Production | 10-20 分钟 | ~25 MB | 发布 |

---

## 💡 小贴士

1. **首次构建较慢** - 需要配置证书
2. **后续构建更快** - 复用配置
3. **可以后台构建** - 登录后可以继续做其他事
4. **构建通知** - 完成后会邮件通知
5. **保留 APK** - 下载后妥善保存

---

## 🆘 需要帮助？

### 文档资源
- EAS Build 文档：https://docs.expo.dev/build/introduction/
- Expo 文档：https://docs.expo.dev/
- 本项目文档：README.md, BUILD_GUIDE.md

### 常见问题
- 账号问题：https://expo.dev/settings
- 构建问题：https://docs.expo.dev/build/overview/
- 技术问题：https://forums.expo.dev/

---

**现在开始打包吧！** 🚀

按照上述步骤操作，10 分钟后你就能拿到可用的 APK 文件！
