import ErrorImage from '@assets/images/error.png';
import { FallbackProps } from '@components/base/ErrorBoundary';
import Button from '@components/Button/Button';

const RetryError = ({ message, resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center gap-6 p-4">
      <img className="m-auto h-20 w-20" src={ErrorImage} alt={'에러 이미지'} />
      <span>{message}</span>
      <Button onClick={resetErrorBoundary}>재시도</Button>
    </div>
  );
};
export default RetryError;
