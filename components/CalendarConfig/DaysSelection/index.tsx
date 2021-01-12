import { FC } from 'react';
import { Weekday, RRule, WeekdayStr } from 'rrule';

const { SU, MO, TU, WE, TH, FR, SA } = RRule;

const ALL_WEEKDAYS: WeekdayStr[] = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

const dayNames: Record<WeekdayStr, string> = {
  SU: 'Sun',
  MO: 'Mon',
  TU: 'Tue',
  WE: 'Wed',
  TH: 'Thu',
  FR: 'Fri',
  SA: 'Sat',
};

interface IProps {
  value: Weekday[];
  onChange: (value: Weekday[]) => void;
}

const Component: FC<IProps> = ({ value: selectedDays, onChange }) => {
  const _onChange = (day: Weekday, value: boolean) => {
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
      {ALL_WEEKDAYS.map((day) => {
        const isSelected = selectedDays.includes(RRule[day]);
        return (
          <label key={day}>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => _onChange(RRule[day], !isSelected)}
            />
            {dayNames[day]}{' '}
          </label>
        );
      })}
    </span>
  );
};

export default Component;
