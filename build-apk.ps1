# flomo 笔记 - 一键打包脚本
# 使用方法：在 PowerShell 中运行 .\build-apk.ps1

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  flomo 笔记 APK 打包工具" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# 检查 EAS CLI 是否安装
Write-Host "[1/5] 检查 EAS CLI..." -ForegroundColor Yellow
$easVersion = eas --version 2>$null
if ($null -eq $easVersion) {
    Write-Host "EAS CLI 未安装，正在安装..." -ForegroundColor Yellow
    npm install -g eas-cli
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ EAS CLI 安装失败！" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ EAS CLI 安装成功" -ForegroundColor Green
} else {
    Write-Host "✅ EAS CLI 已安装：$easVersion" -ForegroundColor Green
}

Write-Host ""

# 检查 Expo 登录状态
Write-Host "[2/5] 检查 Expo 登录状态..." -ForegroundColor Yellow
$whoami = eas whoami 2>$null
if ($null -eq $whoami -or $whoami -match "Not logged in") {
    Write-Host "⚠️  未登录 Expo 账号" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请选择：" -ForegroundColor Cyan
    Write-Host "  1. 登录 Expo（推荐）" -ForegroundColor White
    Write-Host "  2. 使用 Expo Go 立即测试（无需打包）" -ForegroundColor White
    Write-Host ""
    $choice = Read-Host "输入选项 (1/2)"
    
    if ($choice -eq "1") {
        Write-Host ""
        Write-Host "正在启动登录流程..." -ForegroundColor Yellow
        eas login
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ 登录失败！" -ForegroundColor Red
            exit 1
        }
        Write-Host "✅ 登录成功" -ForegroundColor Green
    } else {
        Write-Host ""
        Write-Host "启动 Expo Go..." -ForegroundColor Yellow
        npx expo start
        exit 0
    }
} else {
    Write-Host "✅ 已登录：$whoami" -ForegroundColor Green
}

Write-Host ""

# 配置项目
Write-Host "[3/5] 配置项目..." -ForegroundColor Yellow
if (-not (Test-Path "eas.json")) {
    eas build:configure
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 配置失败！" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ 配置完成" -ForegroundColor Green
} else {
    Write-Host "✅ 项目已配置" -ForegroundColor Green
}

Write-Host ""

# 选择构建类型
Write-Host "[4/5] 选择构建类型..." -ForegroundColor Yellow
Write-Host ""
Write-Host "请选择构建类型：" -ForegroundColor Cyan
Write-Host "  1. Preview（快速测试，5-10 分钟）" -ForegroundColor White
Write-Host "  2. Production（正式发布，10-20 分钟）" -ForegroundColor White
Write-Host ""
$buildType = Read-Host "输入选项 (1/2，默认 1)"

if ($buildType -eq "2") {
    $profile = "production"
    Write-Host "选择：Production 模式" -ForegroundColor Yellow
} else {
    $profile = "preview"
    Write-Host "选择：Preview 模式" -ForegroundColor Yellow
}

Write-Host ""

# 开始构建
Write-Host "[5/5] 开始构建 APK..." -ForegroundColor Yellow
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  构建信息：" -ForegroundColor Cyan
Write-Host "  平台：Android" -ForegroundColor White
Write-Host "  模式：$profile" -ForegroundColor White
Write-Host "  预计时间：$(if ($profile -eq 'preview') { '5-10 分钟' } else { '10-20 分钟' })" -ForegroundColor White
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "正在提交构建任务..." -ForegroundColor Yellow
Write-Host ""

# 执行构建
eas build --platform android --profile $profile

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "====================================" -ForegroundColor Green
    Write-Host "  ✅ 构建任务已提交！" -ForegroundColor Green
    Write-Host "====================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 构建进度和下载链接：" -ForegroundColor Cyan
    Write-Host "   https://expo.dev/accounts/[your-account]/projects/flomo-clone/builds" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 提示：" -ForegroundColor Yellow
    Write-Host "   - 构建完成后会收到邮件通知" -ForegroundColor White
    Write-Host "   - 可以在上述链接查看进度和下载 APK" -ForegroundColor White
    Write-Host "   - 也可以使用 'eas build:list' 查看构建历史" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "❌ 构建失败！请检查错误信息" -ForegroundColor Red
    Write-Host ""
    Write-Host "常见问题解决：" -ForegroundColor Yellow
    Write-Host "  1. 检查网络连接" -ForegroundColor White
    Write-Host "  2. 确认 Expo 账号已登录" -ForegroundColor White
    Write-Host "  3. 运行 'eas build:configure' 重新配置" -ForegroundColor White
    Write-Host "  4. 查看文档：BUILD_APK_STEPS.md" -ForegroundColor White
    Write-Host ""
}

Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
