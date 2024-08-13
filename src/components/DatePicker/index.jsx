import { Button } from '@components/ui/button';
import { Calendar } from '@components/Calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { cn } from '@lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FormControl } from '@components/ui/form';
import { forwardRef, useEffect, useState } from 'react';

export const DatePicker = forwardRef(({ ...props }, ref) => {
  const [selectedDate, setSelectedDate] = useState(props.value || null);

  useEffect(() => {
    if (props.value) {
      setSelectedDate(props.value);
    }
  }, [props.value]);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !props.value && 'text-muted-foreground',
              props.className,
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {props.value ? (
              format(props.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selectedDate}
          onSelect={(e) => {
            setSelectedDate(e);
            props.onChange(e);
          }}
          fromYear={1930}
          toYear={2030}
        />
      </PopoverContent>
    </Popover>
  );
});

DatePicker.displayName = 'DatePicker';
