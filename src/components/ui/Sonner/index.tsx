import { Toaster as SonnerToaster, type ToasterProps } from 'sonner';
import { useTheme } from '@/hooks';
export default function Toaster() {
  const [theme] = useTheme();
  return <SonnerToaster richColors duration={3000} theme={theme as ToasterProps['theme']} style={{ '--normal-bg': 'var(--background)', '--normal-border': 'var(--line)' } as React.CSSProperties} />;
}
