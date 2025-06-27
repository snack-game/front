import Spacing from '@components/Spacing/Spacing';
import DailyRewardBox from '@pages/user/components/DailyRewardBox';
import Item from '@pages/user/components/Item';

// TODO: 서버 응답으로 교체
const items = [
  {
    type: 'bomb' as const,
    count: 500,
  },
  {
    type: 'fever' as const,
    count: 2,
  },
];

const ItemSection = () => {
  return (
    <div className={'w-full bg-white px-4 py-2'}>
      <span className={`mr-4 cursor-pointer text-lg text-primary`}>
        아이템 인벤토리
      </span>
      <Spacing size={2} />
      <div className="flex gap-4">
        {items.map((item) => (
          <Item key={item.type} {...item} />
        ))}
      </div>
      <Spacing size={1.5} />
      <DailyRewardBox />
    </div>
  );
};

export default ItemSection;
