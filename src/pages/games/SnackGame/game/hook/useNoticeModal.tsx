import Button from '@components/Button/Button';

import { KEY_LAST_NOTICE_INFO } from '@constants/localStorage.constant';
import useModal from '@hooks/useModal';

// notice_YYYYMMDD_keyword(_version)
const CURRENT_ID = 'notice_20250608_keyword';

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
      <div className="flex-grow">notice content</div>
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
