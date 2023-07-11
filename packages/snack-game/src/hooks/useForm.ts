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

      setValues((prevValues) => ({
        ...prevValues,
        [field]: {
          ...prevValues[field],
          value: eventValue,
          valid: prevValues[field].isInvalid?.(eventValue),
        },
      }));
    };

  const resetForm = () => {
    setValues(initialVa가lues);
  };

  return {
    values,
    handleChangeValue,
    resetForm,
  };
};

export default useForm;
