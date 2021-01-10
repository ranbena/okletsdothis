import { FC } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment'; // TODO: swap for date-fns/dayjs

const format = 'HH:mm';

interface IProps {
  value: string;
  onChange: (selectedTime: string) => void;
}

const Component: FC<IProps> = ({ value: selectedTime, onChange }) => {
  const _onChange = (value: moment.Moment | null) => {
    value = value as moment.Moment; // TimePicker set to `allowClear: false` so no chance of null value
    onChange(value.format(format));
  };

  return (
    <TimePicker
      allowClear={false}
      value={moment(selectedTime, format)}
      format={format}
      onChange={_onChange}
      minuteStep={15}
    />
  );
};

export default Component;
