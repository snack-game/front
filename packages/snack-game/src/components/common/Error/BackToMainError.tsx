import ErrorImage from '@assets/images/error.png';
import { FallbackProps } from '@components/base/ErrorBoundary';
import Button from '@components/common/Button/Button';

import { useInternalRouter } from '@hooks/useInternalRouter';

const BackToMainError = ({ message }: FallbackProps) => {
  const { replace } = useInternalRouter();

  const handleBackToMain = () => {
    replace('/');
  };

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
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
      <Button onClick={handleBackToMain} content={'돌아가기'} />
    </div>
  );
};

export default BackToMainError;
