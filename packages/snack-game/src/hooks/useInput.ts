import { ChangeEvent, useState } from 'react';

interface useInputProps<T> {
  initialValue: T;
  isInvalid?: (value: T) => boolean;
}

const useInput = <T>({ initialValue, isInvalid }: useInputProps<T>) => {
  const [valid, setValid] = useState<boolean>(true);
  const [value, setValue] = useState(initialValue);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    const eventValue = event.target.value as unknown as T;

    if (isInvalid) {
      setValid(isInvalid(eventValue));
    }

    setValue(eventValue);
  };

  return {
    value,
    handleChangeValue,
    valid,
  };
};

export default useInput;
