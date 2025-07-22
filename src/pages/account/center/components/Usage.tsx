import Progress from '@ui/Progress';
import SvgIcon from '@ui/SvgIcon';
import Show from '@ui/Show';
export default function Usage() {
  return (
    <div className="space-y-8 md:max-w-150">
      <ProgressBar name="Docker images" icon="docker" percent={20} total={10} usage={2} />
      <ProgressBar name="ClaudeAI Tokens" icon="claude-ai" percent={60} total="400M" usage="1K" />
      <ProgressBar name="OSS" percent={10} total="10G" usage="1.2G" />
    </div>
  );
}

interface ProgressBarProps {
  className?: string;
  name: string;
  icon?: string;
  percent: number;
  total: string | number;
  usage: string | number;
}
function ProgressBar({ className, name, icon, percent, total, usage }: ProgressBarProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-center justify-between font-semibold">
        <div className="flex items-center gap-2">
          <Show when={icon}>
            <SvgIcon name={icon!} size={26} />
          </Show>
          <span>{name}</span>
        </div>
        <p>
          {usage} / {total}
        </p>
      </div>
      <Progress size="sm" striped value={percent} />
    </div>
  );
}
