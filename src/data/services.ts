export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  features: string[];
  pricing: {
    package: string;
    price: number;
    period: string;
  }[];
}

export const services: Service[] = [
  {
    id: 'ui-design',
    title: 'UI设计',
    icon: 'palette',
    description: '为您的产品打造精美、一致的用户界面设计。从概念到像素级实现，确保每一个细节都完美呈现。',
    features: [
      '界面视觉设计',
      '组件库设计',
      '设计系统搭建',
      '响应式设计',
      '动效设计',
    ],
    pricing: [
      { package: '基础套餐', price: 8000, period: '项目' },
      { package: '进阶套餐', price: 15000, period: '项目' },
      { package: '完整套餐', price: 30000, period: '项目' },
    ],
  },
  {
    id: 'ux-design',
    title: 'UX设计',
    icon: 'users',
    description: '深入理解用户需求，通过研究和分析，设计出真正解决问题的用户体验方案。',
    features: [
      '用户研究',
      '信息架构',
      '交互设计',
      '可用性测试',
      '原型设计',
    ],
    pricing: [
      { package: '基础套餐', price: 10000, period: '项目' },
      { package: '进阶套餐', price: 20000, period: '项目' },
      { package: '完整套餐', price: 40000, period: '项目' },
    ],
  },
  {
    id: 'brand-design',
    title: '品牌设计',
    icon: 'sparkles',
    description: '从品牌策略到视觉识别，为您的企业打造独特而有影响力的品牌形象。',
    features: [
      '品牌策略',
      'Logo设计',
      '品牌视觉规范',
      '品牌应用设计',
      '品牌升级',
    ],
    pricing: [
      { package: '基础套餐', price: 12000, period: '项目' },
      { package: '进阶套餐', price: 25000, period: '项目' },
      { package: '完整套餐', price: 50000, period: '项目' },
    ],
  },
  {
    id: 'web-design',
    title: 'Web设计',
    icon: 'globe',
    description: '打造视觉精美、功能完善的网站设计，提升品牌形象和用户体验。',
    features: [
      '网站架构设计',
      '页面视觉设计',
      '响应式适配',
      '动效与交互',
      '设计稿交付',
    ],
    pricing: [
      { package: '基础套餐', price: 10000, period: '项目' },
      { package: '进阶套餐', price: 20000, period: '项目' },
      { package: '完整套餐', price: 35000, period: '项目' },
    ],
  },
  {
    id: 'mobile-design',
    title: '移动端设计',
    icon: 'smartphone',
    description: '为iOS和Android平台设计出色的移动应用界面，提供流畅的移动体验。',
    features: [
      '移动界面设计',
      'iOS/Android规范',
      '交互原型',
      '用户测试',
      '设计交付',
    ],
    pricing: [
      { package: '基础套餐', price: 15000, period: '项目' },
      { package: '进阶套餐', price: 30000, period: '项目' },
      { package: '完整套餐', price: 50000, period: '项目' },
    ],
  },
  {
    id: 'design-system',
    title: '设计系统',
    icon: 'box',
    description: '构建可复用的设计系统，提高团队协作效率，确保产品设计的一致性。',
    features: [
      '设计规范文档',
      '组件库搭建',
      '设计工具配置',
      '设计Token',
      '培训与支持',
    ],
    pricing: [
      { package: '基础套餐', price: 20000, period: '项目' },
      { package: '进阶套餐', price: 40000, period: '项目' },
      { package: '完整套餐', price: 80000, period: '项目' },
    ],
  },
];