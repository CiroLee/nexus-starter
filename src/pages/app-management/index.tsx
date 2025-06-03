import AppCard from './components/AppCard';
import { useQuery } from '@tanstack/react-query';
import { AppsRes, getApps } from '@/_mock/manage';
import type { Response } from '@/types/response';
export default function AppManagementPage() {
  const { data: response } = useQuery<Response<AppsRes[]>>({ queryKey: ['apps'], queryFn: getApps });
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{response?.data.map((app) => <AppCard key={app.id} {...app} />)}</div>
    </div>
  );
}
