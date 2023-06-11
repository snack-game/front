import { FC } from "react";

interface MainPageProps {
  children?: never;
}

const MainPage: FC<MainPageProps> = () => {
  return (
    <div>
      <div className='text-red-500'>Hello</div>
    </div>
  );
};

export default MainPage;
