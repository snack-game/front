import React from 'react';


export interface ButtonProps {
  className?: string;
  content?: string;
  onClick?: () => void;
  disabled?: boolean;
  show?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: 'black' | 'white';
}

const Button = ({
  content,
  onClick,
  disabled,
  size = 'medium',
  show = true,
  color,
  text = 'white',
}: ButtonProps) => {
  return (
    <div className={'bg-amber-400'}>
      <button
        onClick={onClick}
        disabled={disabled}
      >
        {content}
      </button>
    </div>
  );
};

export default Button;
