// FlowMo 品牌色彩系统
export const brandColors = {
  // 主色 - FlowMo Blue
  primary: {
    light: '#74A5F2',
    main: '#4A90E2',
    dark: '#357ABD',
  },
  
  // 辅助色 - Sunset Orange
  accent: {
    light: '#FF8E8E',
    main: '#FF6B6B',
    dark: '#E85A5A',
  },
  
  // 深度色 - Deep Purple
  deep: {
    light: '#8B7AE8',
    main: '#6C5CE7',
    dark: '#5B4BD6',
  },
  
  // 中性色
  neutral: {
    white: '#FFFFFF',
    gray50: '#F8F9FA',
    gray100: '#F1F3F5',
    gray200: '#E9ECEF',
    gray300: '#DEE2E6',
    gray400: '#CED4DA',
    gray500: '#ADB5BD',
    gray600: '#6C757D',
    gray700: '#495057',
    gray800: '#343A40',
    gray900: '#2D3436',
    black: '#000000',
  },
  
  // 功能色
  success: '#2ECC71',
  warning: '#F39C12',
  danger: '#E74C3C',
  info: '#3498DB',
  
  // 文本色
  text: {
    primary: '#2D3436',
    secondary: '#636E72',
    tertiary: '#95A5A6',
    inverse: '#FFFFFF',
  },
  
  // 背景色
  background: {
    primary: '#F8F9FA',
    secondary: '#FFFFFF',
    tertiary: '#F1F3F5',
  },
  
  // 深色模式
  dark: {
    background: '#1A1A2E',
    surface: '#16213E',
    card: '#0F3460',
    text: '#EAEAEA',
    textSecondary: '#A0A0A0',
  },
};

// 字体系统
export const typography = {
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
    code: 'Courier New',
  },
  
  fontSize: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// 间距系统（基于 8px）
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// 圆角系统
export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  full: 999,
};

// 阴影系统
export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 5,
  },
};

export default {
  colors: brandColors,
  typography,
  spacing,
  borderRadius,
  shadows,
};
