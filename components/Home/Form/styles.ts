import styled from 'styled-components';
import { Input as AntInput } from 'antd';

export const Wrapper = styled.div`
  background-color: darkblue;
  padding: 50px 0;
`;

export const Form = styled.form`
  margin: 0 auto;
  max-width: 460px;
`;

export const Input = styled(AntInput)`
  max-width: 400px;
  margin-right: 5px;
`;

export const Error = styled.div`
  color: red;
  text-align: left;
`;
