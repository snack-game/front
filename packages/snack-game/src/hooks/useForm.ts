import { ChangeEvent, useState } from 'react';

interface FormField<T> {
  value: T;
  isInvalid?: (value: T) => boolean;
  valid?: boolean;
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

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return {
    values,
    handleChangeValue,
    handleOnSubmit,
    setFieldValue,
  };
};

export default useForm;
