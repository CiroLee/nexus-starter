import { format, type FormatOptions } from 'date-fns';
export function formatDate(date: string | number | Date, option?: { formatStr?: string; opt?: FormatOptions }): string {
  const d = date instanceof Date ? date : new Date(date);
  const { formatStr = 'yyyy/MM/dd HH:mm:ss', opt } = option || {};
  return format(d, formatStr, opt);
}
