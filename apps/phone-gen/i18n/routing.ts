import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

/**
 * 支持的语言列表
 * en - 英语 (默认)
 * zh - 中文
 * hi - 印地语  
 * id - 印尼语
 * ja - 日语
 */
export const locales = ['en', 'zh', 'hi', 'id', 'ja'] as const;

/**
 * 语言类型定义
 */
export type Locale = (typeof locales)[number];

/**
 * 国际化路由配置
 */
export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
});

/**
 * 导出国际化导航工具函数
 * Link - 国际化链接组件
 * redirect - 重定向函数
 * usePathname - 获取当前路径钩子
 * useRouter - 路由钩子
 * getPathname - 获取路径工具函数
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);