import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface RouterLinkProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  to: string;
}

const RouterLink = ({
  to,
  children,
  className,
  hover = true,
}: RouterLinkProps) => {
  return (
    <Link
      className={`text-plainText flex items-center justify-center gap-0.5 text-sm font-medium underline-offset-4 transition-colors duration-200 
      ${className} 
      ${hover && 'hover:text-primary hover:underline'}
      `}
      to={to}
    >
      {children}
    </Link>
  );
};

export default RouterLink;
