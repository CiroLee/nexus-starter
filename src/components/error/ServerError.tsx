import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Heading from '@ui/Heading';
import Button from '@ui/Button';
import Show from '@ui/Show';
import { cn } from '@/lib/utils';
import img500 from '@/assets/images/500.svg';

export default function ServerError({ description, className }: { className?: string; description?: string }) {
  const { t } = useTranslation();
  return (
    <div className={cn('flex size-full flex-col items-center justify-center', className)}>
      <Heading as="h1" className="mb-5 text-6xl">
        500
      </Heading>
      <Show when={description}>
        <p className="text-description mb-12">{description}</p>
      </Show>
      <img src={img500} alt="500 server error" width={300} height={300} className="mb-12 size-70" />
      <Button asChild>
        <Link to="/">{t('common.backHome')}</Link>
      </Button>
    </div>
  );
}
