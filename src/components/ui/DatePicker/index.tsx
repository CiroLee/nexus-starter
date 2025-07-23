import { useState } from 'react';
import { IconCalendar } from '@tabler/icons-react';
import { Popover } from '../Popover';
import Button from '../Button';
import CardCalendar from '../CardCalendar';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  defaultValue?: Date | string | number;
  className?: string;
  placeholder?: string;
  onValueChange?: (value: Date) => void;
}
export default function DatePicker({ className, placeholder, defaultValue, onValueChange, ...props }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(transDateToLocale(defaultValue));
  const handleCalendarChange = (value: Date) => {
    setValue(transDateToLocale(value));
    onValueChange?.(value);
    setOpen(false);
  };
  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      hiddenArrow
      className="origin-center"
      align="start"
      trigger={
        <Button colors="neutral" variant="bordered" className={cn('min-w-30 justify-between px-2.5 text-sm', { 'text-description justify-end': !value }, className)}>
          {value ? value : placeholder}
          <IconCalendar className="text-description" size={18} />
        </Button>
      }
      {...props}>
      <CardCalendar className="border-none p-0" value={value ? new Date(value) : undefined} onValueChange={handleCalendarChange} />
    </Popover>
  );
}

function transDateToLocale(date?: Date | string | number) {
  const _date = date instanceof Date ? date : date ? new Date(date) : undefined;
  return _date ? _date.toLocaleDateString() : '';
}
