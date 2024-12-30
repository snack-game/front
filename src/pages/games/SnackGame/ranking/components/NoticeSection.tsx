import { useNavigate } from 'react-router-dom';

import NoticeIcon from '@assets/icon/notice.svg?react';

import PATH from '@constants/path.constant';
import { useGetNotices } from '@hooks/queries/notice.query';

export const NoticeSection = () => {
  const navigate = useNavigate();
  const noticeTitles = useGetNotices();

  return (
    <div
      className="flex items-center gap-2 rounded-md border border-primary px-3 py-2"
      onClick={() => navigate(PATH.NOTICE)}
    >
      <NoticeIcon className="h-[16px] w-[16px] shrink-0 text-primary" />
      <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-primary-deep-dark">
        {noticeTitles[noticeTitles.length - 1].textContent}
      </p>
    </div>
  );
};
