import { ChangeEvent, useState } from 'react';

interface useInputProps<T> {
  initialValue: T;
  isInvalid?: (value: T) => boolean;
}

const useInput = <T>({ initialValue, isInvalid }: useInputProps<T>) => {
  const [value, setValue] = useState(initialValue);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    const eventValue = event.target.value as unknown as T;

    if (isInvalid && isInvalid(eventValue)) return;

    console.log(eventValue);
    setValue(eventValue);
  };

  return {
    value,
    handleChangeValue,
  };
};

export default useInput;
