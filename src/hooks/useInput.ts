import { ChangeEvent, useState } from 'react';

interface useInputProps<T> {
  initialValue: T;
  isInvalid?: (value: T) => boolean;
}

const useInput = <T>({ initialValue, isInvalid }: useInputProps<T>) => {
  const [valid, setValid] = useState<boolean>(
    isInvalid ? isInvalid(initialValue) : true,
  );
  const [value, setValue] = useState(initialValue);

  const handleChangeValue = (event: ChangeEvent<HTMLInputElement>): void => {
    const eventValue = event.target.value as T;

    if (isInvalid) {
      setValid(isInvalid(eventValue));
    }

    setValue(eventValue);
  };

  const setFieldValue = (value: T): void => {
    setValue(value);
  };

  return {
    value,
    handleChangeValue,
    valid,
    setFieldValue,
  };
};

export default useInput;
