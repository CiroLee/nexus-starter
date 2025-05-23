import enUS from './locales/en-US/translation.json';
import zhCN from './locales/zh-CN/translation.json';
export const resources = {
  'en-US': { transition: enUS },
  'zh-CN': { transition: zhCN }
};

export const resourceOptions = [
  { label: 'English', value: 'en-US' },
  { label: '简体中文', value: 'zh-CN' }
];
