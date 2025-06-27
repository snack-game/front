import { useState } from 'react';

import Button from '@components/Button/Button';

import { KEY_LAST_REWARDED_DATE } from '@constants/localStorage.constant';

const getTodayDateStr = () => {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
};

const DailyRewardBox = () => {
  const [isTodayRewarded, setIsTodayRewarded] = useState(
    () => localStorage.getItem(KEY_LAST_REWARDED_DATE) === getTodayDateStr(),
  );

  const handleClick = async () => {
    // TODO: 아이템별 지급 api 요청
    // 아이템 조회 api 재호출
    // 수령 여부에 따라 적절한 toast 띄우기

    localStorage.setItem(KEY_LAST_REWARDED_DATE, getTodayDateStr());
    setIsTodayRewarded(true);
  };

  return (
    <div className="flex h-[46px] items-center justify-between">
      <div className="text-md flex flex-col">
        매일 모든 아이템을 한 개씩 드려요!
        <span className="text-sm text-[#6B7280]">
          정책에 따라 수령 방식이 달라질 수 있어요.
        </span>
      </div>

      <Button
        className="h-full"
        onClick={handleClick}
        disabled={isTodayRewarded}
      >
        {isTodayRewarded ? '수령 완료' : '일일 보상 받기'}
      </Button>
    </div>
  );
};

export default DailyRewardBox;
