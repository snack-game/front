import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getDailyItem } from '@api/item.api';
import Button from '@components/Button/Button';

import { QUERY_KEY } from '@constants/api.constant';
import useToast from '@hooks/useToast';

const getTodayDateStr = () => {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
};

const DailyRewardBox = ({
  userId,
  lastRewarded,
}: {
  userId: number;
  lastRewarded: string | undefined;
}) => {
  const [isTodayRewarded, setIsTodayRewarded] = useState(
    () => lastRewarded?.slice(0, 10) === getTodayDateStr(),
  );

  const queryClient = useQueryClient();
  const openToast = useToast();

  const handleClick = async () => {
    const ITEM_TYPE = ['BOMB'] as const;

    try {
      await Promise.all(ITEM_TYPE.map((itemType) => getDailyItem(itemType)));

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.USER_ITEM, userId],
      });
      openToast('일일 보상을 수령했습니다.', 'success');

      setIsTodayRewarded(true);
    } catch (error) {
      openToast('보상 수령 중 오류가 발생했습니다.', 'error');
    }
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
