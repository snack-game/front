import React, { FC } from 'react';

import tw from 'tailwind-styled-components';

interface ButtonProps {
  children?: never;
  className?: string;
  content: string;
  onClick: any;
}

const StyledButton = tw.button`
inline-flex text-white bg-red-500 border-0 py-2 px-6 rounded text-lg
hover:bg-red-600
focus:outline-none 
`;

const Button: FC<ButtonProps> = ({ content, className, onClick }) => {
  return (
    <StyledButton className={className} onClick={onClick}>
      {content}
    </StyledButton>
  );
};

export default Button;
