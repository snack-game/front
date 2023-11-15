import React from 'react';
import { Helmet } from 'react-helmet-async';

import ErrorImage from '@assets/images/error.png';
import PageContainer from '@components/base/PageContainer';
import Button from '@components/common/Button/Button';
import SnackRainContainer from '@components/ui/SnackRain/SnackRainContainer';

import PATH from '@constants/path.constant';
import { useInternalRouter } from '@hooks/useInternalRouter';

interface ErrorPageProps {
  code?: number | string;
  message?: string;
}

const ErrorPage = ({
  code = 'Error',
  message = '오류가 발생했습니다.',
}: ErrorPageProps) => {
  const { replace } = useInternalRouter();

  const handleBackToMain = () => {
    replace(PATH.HOME);
  };

  return (
    <>
      <Helmet>
        <title>Snack Game || Code: {code}</title>
      </Helmet>
      <SnackRainContainer />
      <PageContainer>
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
      </PageContainer>
    </>
  );
};

export default ErrorPage;
