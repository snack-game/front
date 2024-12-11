import { useState } from 'react';

import Button from '@components/Button/Button';
import Spacing from '@components/Spacing/Spacing';

interface ProvocationTarget {
  name: string;
  group: string;
  profileImage: string;
}

const ProvocationSender = ({ targets }: { targets: ProvocationTarget[] }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-4xl text-primary">최고 기록 갱신!</p>
      <p>지금 바로 도발 메시지를 보내보세요</p>
      <Spacing size={2} />
      <div className="grid w-full gap-3">
        {targets.map((target) => (
          <Target key={target.name} {...target} />
        ))}
      </div>
    </div>
  );
};

const Target = ({ name, group, profileImage }: ProvocationTarget) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // TODO: 도발 전송 API 연결
  };

  return (
    <div className="flex items-center justify-between">
      <img
        src={profileImage}
        className="h-12 w-12 rounded-full"
        alt="profile image"
      />
      <div className="ml-2 flex grow flex-col justify-center leading-5">
        <p className="">{name}</p>
        <p className="text-sm text-gray-400">{group}</p>
      </div>
      <Button
        className="h-10 disabled:bg-button-disabled"
        disabled={isClicked}
        onClick={handleClick}
      >
        {isClicked ? '완료' : '전송'}
      </Button>
    </div>
  );
};

export default ProvocationSender;
