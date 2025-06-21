import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { IconSearch, IconPlus, IconXboxXFilled } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import AppCard from './components/AppCard';
import Empty from '@/components/business/Empty';
import { getApps } from '@/_mock/manage';
import Heading from '@ui/Heading';
import Input from '@ui/Input';
import Button from '@ui/Button';
import { cn } from '@/lib/utils';
export default function AppManagementPage() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const { data: response } = useQuery({ queryKey: ['apps'], queryFn: getApps });
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // mock search
    console.log('your search:', query);
  };
  return (
    <div>
      <Heading as="h3" className="mb-3">
        {t('menus.management.appManagement')}
      </Heading>
      <div className="mb-4 flex items-center justify-end gap-2">
        <form onSubmit={handleSearch}>
          <Input
            placeholder="search apps..."
            className="flex-1 md:min-w-60 md:flex-none"
            value={query}
            prefix={<IconSearch size={16} />}
            suffix={<IconXboxXFilled className={cn('text-description hover:text-foreground hidden', { block: query.length > 0 })} size={20} onClick={() => setQuery('')} />}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>
        <Button className="flex-nowrap gap-1">
          <span className="">Add App</span>
          <IconPlus size={16} />
        </Button>
      </div>
      {response?.data.length ? (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {response.data.map((app) => (
            <AppCard key={app.id} {...app} />
          ))}
        </div>
      ) : (
        <Empty className="top-10 min-h-40" />
      )}
    </div>
  );
}
