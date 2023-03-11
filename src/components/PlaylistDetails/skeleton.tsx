import { FC } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import { SkeletonImage, Text, Content, Title, List } from './styles';

const Component: FC = () => (
  <SkeletonTheme baseColor="#8de4af" highlightColor="#8adcaa">
    <Title>
      <Skeleton />
    </Title>
    <Content>
      <SkeletonImage />
      <Text>
        <Skeleton />
        <List>
          <Skeleton count={20} />
        </List>
      </Text>
    </Content>
  </SkeletonTheme>
);

export default Component;
