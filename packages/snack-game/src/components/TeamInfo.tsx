import { FC } from 'react';

interface TeamInfoProps {
  children?: never;
}

const TeamInfo: FC<TeamInfoProps> = () => {
  return (
    <div className="px-5 pt-48 pb-24 mx-auto">
      <div className="flex flex-col text-center w-full mb-10">
        <h1 className="text-2xl font-medium title-font text-gray-900">
          OUR TEAM
        </h1>
      </div>
      <div className="flex justify-center flex-wrap -m-4">
        <div className="p-4 lg:w-[300px] md:w-1/2">
          <div className="h-full flex flex-col items-center text-center">
            <img
              alt="dev-dong-su"
              className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
              src="https://avatars.githubusercontent.com/u/16986867?v=4"
            />
            <div className="w-full">
              <h2 className="title-font font-medium text-lg text-gray-900">
                dev-dong-su
              </h2>
              <h3 className="text-gray-500 mb-3">Front-End, Game Developer</h3>
              <p className="mb-4 whitespace-pre">
                {
                  '긍정적으로 생각하기 좋아하고\n작은 일에서 행복을 찾는 삶을좋아합니다.'
                }
              </p>
              <span className="inline-flex">
                <a
                  className="text-gray-500"
                  href={'https://github.com/dev-dong-su'}
                >
                  <svg className="w-10 h-8" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 lg:w-[300px] md:w-1/2">
          <div className="h-full flex flex-col items-center text-center">
            <img
              alt="team"
              className="flex-shrink-0 rounded-lg w-full h-56 object-cover object-center mb-4"
              src="https://avatars.githubusercontent.com/u/39221443?v=4"
            />
            <div className="w-full">
              <h2 className="title-font font-medium text-lg text-gray-900">
                0chil
              </h2>
              <h3 className="text-gray-500 mb-3">Back-End Developer</h3>
              <p className="mb-4 whitespace-pre">
                {'하나의 목적으로 움직이는 팀을\n만들고자 합니다.'}
              </p>
              <span className="inline-flex">
                <a className="text-gray-500">
                  <a
                    className="text-gray-500"
                    href={'https://github.com/0chil'}
                  >
                    <svg className="w-10 h-8" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
