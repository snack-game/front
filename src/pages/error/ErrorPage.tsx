import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import ErrorImage from '@assets/images/error.png';
import { FallbackProps } from '@components/base/ErrorBoundary';
import Button from '@components/Button/Button';
import SnackRainContainer from '@components/SnackRain/SnackRainContainer';

import PATH from '@constants/path.constant';

interface ErrorPageProps {
  code?: number | string;
  message?: string;
}

const ErrorPage = ({
  code = 'Error',
  message = '오류가 발생했습니다.',
}: FallbackProps & ErrorPageProps) => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Error</title>
      </Helmet>
      <SnackRainContainer />

      <div className='flex flex-col items-center gap-6'>
        <img
          className='m-auto w-20 h-20'
          src={ErrorImage}
          alt={'에러 이미지'}
        />
        <span>{message}</span>
        <Link to={PATH.MAIN}>
          <Button>돌아가기</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
