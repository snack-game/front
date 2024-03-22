import { useState } from 'react';

import { motion } from 'framer-motion';

import DownArrow from '@assets/icon/down-arrow.svg?react';

export type DropDownOptionType = {
  name: string;
  onClick: () => void;
};

interface DropDownProps {
  options: DropDownOptionType[];
  className?: string;
  mainContent: string;
}

export default function Dropdown({
  options,
  className,
  mainContent,
}: DropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${className}`}>
      <div className={'relative'} onClick={() => setIsOpen(!isOpen)}>
        <motion.div
          className="flex cursor-pointer justify-around rounded-md bg-primary px-3 py-2 text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <p>{mainContent}</p>
          <DownArrow className={'h-6 w-6'} />
        </motion.div>
      </div>
      {isOpen && (
        <div className="absolute mt-1 min-w-[150px] divide-y-2 rounded-md border-2 border-primary bg-white">
          {options.map((option) => (
            <motion.div
              key={option.name}
              className={
                'hover:bg-brand-colo px-5 py-4 text-primary-dark hover:rounded-md hover:bg-primary hover:text-white'
              }
              onClick={option.onClick}
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
