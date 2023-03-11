import { createContext, FC, useContext, useState } from 'react';
import { Weekday } from 'rrule';
import { Moment } from 'moment';
import { defaultSchedule } from 'src/utils/constants';

export type Schedule = {
  days: Weekday[];
  startDate: Moment;
  ordered: boolean;
};

type ScheduleContext = {
  schedule: Schedule;
  setSchedule: (value: Schedule) => void;
};

const defaultContext: ScheduleContext = {
  schedule: defaultSchedule,
  setSchedule: () => {},
};

const ScheduleContext = createContext<ScheduleContext>(defaultContext);

export const ScheduleProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const schedule = useProvideSchedule();
  return <ScheduleContext.Provider value={schedule}>{children}</ScheduleContext.Provider>;
};

export const useSchedule = () => {
  return useContext(ScheduleContext);
};

function useProvideSchedule(): ScheduleContext {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);

  return {
    schedule,
    setSchedule,
  };
}
