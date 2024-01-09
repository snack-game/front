import React, { ReactNode } from 'react';

import { motion } from 'framer-motion';

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
  md: 'px-4 py-1',
  lg: 'px-4 py-2 text-xl',
};

const buttonStyle: Record<Style, string> = {
  border:
    'ring-offset-background border border-input hover:bg-primary hover:text-white',
  fill: 'bg-primary text-white',
};

const Button = ({
  children,
  onClick,
  disabled,
  size = 'md',
  style = 'fill',
}: ButtonProps) => {
  const completeButtonClass = `${buttonSize[size]} ${buttonStyle[style]}`;

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md disabled:pointer-events-none disabled:opacity-50 ${completeButtonClass}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children ? children : 'None'}
    </motion.button>
  );
};

export default Button;
