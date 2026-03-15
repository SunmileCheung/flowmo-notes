# 🚀 立即使用 flomo 笔记

## 选项 1：Expo Go（最快，立即使用）⭐

**无需打包，30 秒内开始使用！**

### 步骤：

1. **手机安装 Expo Go**
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent
   - 或在应用商店搜索 "Expo Go"

2. **启动应用**
   ```bash
   cd C:\Users\82464\.openclaw\workspace\flomo-clone
   npx expo start
   ```

3. **扫码运行**
   - 终端会显示二维码
   - 用 Expo Go 扫描
   - ✅ 应用立即运行！

**优点：**
- ✅ 30 秒内使用
- ✅ 代码修改自动刷新
- ✅ 无需等待打包

**缺点：**
- ❌ 需要 Expo Go App
- ❌ 不能独立安装

---

## 选项 2：打包 APK（独立应用）

**10 分钟获得独立 APK 文件**

### 快速打包命令：

```bash
# 1. 进入项目目录
cd C:\Users\82464\.openclaw\workspace\flomo-clone

# 2. 运行一键打包脚本
.\build-apk.ps1
```

**或者手动执行：**

```bash
# 1. 安装 EAS CLI（如果还没安装）
npm install -g eas-cli

# 2. 登录 Expo 账号
eas login

# 3. 配置项目
eas build:configure

# 4. 开始构建
eas build --platform android --profile preview
```

**构建完成后：**
- 会收到邮件通知
- 提供 APK 下载链接
- 发送到手机安装即可

**优点：**
- ✅ 独立应用
- ✅ 可以分享给他人
- ✅ 无需 Expo Go

**缺点：**
- ❌ 需要等待 5-15 分钟
- ❌ 需要 Expo 账号

---

## 📋 详细文档

- **打包详细步骤**: `BUILD_APK_STEPS.md`
- **一键打包脚本**: `build-apk.ps1`
- **使用手册**: `USER_GUIDE.md`
- **项目说明**: `README.md`

---

## 🎯 推荐

**现在就想试试？** → 使用 **选项 1（Expo Go）**

**想要独立 APK？** → 使用 **选项 2（打包）**

---

## 💡 提示

Expo Go 是完全免费的，适合个人使用。
如果需要分享给朋友或发布，再打包 APK 也不迟！

**开始使用吧！** 📱
