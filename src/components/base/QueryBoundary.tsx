import { ComponentType, ReactNode, Suspense } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';

import Loading from '@components/common/Loading/Loading';

import ErrorBoundary, { FallbackProps } from './ErrorBoundary';

interface QueryBoundaryProps {
  children: ReactNode;
  errorFallback: ComponentType<FallbackProps>;
  message?: string;
}

const QueryBoundary = ({ children, errorFallback }: QueryBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary fallback={errorFallback} onReset={reset}>
      <Suspense fallback={<Loading type={'component'} />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default QueryBoundary;
