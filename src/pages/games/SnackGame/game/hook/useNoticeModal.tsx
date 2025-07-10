import BombImage from '@assets/images/bomb.avif';
import BombWebpImage from '@assets/images/bomb.webp';
import Button from '@components/Button/Button';
import ImageWithFallback from '@components/ImageWithFallback/ImageWithFallback';

import { KEY_LAST_NOTICE_INFO } from '@constants/localStorage.constant';
import useModal from '@hooks/useModal';

// notice_YYYYMMDD_keyword(_version)
const CURRENT_ID = 'notice_20250710_bomb';

const Notice = () => {
  const { closeModal } = useModal();

  const hideForToday = () => {
    const ONE_DAY = 24 * 60 * 60 * 1000;

    localStorage.setItem(
      KEY_LAST_NOTICE_INFO,
      JSON.stringify({
        id: CURRENT_ID,
        hideUntil: new Date(Date.now() + ONE_DAY),
      }),
    );
    closeModal();
  };

  return (
    <div className={'flex w-full flex-grow flex-col justify-between gap-4'}>
      <div className="flex flex-grow flex-col items-center justify-center gap-6 text-center">
        <ImageWithFallback
          sources={[{ srcSet: BombImage, type: 'avif' }]}
          src={BombWebpImage}
          alt="폭탄 아이템"
          className="h-16 w-16"
        />
        <h3 className="text-lg font-bold">폭탄 아이템 출시!</h3>
        <p className="text-md leading-relaxed text-gray-600">
          스낵을 빠르게 제거할 수 있는 아이템이 출시되었어요! 사용법은{' '}
          <span className="font-semibold text-primary">
            프로필 → 설정 → 공지사항
          </span>
          에서 확인해 주세요.
        </p>
      </div>
      <div className="flex w-full justify-between gap-2 md:justify-evenly">
        <Button
          onClick={hideForToday}
          size={'lg'}
          style={'border'}
          className="text-md"
        >
          하루 동안 숨기기
        </Button>
        <Button onClick={closeModal} size={'lg'} className="text-md">
          닫기
        </Button>
      </div>
    </div>
  );
};

export const useNoticeModal = () => {
  const { openModal } = useModal();

  const isNoticeHidden = () => {
    const lastNotice = localStorage.getItem(KEY_LAST_NOTICE_INFO);
    const { id, hideUntil } = lastNotice ? JSON.parse(lastNotice) : {};

    return id === CURRENT_ID && new Date(hideUntil) > new Date();
  };

  const openNoticeModal = () => {
    if (isNoticeHidden()) return;

    openModal({
      children: <Notice />,
    });
  };

  return { openNoticeModal };
};
