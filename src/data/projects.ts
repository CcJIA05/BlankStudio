export interface Project {
  id: string;
  title: string;
  category: 'ui' | 'ux' | 'brand' | 'web' | 'mobile';
  client: string;
  year: number;
  description: string;
  overview: string;
  challenges: string[];
  solutions: string[];
  results: {
    metric: string;
    value: string;
  }[];
  images: {
    src: string;
    alt: string;
  }[];
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 'e-commerce-app',
    title: '高端电商APP设计',
    category: 'mobile',
    client: 'Luxury Brands',
    year: 2025,
    description: '为高端奢侈品品牌打造的移动购物体验，融合极简美学与流畅交互。',
    overview: '这是一个为高端奢侈品品牌设计的电商APP项目。目标是打造一个既体现品牌高端定位，又提供极致用户体验的移动购物平台。项目历时6个月，从用户研究到最终交付，全程参与。',
    challenges: [
      '如何在保持品牌高端调性的同时，提供便捷的购物体验',
      '优化复杂的商品分类和筛选系统',
      '提升移动端支付转化率',
    ],
    solutions: [
      '采用极简设计语言，大量留白突出商品本身',
      '设计了直观的商品筛选和搜索系统',
      '简化支付流程，支持多种支付方式',
    ],
    results: [
      { metric: '用户留存率', value: '+35%' },
      { metric: '转化率', value: '+28%' },
      { metric: '用户满意度', value: '4.8/5' },
    ],
    images: [
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20e-commerce%20app%20ui%20design%20minimal%20elegant%20shopping%20interface&image_size=portrait_16_9', alt: '电商APP首页' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20product%20detail%20page%20ui%20design%20elegant%20minimal&image_size=portrait_16_9', alt: '商品详情页' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=shopping%20cart%20checkout%20ui%20design%20luxury%20minimal&image_size=portrait_16_9', alt: '购物车页面' },
    ],
    tags: ['移动端', '电商', '奢侈品', '极简设计'],
  },
  {
    id: 'fintech-dashboard',
    title: '金融科技后台管理系统',
    category: 'web',
    client: 'FinTech Company',
    year: 2025,
    description: '为金融科技公司设计的数据可视化后台，提供实时监控和数据分析功能。',
    overview: '为一家金融科技初创公司设计的后台管理系统。该系统需要处理大量实时数据，为管理员提供直观的数据可视化和操作界面。项目重点在于数据呈现的清晰度和操作的便捷性。',
    challenges: [
      '处理海量数据的可视化呈现',
      '确保数据实时更新的同时保持性能',
      '设计复杂的权限管理系统',
    ],
    solutions: [
      '采用模块化设计，支持多维度数据筛选',
      '实现数据懒加载和虚拟滚动优化性能',
      '设计清晰的角色权限管理界面',
    ],
    results: [
      { metric: '数据处理效率', value: '+40%' },
      { metric: '管理员操作效率', value: '+32%' },
      { metric: '系统稳定性', value: '99.9%' },
    ],
    images: [
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fintech%20dashboard%20ui%20design%20dark%20theme%20data%20visualization&image_size=landscape_16_9', alt: '数据仪表盘' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=financial%20analytics%20dashboard%20charts%20graphs%20ui&image_size=landscape_16_9', alt: '数据分析界面' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=admin%20management%20panel%20ui%20design%20clean%20modern&image_size=landscape_16_9', alt: '管理面板' },
    ],
    tags: ['Web', '金融科技', '数据可视化', '后台系统'],
  },
  {
    id: 'health-app',
    title: '健康管理APP设计',
    category: 'mobile',
    client: 'Healthcare Startup',
    year: 2024,
    description: '为健康管理初创公司设计的全功能健康追踪APP，涵盖运动、饮食、睡眠等多个维度。',
    overview: '这是一个综合性的健康管理APP项目。用户可以记录运动、饮食、睡眠等健康数据，并获得个性化的健康建议。项目注重用户体验的完整性和数据的准确性。',
    challenges: [
      '设计直观的数据录入界面',
      '提供个性化的健康建议',
      '保持用户长期使用的动力',
    ],
    solutions: [
      '采用卡片式设计，简化数据录入流程',
      '基于AI算法提供个性化健康建议',
      '设计成就系统和社交分享功能',
    ],
    results: [
      { metric: '日活跃用户', value: '+50%' },
      { metric: '用户留存', value: '+42%' },
      { metric: '应用商店评分', value: '4.9/5' },
    ],
    images: [
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=health%20fitness%20app%20ui%20design%20clean%20modern%20tracking&image_size=portrait_16_9', alt: '健康追踪首页' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=nutrition%20diet%20tracking%20app%20ui%20food%20log&image_size=portrait_16_9', alt: '饮食记录页面' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sleep%20tracking%20app%20ui%20design%20dark%20theme%20charts&image_size=portrait_16_9', alt: '睡眠分析页面' },
    ],
    tags: ['移动端', '健康', '数据追踪', '生活方式'],
  },
  {
    id: 'brand-redesign',
    title: '科技品牌视觉重设计',
    category: 'brand',
    client: 'Tech Startup',
    year: 2024,
    description: '为科技初创公司进行全面的品牌视觉重设计，包括Logo、色彩系统、字体规范等。',
    overview: '为一家快速成长的科技初创公司进行品牌视觉升级。原有的品牌形象已经无法满足公司发展需求，需要一个更现代、更专业的视觉系统来支撑公司的市场扩张。',
    challenges: [
      '在保持品牌辨识度的同时进行创新',
      '设计一套可扩展的品牌系统',
      '确保品牌在不同媒介上的一致性',
    ],
    solutions: [
      '保留品牌核心元素，进行现代化演绎',
      '建立完整的品牌设计规范文档',
      '设计多场景的品牌应用模板',
    ],
    results: [
      { metric: '品牌认知度', value: '+60%' },
      { metric: '市场反馈', value: '95%正面评价' },
      { metric: '品牌应用效率', value: '+70%' },
    ],
    images: [
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=technology%20brand%20logo%20design%20modern%20minimal%20tech&image_size=square', alt: '品牌Logo' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20identity%20design%20guidelines%20color%20typography%20system&image_size=landscape_16_9', alt: '品牌规范' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brand%20stationery%20design%20business%20cards%20letterhead%20tech&image_size=square', alt: '品牌应用' },
    ],
    tags: ['品牌设计', '视觉识别', '科技', '初创公司'],
  },
  {
    id: 'travel-platform',
    title: '旅行平台Web设计',
    category: 'web',
    client: 'Travel Company',
    year: 2024,
    description: '为在线旅行平台设计的全新Web界面，提升用户预订体验和转化率。',
    overview: '为一家在线旅行公司设计的全新网站。目标是打造一个视觉吸引力强、操作便捷的旅行预订平台。项目重点在于搜索体验的优化和视觉内容的呈现。',
    challenges: [
      '优化复杂的搜索筛选流程',
      '提升视觉内容的吸引力',
      '优化多步骤的预订流程',
    ],
    solutions: [
      '设计智能搜索建议和筛选系统',
      '采用大图展示和视觉故事叙述',
      '简化预订流程，支持一键预订',
    ],
    results: [
      { metric: '搜索转化率', value: '+38%' },
      { metric: '页面停留时间', value: '+45%' },
      { metric: '预订转化率', value: '+30%' },
    ],
    images: [
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=travel%20booking%20website%20ui%20design%20hero%20banner%20destinations&image_size=landscape_16_9', alt: '旅行平台首页' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hotel%20search%20results%20page%20ui%20design%20cards%20filters&image_size=landscape_16_9', alt: '酒店搜索结果' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=travel%20booking%20process%20ui%20design%20steps%20checkout&image_size=landscape_16_9', alt: '预订流程' },
    ],
    tags: ['Web', '旅行', '预订平台', '用户体验'],
  },
  {
    id: 'edtech-platform',
    title: '在线教育平台UX设计',
    category: 'ux',
    client: 'Education Tech',
    year: 2023,
    description: '为在线教育平台进行全面的用户体验设计，优化学习路径和互动体验。',
    overview: '为一家在线教育平台进行用户体验优化。通过用户研究和数据分析，重新设计学习流程和交互方式，提升学习效果和用户满意度。',
    challenges: [
      '理解不同用户群体的学习需求',
      '设计有效的学习激励机制',
      '优化复杂的课程导航系统',
    ],
    solutions: [
      '进行深度用户访谈和行为分析',
      '设计成就系统和学习进度可视化',
      '重构课程导航和推荐系统',
    ],
    results: [
      { metric: '学习完成率', value: '+55%' },
      { metric: '用户满意度', value: '4.7/5' },
      { metric: '课程复购率', value: '+40%' },
    ],
    images: [
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=online%20education%20platform%20ui%20design%20learning%20dashboard&image_size=landscape_16_9', alt: '学习仪表盘' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=course%20player%20interface%20ui%20design%20video%20learning&image_size=landscape_16_9', alt: '课程播放器' },
      { src: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=learning%20progress%20tracking%20ui%20design%20gamification&image_size=portrait_16_9', alt: '学习进度追踪' },
    ],
    tags: ['UX设计', '在线教育', '学习平台', '用户体验'],
  },
];

export const categoryNames: Record<string, string> = {
  ui: 'UI设计',
  ux: 'UX设计',
  brand: '品牌设计',
  web: 'Web设计',
  mobile: '移动端设计',
};