export interface Skill {
  name: string;
  category: 'design' | 'tools' | 'soft';
  level: number;
}

export const skills: Skill[] = [
  { name: 'UI设计', category: 'design', level: 95 },
  { name: 'UX设计', category: 'design', level: 90 },
  { name: '品牌设计', category: 'design', level: 85 },
  { name: '交互设计', category: 'design', level: 92 },
  { name: 'Figma', category: 'tools', level: 98 },
  { name: 'Sketch', category: 'tools', level: 90 },
  { name: 'Adobe Creative Suite', category: 'tools', level: 88 },
  { name: 'ProtoPie', category: 'tools', level: 85 },
  { name: '用户研究', category: 'soft', level: 85 },
  { name: '团队协作', category: 'soft', level: 92 },
  { name: '项目管理', category: 'soft', level: 88 },
  { name: '沟通能力', category: 'soft', level: 95 },
];

export const skillCategories = {
  design: '设计技能',
  tools: '工具技能',
  soft: '软技能',
};

export const achievements = [
  { label: '从业年限', value: '8', suffix: '年' },
  { label: '完成项目', value: '120', suffix: '+个' },
  { label: '服务客户', value: '80', suffix: '+家' },
  { label: '获奖荣誉', value: '15', suffix: '+项' },
];

export const testimonials = [
  {
    content: '设计师的专业能力和对细节的把控令人印象深刻。项目交付准时，质量超出预期。',
    author: '张明',
    role: '产品总监',
    company: '某互联网公司',
  },
  {
    content: '合作过程非常愉快，设计师能够很好地理解我们的需求，并提出专业的建议。',
    author: '李华',
    role: 'CEO',
    company: '某初创公司',
  },
  {
    content: '设计的产品界面不仅美观，而且用户体验极佳，用户反馈非常好。',
    author: '王芳',
    role: '运营总监',
    company: '某电商平台',
  },
];