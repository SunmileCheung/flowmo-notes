# 📱 打包 APK 完整指南

## 方法一：使用 EAS Build（推荐，无需 Android Studio）

### 第一步：准备工作

1. **注册 Expo 账号**
   - 访问 https://expo.dev
   - 免费注册账号

2. **登录 Expo**
   ```bash
   eas login
   ```

3. **初始化项目**
   ```bash
   cd flomo-clone
   eas build:configure
   ```

### 第二步：构建 APK

```bash
# 构建内部测试版 APK（免费，快速）
eas build --platform android --profile preview

# 或者构建生产版本
eas build --platform android --profile production
```

### 第三步：下载 APK

- 构建完成后会提供下载链接
- 通常在 5-10 分钟内完成
- 下载 APK 文件安装到手机

## 方法二：本地构建（需要 Android Studio）

### 环境要求

1. **安装 Android Studio**
   - 下载地址：https://developer.android.com/studio
   - 安装时选择默认组件即可

2. **配置 Android SDK**
   ```bash
   # 确保 ANDROID_HOME 环境变量已设置
   # Windows: C:\Users\你的用户名\AppData\Local\Android\Sdk
   ```

3. **安装 Java JDK 11**
   - 下载地址：https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html

### 本地构建命令

```bash
# 配置项目
eas build:configure

# 本地构建 APK
eas build --platform android --local
```

## 方法三：使用 Expo Go（最快，无需打包）

### 在手机上运行

1. **安装 Expo Go App**
   - Android: Google Play 搜索 "Expo Go"
   - 或扫码下载：https://expo.dev/go

2. **启动开发服务器**
   ```bash
   cd flomo-clone
   npx expo start
   ```

3. **扫码运行**
   - 用 Expo Go 扫描终端显示的二维码
   - 应用会在手机上运行

## 📋 构建配置说明

### eas.json 配置

```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"  // 生成 APK 文件
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"  // 生成 AAB（用于 Google Play）
      }
    }
  }
}
```

### app.json 重要配置

- `android.package`: 应用包名（如 com.flomo.clone）
- `android.versionCode`: 版本号（每次发布递增）
- `version`: 应用版本显示

## 🔧 常见问题

### 1. 构建失败

**错误**: "Credentials not configured"

**解决**:
```bash
eas credentials
```

### 2. 构建太慢

- 使用 `--profile preview` 更快
- 选择非高峰时段构建
- 检查网络连接

### 3. APK 无法安装

**原因**: 未开启"未知来源"

**解决**:
- 设置 → 安全 → 开启"未知来源应用"
- 或使用 Expo Go 运行

## 📊 构建时间估算

| 构建类型 | 预计时间 | 文件大小 |
|---------|---------|---------|
| Preview (APK) | 5-10 分钟 | ~30-40 MB |
| Production (AAB) | 10-20 分钟 | ~20-30 MB |

## 💡 小贴士

1. **首次构建较慢** - 需要配置证书和签名
2. **后续构建更快** - 复用已有配置
3. **测试用 Preview** - 开发阶段用 preview 模式
4. **发布用 Production** - 正式发布用 production 模式
5. **保留 APK** - 下载的 APK 可以分享给他人

## 🎯 下一步

构建完成后：

1. 将 APK 安装到手机测试
2. 检查所有功能是否正常
3. 如需发布，使用 production 模式重新构建
4. 可以上传到应用市场或分享给用户

---

**祝你打包顺利！** 🚀
