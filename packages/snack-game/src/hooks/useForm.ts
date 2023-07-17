import { ChangeEvent, useState } from 'react';

interface FormField<T> {
  value: T;
  isInvalid?: (value: T) => boolean;
  valid?: boolean; // 해당 필드의 valid 초기값을 설정시 필요
}

interface UseFormProps<T> {
  initialValues: Record<string, FormField<T>>;
}

const useForm = <T>({ initialValues }: UseFormProps<T>) => {
  const [values, setValues] =
    useState<Record<string, FormField<T>>>(initialValues);

  const handleChangeValue =
    (field: string) =>
    (event: ChangeEvent<HTMLInputElement>): void => {
      const eventValue = event.target.value as unknown as T;

      setFieldValue(field)(eventValue);
    };

  const setFieldValue =
    (field: string) =>
    (value: T): void => {
      setValues((prevValues) => ({
        ...prevValues,
        [field]: {
          ...prevValues[field],
          value: value,
          valid: prevValues[field].isInvalid?.(value),
        },
      }));
    };

  return {
    values,
    handleChangeValue,
    setFieldValue,
  };
};

export default useForm;
