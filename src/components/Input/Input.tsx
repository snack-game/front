import { ChangeEvent } from 'react';

interface InputProps {
  fieldLabel?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  list?: string;
  valid?: boolean;
  errorMessage?: string;
}

const Input = ({
  fieldLabel,
  value,
  onChange,
  list,
  valid,
  errorMessage,
}: InputProps) => {
  return (
    <label className={'flex gap-2 text-lg'}>
      {fieldLabel}
      <div className={'flex grow flex-col gap-1'}>
        <input
          value={value}
          onChange={onChange}
          spellCheck={false}
          list={list}
          className={
            'grow rounded-lg border border-primary bg-transparent bg-white px-2 focus:outline-none'
          }
        />
        <span className={`${valid && 'invisible'} px-1 text-sm text-rose-500`}>
          {errorMessage}
        </span>
      </div>
    </label>
  );
};

export default Input;
