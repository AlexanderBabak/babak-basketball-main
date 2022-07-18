import { FC, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

interface IProps {
  error: string | undefined;
}

export const Notification: FC<IProps> = ({ error }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) setVisible(true);
    const timeout = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  if (!visible || !error) return null;
  return <Wrapper onClick={() => setVisible(false)}>{error}</Wrapper>;
};

const animate = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }

  100% {
    transform: translateX(0%);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  background: ${({ theme }) => theme.colors.lightRed};
  border-radius: 4px;
  color: white;
  box-shadow: 0px 0px 8px -2px rgba(34, 60, 80, 0.19);
  padding: 8px 16px;
  z-index: 500;
  font-size: 16px;
  right: 50px;
  top: 50px;
  animation: ${animate} 0.5s ease-out;
`;
