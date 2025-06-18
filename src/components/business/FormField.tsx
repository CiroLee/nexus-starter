import { type FieldError } from 'react-hook-form';
import { IconAsterisk } from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import Show from '../ui/Show';

const labelField = cva('flex relative', {
  variants: {
    layout: {
      vertical: 'flex-col',
      horizontal: 'flex-row items-start'
    }
  },
  defaultVariants: {
    layout: 'vertical'
  }
});

const label = cva('flex items-center', {
  variants: {
    layout: {
      vertical: 'mb-1 gap-1',
      horizontal: 'mr-3 justify-end pt-2'
    }
  },
  defaultVariants: {
    layout: 'vertical'
  }
});

interface LabelFieldProps {
  id?: string;
  required?: boolean;
  name?: string;
  className?: string;
  hiddenLabel?: boolean;
  showError?: FieldError | undefined;
  errorMsg?: string;
  labelClassName?: string;
  layout?: 'vertical' | 'horizontal';
  children: React.ReactNode;
}
export default function FormField({ className, labelClassName, hiddenLabel, errorMsg, required, showError, id, name, layout, children }: LabelFieldProps) {
  return (
    <div className={cn(labelField({ layout, className }))}>
      <Show when={!hiddenLabel}>
        <label data-slot="form-filed-label" htmlFor={id} className={label({ layout, className: labelClassName })}>
          <Show when={required}>
            <IconAsterisk size={8} strokeWidth={4} className="text-danger" />
          </Show>
          {name}
        </label>
      </Show>
      <div className="flex-1" data-slot="form-filed-content">
        <div className="w-full">{children}</div>
        <p className={cn('text-danger invisible h-4 text-sm', { visible: showError })}>{errorMsg}</p>
      </div>
    </div>
  );
}
