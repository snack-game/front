import React, { ReactNode } from 'react';

type Size = 'md' | 'lg';

type Style = 'border' | 'fill';

export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: Size;
  style?: Style;
}

const buttonSize: Record<Size, string> = {
  md: 'px-2 py-1',
  lg: 'px-4 py-2 text-xl',
};

const buttonStyle: Record<Style, string> = {
  border:
    'ring-offset-background border border-input hover:bg-orange-400 hover:text-white',
  fill: 'bg-orange-400 text-white',
};

const Button = ({
  children,
  onClick,
  disabled,
  size = 'md',
  style = 'border',
}: ButtonProps) => {
  const completeButtonClass = `${buttonSize[size]} ${buttonStyle[style]}`;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full transition-transform duration-200 hover:scale-105 disabled:pointer-events-none disabled:opacity-50 ${completeButtonClass}`}
    >
      {children ? children : 'None'}
    </button>
  );
};

export default Button;
