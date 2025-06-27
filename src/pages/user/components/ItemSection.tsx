import Button from '@components/Button/Button';
import Spacing from '@components/Spacing/Spacing';
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

const DailyRewardBox = () => {
  return (
    <div className="flex h-[46px] items-center justify-between">
      <div className="text-md flex flex-col">
        매일 모든 아이템을 한 개씩 드려요!
        <span className="text-sm text-[#6B7280]">
          정책에 따라 수령 방식이 달라질 수 있어요.
        </span>
      </div>

      <Button className="h-full">일일 보상 받기</Button>
    </div>
  );
};

export default ItemSection;
