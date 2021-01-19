import { FC } from 'react';
import { Switch } from 'antd';

const format = 'HH:mm';

interface IProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const Component: FC<IProps> = ({ value, onChange }) => {
  return (
    <Switch
      checkedChildren="Normal"
      unCheckedChildren="Random"
      checked={value}
      onChange={onChange}
    />
  );
};

export default Component;
