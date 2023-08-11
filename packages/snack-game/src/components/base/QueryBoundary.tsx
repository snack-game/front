import { ComponentType, ReactNode, Suspense } from 'react';
import { useQueryErrorResetBoundary } from 'react-query';

import Loading from '@components/common/Loading';

import ErrorBoundary, { FallbackProps } from './ErrorBoundary';

interface QueryBoundaryProps {
  children: ReactNode;
  errorFallback: ComponentType<FallbackProps>;
  message?: string;
}

const QueryBoundary = ({
  children,
  errorFallback,
  message = '오류가 발생했어요',
}: QueryBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();
  return (
    <ErrorBoundary fallback={errorFallback} onReset={reset} message={message}>
      <Suspense fallback={<Loading type={'component'} />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default QueryBoundary;
