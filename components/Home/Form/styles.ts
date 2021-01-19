import styled from 'styled-components';
import { Input as AntInput, Button } from 'antd';
import { WarningOutlined, LoadingOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  background-color: #5cdb94;
  text-align: center;
  height: 370px;
  position: relative;
`;

export const Content = styled.div<{ $submitting: boolean }>`
  transition: opacity 0.2s linear;
  opacity: ${(p) => (p.$submitting ? 0 : 1)};
`;

export const Form = styled.form`
  margin: 10px auto 0;
  max-width: 460px;
`;

export const Input = styled(AntInput)`
  max-width: 400px;
  margin-right: 5px;
`;

export const Error = styled.div`
  color: red;
  text-align: left;
  height: 22px;
  margin-top: 3px;
`;

export const ErrorIcon = styled(WarningOutlined)`
  margin-right: 5px;

  svg {
    height: 12px;
    margin-bottom: 1px;
  }
`;

export const SubmitButton = styled(Button).attrs({
  htmlType: 'submit',
  size: 'large',
})`
  &,
  &:hover,
  &:active,
  &:focus {
    background-color: #05396b;
    color: white;
    border-color: rgba(0, 0, 0, 0.06);
    box-shadow: none;
  }

  &:active {
    background-color: #011931;
  }

  &:active > span {
    position: relative;
    top: 1px;
  }
`;

export const Spinner = styled(LoadingOutlined).attrs({
  spin: true,
})`
  position: absolute;
  top: calc(50% - 22px);
  left: calc(50% - 22px);
  font-size: 44px;
`;
