'use client';

import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

export default function Calendar() {
  const [selected, setSelected] = useState<Date>();
  const today = new Date();

  return (
    <div className="p-4 md:p-5 lg:p-8">
      <DayPicker
        mode="single"
        locale={ko}
        selected={selected}
        navLayout="around"
        onSelect={setSelected}
        disabled={{ after: today }}
        classNames={{
          today: 'text-green-600',
          chevron: 'mb-6 md:mb-4',
          caption_label:
            'flex justify-center items-center mb-6 text-base font-semibold md:mb-4 md:text-xl',
          day_button:
            'flex justify-center items-start text-xs p-2 w-17 h-15 rounded-md hover:bg-gray-100 transition-colors md:text-xl md:w-19 md:h-17 lg:w-24 lg:h-22 lg:text-xl',
        }}
      />
    </div>
  );
}
