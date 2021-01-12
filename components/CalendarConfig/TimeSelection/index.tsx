import { FC } from 'react';
import { TimePicker } from 'antd';
import { Moment } from 'moment'; // TODO: swap for date-fns/dayjs

const format = 'HH:mm';

interface IProps {
  value: Moment;
  onChange: (value: Moment) => void;
}

const Component: FC<IProps> = ({ value, onChange }) => (
  <TimePicker
    allowClear={false}
    value={value}
    format={format}
    onChange={(value) => onChange(value!)} // TimePicker set to `allowClear: false` so no chance of null value
    minuteStep={15}
  />
);

export default Component;
