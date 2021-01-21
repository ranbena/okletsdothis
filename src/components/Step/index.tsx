import { FC, PropsWithChildren } from 'react';

import { Wrapper, Count, Title, Content } from './styles';

interface IProps {
  title: string | React.ReactElement;
  count: number;
}

const Step: FC<PropsWithChildren<IProps>> = ({ count, title, children }) => {
  return (
    <Wrapper>
      <Count>Step {count}:</Count>
      <Title>{title}</Title>
      <Content>{children}</Content>
    </Wrapper>
  );
};

export default Step;
