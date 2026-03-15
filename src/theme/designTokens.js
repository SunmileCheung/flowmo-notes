// 色彩系统
export const colors = {
  // 主色调 - 优雅紫
  primary: {
    light: '#8B7AE8',
    main: '#6C5CE7',
    dark: '#5B4BD6',
  },
  
  // 辅助色 - 青绿
  secondary: {
    light: '#4DD9D1',
    main: '#00CEC9',
    dark: '#00B5B0',
  },
  
  // 强调色 - 粉红
  accent: {
    light: '#FF9EB5',
    main: '#FD79A8',
    dark: '#E86492',
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
    gray900: '#212529',
    black: '#000000',
  },
  
  // 功能色
  success: '#00B894',
  warning: '#FDCB6E',
  danger: '#FF7675',
  info: '#74B9FF',
  
  // 文本色
  text: {
    primary: '#2D3436',
    secondary: '#636E72',
    tertiary: '#B2BEC3',
    inverse: '#FFFFFF',
  },
  
  // 背景色
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F9FA',
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
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
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
  
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
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
  xxxl: 64,
};

// 圆角系统
export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 4,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
  },
};

// 动画时长
export const animation = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

//  breakpoints（响应式）
export const breakpoints = {
  phone: 375,
  tablet: 768,
  desktop: 1024,
};

// 导出完整主题
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  animation,
  breakpoints,
};

export default theme;
