import DownArrow from '@assets/icon/down-arrow.svg?react';
import RouterLink from '@components/RouterLink/RouterLink';
import Spacing from '@components/Spacing/Spacing';

const TopBar = ({ title, backUrl }: { title: string; backUrl: string }) => {
  return (
    <>
      <div className="fixed top-0 flex h-12 w-screen items-center justify-between border-b-[1px] border-gray-200 bg-primary-light">
        <p className="absolute w-full text-center text-lg font-semibold">
          {title}
        </p>
        <RouterLink to={backUrl} className="ml-4">
          <DownArrow className="h-8 w-8 rotate-90 text-black" />
        </RouterLink>
      </div>
      <Spacing size={3} />
    </>
  );
};

export default TopBar;
