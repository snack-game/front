import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import ErrorImage from '@assets/images/error.png';
import { FallbackProps } from '@components/base/ErrorBoundary';
import Button from '@components/Button/Button';
import SnackRainContainer from '@components/SnackRain/SnackRainContainer';

import PATH from '@constants/path.constant';

const ErrorPage = ({ error }: FallbackProps) => {
  return (
    <>
      <Helmet>
        <title>Snack Game || Error</title>
      </Helmet>
      <SnackRainContainer />

      <div className="flex h-screen w-screen flex-col items-center justify-center gap-6">
        <img className="h-20 w-20" src={ErrorImage} alt={'에러 이미지'} />
        <span>{error ? `[${error.code}: ${error.message}` : ''}</span>
        <Link to={PATH.MAIN}>
          <Button>돌아가기</Button>
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
