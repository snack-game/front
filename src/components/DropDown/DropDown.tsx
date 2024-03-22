import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

import DownArrow from '@assets/icon/down-arrow.svg?react';

export type DropDownOptionType = {
  name: string;
  onClick: () => void;
  value?: string | number;
};

interface DropDownProps {
  options: DropDownOptionType[];
  className?: string;
  initalOption?: number;
}

export default function Dropdown({
  options,
  className,
  initalOption,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mainContentState, setMainContentState] = useState<string>(
    (initalOption && options[initalOption].name) || options[0].name,
  );

  const handleClickOption = (option: DropDownOptionType) => {
    setMainContentState(option.name);
    option.onClick();
    setIsOpen(false);
  };

  return (
    <div className={className}>
      <div className="relative" onClick={() => setIsOpen(!isOpen)}>
        <motion.div
          className="flex cursor-pointer justify-around rounded-md bg-primary px-3 py-2 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p>{mainContentState}</p>
          <DownArrow className="h-6 w-6" />
        </motion.div>
      </div>
      {isOpen && (
        <div className="absolute mt-1 min-w-[150px] divide-y-2 rounded-md border-2 border-primary bg-white">
          {options.map((option) => (
            <motion.div
              key={option.name}
              className="hover:bg-brand-colo px-5 py-4 text-primary-dark hover:rounded-md hover:bg-primary hover:text-white"
              onClick={() => handleClickOption(option)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {option.name}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
