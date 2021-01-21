import styled, { css } from 'styled-components';
import { Input as AntInput, Button } from 'antd';
import { WarningOutlined, CloseCircleOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
`;

const focusOutline = css`
  &:focus {
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const Input = styled(AntInput).attrs({
  allowClear: true,
  autoFocus: true,
})`
  max-width: 400px;
  margin-right: 5px;
  height: 56px;
  border: none;

  input {
    font-size: 17px;
    color: ${({ theme }) => theme.colors.text};
    ${focusOutline}

    ::placeholder {
      color: ${({ theme }) => theme.colors.link};
      opacity: 0.7;
      font-size: 21px;
      font-style: italic;
    }
  }
`;

export const Hint = styled.div<{ $error: boolean }>`
  color: ${({ theme, $error }) => ($error ? theme.colors.error : theme.colors.link)};
  text-align: left;
  height: 22px;
  margin-top: 8px;
  font-size: 12.7px;
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
  font-family: Carter One;
  height: 56px;
  font-size: 21px;
  transition-duration: 0.1s;
  ${focusOutline}

  &,
  &:hover,
  &:active,
  &:focus {
    background-color: ${({ theme }) => theme.colors.text};
    color: ${({ theme }) => theme.colors.light};
    border-color: rgba(0, 0, 0, 0.06); // TODO: swap this color for theme
  }

  &:active {
    background-color: #011931; // TODO: swap this color for theme
  }

  &:active > span {
    position: relative;
    top: 1px;
  }

  &.ant-btn.ant-btn-loading:before {
    background-color: ${({ theme }) => theme.colors.bg};
  }
`;

export const ClearIcon = styled(CloseCircleOutlined)``;

export const Placeholder = styled.span`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
