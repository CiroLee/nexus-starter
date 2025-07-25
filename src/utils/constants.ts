export const projectStatus = {
  created: 'created', // 已创建
  planning: 'planning', // 规划中
  reviewing: 'reviewing', // 审核中
  approved: 'approving', // 已审核
  developing: 'developing', // 开发中
  testing: 'testing', // 测试中
  deployed: 'deployed', // 已上线
  completed: 'completed', // 已完成
  closed: 'closed', // 已关闭
  paused: 'paused', // 已暂停
  archived: 'archived' // 已归档
};

export const languageMap = {
  en: 'en-US',
  zh: 'zh-CN'
};

export const projectStatusColors = {
  created: '#93C5FD',
  planning: '#C4B5FD',
  reviewing: '#FDE047',
  approved: '#86EFAC',
  developing: '#FDBA74',
  testing: '#D8B4FE',
  deployed: '#4ADE80',
  completed: '#16A34A',
  closed: '#D1D5DB',
  paused: '#FCA5A5',
  archived: '#6B7280'
};

export const positionOptions = [
  {
    label: 'uiDesigner',
    value: 'ui-designer'
  },
  {
    label: 'frontendDeveloper',
    value: 'frontend-developer'
  },
  {
    label: 'backendDeveloper',
    value: 'backend-developer'
  },
  {
    label: 'aiEngineer',
    value: 'ai-engineer'
  },
  {
    label: 'productManager',
    value: 'product-manager'
  },
  {
    label: 'accounting',
    value: 'accounting'
  },
  {
    label: 'hr',
    value: 'hr'
  }
];

export const roleOptions = [
  { label: 'user', value: 'user' },
  { label: 'admin', value: 'admin' },
  { label: 'superAdmin', value: 'super-admin' }
];
