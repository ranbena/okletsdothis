import { FC } from 'react';

import { ValueOf } from 'src/utils/types';
import DaysSelection from './DaysSelection';
import TimeSelection from './TimeSelection';
import OrderSelection from './OrderSelection';

import { useSchedule, Schedule } from 'src/contexts/schedule';
import { Wrapper, Settings, Setting, Label } from './styles';

const Component: FC = () => {
  const { schedule, setSchedule } = useSchedule();

  const onChange = (key: keyof Schedule) => (value: ValueOf<Schedule>) => {
    const newSchedule = { ...schedule, ...{ [key]: value } } as Schedule;
    setSchedule(newSchedule);
  };

  return (
    <Wrapper>
      <Settings>
        <Setting>
          <Label>Days:</Label>
          <DaysSelection value={schedule.days} onChange={onChange('days')} />
        </Setting>
        <Setting>
          <Label>Time:</Label>
          <TimeSelection value={schedule.startDate} onChange={onChange('startDate')} />
        </Setting>
        <Setting>
          <Label>Order:</Label>
          <OrderSelection value={schedule.ordered} onChange={onChange('ordered')} />
        </Setting>
      </Settings>
    </Wrapper>
  );
};

export default Component;
