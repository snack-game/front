import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';

import MainAvifImage from '@assets/images/main.avif';
import MainWebpImage from '@assets/images/main.webp';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';
import Spacing from '@components/Spacing/Spacing';

import {
  MAINTENANCE_START,
  MAINTENANCE_END,
  isInMaintenance,
} from '@constants/maintenance.constant';
import PATH from '@constants/path.constant';

const ServiceMaintenancePage = () => {
  const { t } = useTranslation('maintenance');

  if (!isInMaintenance()) {
    return <Navigate to={PATH.MAIN} replace />;
  }

  return (
    <>
      <Helmet>
        <title>Snack Game || 점검 중</title>
      </Helmet>
      <div className="flex min-h-screen flex-col items-center justify-center bg-primary-light p-6">
        <div className="flex flex-col items-center">
          <ImageWithFallback
            sources={[
              { srcSet: MainAvifImage, type: 'avif' },
              { srcSet: MainWebpImage, type: 'webp' },
            ]}
            src={MainWebpImage}
            alt="Snack Game Character"
            className="h-48 w-48"
          />

          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-primary-deep-dark">
              {t('title')}
            </h1>
            <p className="whitespace-pre-line text-base text-gray-600">
              {t('description')}
            </p>
          </div>

          <Spacing size={2} />

          <div className="w-full max-w-md rounded-lg border bg-white p-6">
            <ul className="space-y-3 text-left">
              <li className="text-sm text-gray-700">
                <span className="font-semibold">{t('maintenance_time')}:</span>{' '}
                {`${MAINTENANCE_START.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} ~ ${MAINTENANCE_END.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} (KST)`}
              </li>
              <li className="text-sm text-gray-700">
                <span className="font-semibold">
                  {t('maintenance_impact')}:
                </span>{' '}
                {t('impact_details')}
              </li>
              <li className="text-sm text-gray-500">
                * {t('notice')}{' '}
                <a
                  href={PATH.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-primary underline"
                >
                  {t('official_sns')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceMaintenancePage;
