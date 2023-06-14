import { FC } from 'react';

interface InputProps {
  children?: never;
  type?: string;
  className?: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ className, placeholder }) => {
  return (
    <div className="relative mr-4 md:w-full lg:w-full xl:w-1/2 w-2/4">
      <label htmlFor="hero-field" className="leading-7 text-lg text-gray-600">
        {placeholder}
      </label>
      <input
        type="text"
        id="hero-field"
        name="hero-field"
        className="w-full bg-gray-100 rounded border bg-opacity-50 border-gray-300 focus:ring-2 focus:ring-red-200 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      />
    </div>
  );
};

export default Input;
