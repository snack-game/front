import { FC } from 'react';

interface InputProps {
  children?: never;
  type?: string;
  className?: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ className, placeholder }) => {
  return (
    <div className="relative mr-4 w-full xl:w-1/2">
      <label className="text-lg leading-7 text-gray-600">
        {placeholder}
        <input
          type="text"
          className="w-full rounded border border-gray-300 bg-gray-100 bg-opacity-50 px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200"
        />
      </label>
    </div>
  );
};

export default Input;
