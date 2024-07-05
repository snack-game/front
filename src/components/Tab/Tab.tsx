import { useState } from 'react';

export interface TabOptionType {
  name: string;
  onClick: () => void;
}

interface TabProps {
  options: TabOptionType[];
  initialOption?: number;
}

export const Tab = ({ options, initialOption }: TabProps) => {
  const [currentTab, setCurrentTab] = useState<string>(
    (initialOption && options[initialOption].name) || options[0].name,
  );

  const handleClickTab = (option: TabOptionType) => {
    setCurrentTab(option.name);
    option.onClick();
  };

  return (
    <>
      {options.map((option) => (
        <span
          className={`mr-4 cursor-pointer text-lg ${
            option.name === currentTab ? 'text-primary' : 'text-[#6B7280]'
          }`}
          key={option.name}
          onClick={() => handleClickTab(option)}
        >
          {option.name}
        </span>
      ))}
    </>
  );
};
