import { FC } from 'react';
import { Days } from '../types';

const allDays: Days[] = [0, 1, 2, 3, 4, 5, 6];

const dayNames: Record<Days, string> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

interface IProps {
  value: Days[];
  onChange: (days: Days[]) => void;
}

const Component: FC<IProps> = ({ value: selectedDays, onChange }) => {
  const _onChange = (day: Days, value: boolean) => {
    const days = [...selectedDays];
    if (value) {
      // add
      days.push(day);
    } else {
      // remove
      const idx = days.indexOf(day);
      if (idx > -1) {
        days.splice(idx, 1);
      }
    }
    onChange(days);
  };

  return (
    <span>
      {allDays.map((day) => {
        const isSelected = selectedDays.includes(day);
        return (
          <label key={day}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => _onChange(day, !isSelected)}
            />
            {dayNames[day]}{' '}
          </label>
        );
      })}
    </span>
  );
};

export default Component;
