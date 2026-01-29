import { ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { isInMaintenance } from '@constants/maintenance.constant';
import PATH from '@constants/path.constant';


export const MaintenanceGuard = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const isWhitelisted = (pathname: string): boolean => {
    return (
      pathname === PATH.MAIN ||
      pathname === PATH.MAINTENANCE
    );
  };

  if (isInMaintenance() && !isWhitelisted(location.pathname)) {
    return <Navigate to={PATH.MAINTENANCE} replace />;
  }

  return <>{children}</>;
};
