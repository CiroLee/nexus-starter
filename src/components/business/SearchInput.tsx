import React, { useState } from 'react';
import Input from '../ui/Input';
import { IconSearch, IconXboxXFilled } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

interface SearchInputProps extends Omit<React.ComponentPropsWithRef<typeof Input>, 'value'> {
  value?: string;
}
export default function SearchInput({ className, value = '', onChange, ...props }: SearchInputProps) {
  const [query, setQuery] = useState(value);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onChange?.(e);
  };
  return (
    <Input
      className={className}
      value={query}
      prefix={<IconSearch size={16} />}
      suffix={<IconXboxXFilled className={cn('text-description hover:text-foreground hidden', { block: query.length > 0 })} size={20} onClick={() => setQuery('')} />}
      onChange={handleOnChange}
      {...props}
    />
  );
}
