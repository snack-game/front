import { Helmet } from 'react-helmet-async';

import MainAvifImage from '@assets/images/main.avif';
import MainWebpImage from '@assets/images/main.webp';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';
import Spacing from '@components/Spacing/Spacing';

import PATH from '@constants/path.constant';

const ServiceMaintenancePage = () => {
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
              서비스 점검 안내
            </h1>
            <p className="whitespace-pre-line text-base text-gray-600">
              더 나은 서비스 제공을 위해{'\n'}시스템 점검을 진행하고 있습니다.
            </p>
          </div>

          <Spacing size={2} />

          <div className="w-full max-w-md rounded-lg border bg-white p-6">
            <ul className="space-y-3 text-left">
              <li className="text-sm text-gray-700">
                <span className="font-semibold">점검 일시:</span> 2025. 10. 28
                (화)~ 별도 안내 시까지
              </li>
              <li className="text-sm text-gray-700">
                <span className="font-semibold">점검 영향:</span> 게임, 랭킹,
                마이 페이지 등 서비스 전체 이용 불가
              </li>
              <li className="text-sm text-gray-500">
                * 변동 사항이 있을 경우{' '}
                <a
                  href={PATH.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-primary underline"
                >
                  공식 SNS
                </a>
                를 통해 안내해 드리겠습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceMaintenancePage;
