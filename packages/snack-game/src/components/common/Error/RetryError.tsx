import ErrorImage from '@assets/images/error.png';
import { FallbackProps } from '@components/base/ErrorBoundary';
import Button from '@components/common/Button/Button';

const RetryError = ({ message, resetErrorBoundary }: FallbackProps) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1rem',
      }}
    >
      <img
        css={{
          margin: 'auto',
          width: '80px',
          height: '80px',
        }}
        src={ErrorImage}
        alt={'에러 이미지'}
      />
      <span>{message}</span>
      <Button onClick={resetErrorBoundary} content={'재시도'} />
    </div>
  );
};
export default RetryError;
