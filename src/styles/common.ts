import styled, { css } from 'styled-components';

export const ColoredIcon = styled.span<{ color: string }>`
  color: transparent;
  text-shadow: 0 0 0 ${(p) => p.color};
`;

export const Back = styled.a`
  position: relative;
  top: -10px;

  .anticon {
    margin-right: 5px;
  }
`;

export const Continue = styled.span<{ onClick?: Function }>`
  ${({ onClick }) =>
    onClick
      ? css`
          cursor: pointer;
          color: ${({ theme }) => theme.colors.text};
        `
      : css`
          color: ${({ theme }) => theme.colors.link};
        `}
  display: grid;
  padding-top: 30px;
  margin: 30px auto;
  overflow: hidden; // so .anticon doesn't overflow
  width: fit-content;
  font-weight: bold;

  .anticon {
    transform: scaleX(1.8);
    font-size: 30px;
    margin-top: 5px;
    display: ${({ onClick }) => (onClick ? 'block' : 'none')};
  }
`;

export const Step = styled.div`
  /* text-align: center; */
`;
