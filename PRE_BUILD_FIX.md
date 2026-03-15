# flomo 笔记 - 打包前准备

## ⚠️ 图标文件缺失

打包 APK 需要图标文件。请准备以下图片：

### 必需文件

1. **icon.png** (1024x1024)
   - 应用主图标
   - 正方形，无透明背景
   - 建议：蓝色背景 + 白色"f"字母

2. **splash.png** (2048x2048)
   - 启动画面
   - 建议：蓝色背景 + 白色 logo

3. **favicon.png** (48x48)
   - 网页版图标
   - 正方形

### 文件位置

```
flomo-clone/
└── assets/
    ├── icon.png       ← 必需
    ├── splash.png     ← 必需
    └── favicon.png    ← 必需
```

---

## 🎨 快速生成图标

### 方法 1：使用在线工具

1. 访问 https://icon.kitchen/
2. 上传你的 logo 或选择形状
3. 选择颜色（推荐 #007AFF 蓝色）
4. 下载图标包
5. 解压到 `assets/` 目录

### 方法 2：使用 Figma/Photoshop

创建 1024x1024 正方形：
- 背景色：#007AFF（蓝色）
- 前景：白色"f"字母或 flomo logo
- 导出为 PNG

### 方法 3：简单方案（推荐）

用纯色 + 文字：
```
背景：#007AFF（蓝色）
文字：白色"f"
字体：Arial Bold
```

---

## 📦 打包步骤

准备好图标后：

```bash
cd C:\Users\82464\.openclaw\workspace\flomo-clone

# 1. 登录 Expo
eas login

# 2. 清理并重新配置
rm -rf android ios
eas build:configure

# 3. 开始构建
eas build --platform android --profile preview
```

---

## 🚀 快速测试（无需图标）

如果只想测试应用，不需要打包：

```bash
npx expo start
```

然后用 Expo Go 扫码即可使用！

---

## 💡 临时方案

如果急着打包，可以用占位图标：

```bash
# 创建一个简单的蓝色图标（需要 ImageMagick）
convert -size 1024x1024 xc:#007AFF assets/icon.png
convert -size 2048x2048 xc:#007AFF assets/splash.png
convert -size 48x48 xc:#007AFF assets/favicon.png
```

或者从网上下载免费图标：
- https://www.iconfinder.com/
- https://iconscout.com/

---

## ✅ 检查清单

打包前确认：
- [ ] assets/icon.png 存在（1024x1024）
- [ ] assets/splash.png 存在（2048x2048）
- [ ] assets/favicon.png 存在（48x48）
- [ ] 已登录 Expo 账号
- [ ] 网络连接正常

---

**准备好图标后就可以打包了！** 🎨
