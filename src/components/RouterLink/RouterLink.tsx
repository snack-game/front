import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface RouterLinkProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  to: string;
  onClick?: () => void;
  isActivated?: boolean;
}

const RouterLink = ({
  to,
  children,
  className,
  hover = true,
  onClick,
  isActivated = false,
}: RouterLinkProps) => {
  return (
    <Link
      className={`flex font-medium underline-offset-4 transition-colors duration-200 
      ${className} 
      ${
        hover &&
        'hover:border-b-2 hover:border-b-primary hover:font-bold hover:text-primary'
      }
      ${isActivated ? 'text-primary' : 'text-gray-400'}
      `}
      to={to}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default RouterLink;
