import { cva } from 'class-variance-authority';

const labelField = cva('grid relative gap-2', {
  variants: {
    layout: {
      vertical: 'grid-rows-[1fr_auto]',
      horizontal: 'grid-cols-[1fr_3fr]'
    }
  },
  defaultVariants: {
    layout: 'vertical'
  }
});

interface LabelFieldProps {
  id?: string;
  className?: string;
  label: string;
  layout?: 'horizontal' | 'vertical';
  children: React.ReactNode;
}
export default function LabelField({ id, className, label, layout, children }: LabelFieldProps) {
  return (
    <div className={labelField({ layout, className })}>
      <label htmlFor={id} className="flex items-center text-sm">
        {label}
      </label>
      <div className="flex-1">{children}</div>
    </div>
  );
}
