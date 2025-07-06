import { useTranslation } from 'react-i18next';
import { cva } from 'class-variance-authority';
import Link from '@ui/Link';
import { Link as ReactLink } from 'react-router-dom';
import Heading from '@ui/Heading';

const linkItem = cva('h-10 w-full hover:text-primary/80 text-sm transition-colors');
export default function HelpDocument() {
  const { t } = useTranslation();
  return (
    <div className="panel">
      <div className="mb-4 flex items-center justify-between">
        <Heading as="h5">{t('common.helpDoc')}</Heading>
        <ReactLink to="#" className="text-primary text-sm hover:opacity-80">
          {t('actions.viewMore')}
        </ReactLink>
      </div>
      <ul className="grid grid-cols-2">
        <Link href="https://tailwindcss.com/" target="_blank" className={linkItem()}>
          TailwindCSS
        </Link>
        <Link href="https://react.dev/" target="_blank" className={linkItem()}>
          React
        </Link>
        <Link href="https://vite.dev/" target="_blank" className={linkItem()}>
          Vite
        </Link>
        <Link href="https://nexus-kit.vercel.app/" target="_blank" className={linkItem()}>
          Nexus-Kit
        </Link>
      </ul>
    </div>
  );
}
