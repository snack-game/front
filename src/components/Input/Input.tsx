import { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface InputProps {
  fieldLabel?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  dataListId?: string;
  valid?: boolean;
  errorMessage?: string;
}

const Input = ({
  fieldLabel,
  value,
  onChange,
  dataListId,
  valid,
  errorMessage,
}: InputProps) => {
  const { t } = useTranslation();

  return (
    <label className={'flex gap-2 text-lg'}>
      {fieldLabel}
      <div className={'flex grow flex-col gap-1'}>
        <input
          value={value}
          onChange={onChange}
          spellCheck={false}
          list={dataListId}
          className={
            'grow rounded-lg border border-primary bg-transparent bg-white px-2 focus:outline-none'
          }
        />
        {errorMessage && (
          <span
            className={`${valid && 'invisible'} whitespace-pre-line px-1 text-sm text-rose-500`}
          >
            {t(errorMessage)}
          </span>
        )}
      </div>
    </label>
  );
};

export default Input;
