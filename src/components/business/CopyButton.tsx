import { useRef, useState } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import Button from '../ui/Button';
import { copyToClipboard } from '@/utils/utils';
import Show from '../ui/Show';

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  text: string;
}
export default function CopyButton({ text, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(null);
  const handleCopy = () => {
    copyToClipboard(text).then(() => setCopied(true));
    timer.current = setTimeout(() => {
      setCopied(false);
      if (timer.current) {
        clearTimeout(timer.current);
      }
    }, 1000);
  };
  return (
    <Button size="sm" colors="neutral" asIcon variant="light" {...props} onClick={handleCopy}>
      <Show when={copied} fallback={<IconCopy size={16} />}>
        <IconCheck size={16} />
      </Show>
    </Button>
  );
}
