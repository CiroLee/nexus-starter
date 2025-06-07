import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface SvgIconProps {
  size?: number | string;
  name: string;
  className?: string;
  style?: React.CSSProperties;
}
export default function SvgIcon({ name, size = '1em', className, style, ...props }: SvgIconProps) {
  const [svg, setSvg] = useState<string>('');
  const iconSize =
    typeof size === 'number'
      ? {
          '--icon-size': `${size}px`
        }
      : { '--icon-size': size };
  const getPath = async (name: string) => {
    const { default: svg } = await import(`@/assets/icons/${name}.svg?raw`);
    setSvg(svg);
  };

  useEffect(() => {
    getPath(name);
  }, [name]);

  return <i dangerouslySetInnerHTML={{ __html: svg }} className={cn('[&_svg]:size-(--icon-size)', className)} style={{ ...iconSize, ...style }} {...props} />;
}
