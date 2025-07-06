import Spacing from '@components/Spacing/Spacing';
import DailyRewardBox from '@pages/user/components/DailyRewardBox';
import Item from '@pages/user/components/Item';

import { useGetUserItem } from '@hooks/queries/item.query';

const ItemSection = ({ userId }: { userId: number }) => {
  const { data: items } = useGetUserItem(userId);

  return (
    <div className={'w-full bg-white px-4 py-2'}>
      <span className={`mr-4 cursor-pointer text-lg text-primary`}>
        아이템 인벤토리
      </span>
      <Spacing size={2} />
      <div className="flex gap-4">
        {items.map(({ type, count }) => (
          <Item key={type} type={type} count={count} />
        ))}
      </div>
      <Spacing size={1.5} />
      <DailyRewardBox />
    </div>
  );
};

export default ItemSection;
