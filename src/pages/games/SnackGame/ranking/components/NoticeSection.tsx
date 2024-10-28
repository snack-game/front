import { useNavigate } from 'react-router-dom';

import NoticeIcon from '@assets/icon/notice.svg?react';

import { NOTICES } from '@constants/notice.constant';
import PATH from '@constants/path.constant';

export const NoticeSection = () => {
  const navigate = useNavigate();

  if (NOTICES.length === 0) return;
  return (
    <div
      className="flex items-center gap-2 rounded-md border border-primary px-3 py-2"
      onClick={() => navigate(PATH.NOTICE)}
    >
      <NoticeIcon className="h-[16px] w-[16px] shrink-0 text-primary" />
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary-deep-dark">
        {NOTICES[0].description}
      </p>
    </div>
  );
};
