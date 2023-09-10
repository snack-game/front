import { useMutation } from 'react-query';

import { AxiosError } from 'axios/index';

import { ServerError } from '@constants/api.constant';
import useError from '@hooks/useError';

interface useGenericMutationProps<TArgs, TResult> {
  apiMethod: (args: TArgs) => Promise<TResult>;
  onSettled?: () => void;
  onSuccess?: (data: TResult) => void;
}

const useGenericMutation = <TArgs = unknown, TResult = unknown>({
  apiMethod,
  onSettled,
  onSuccess,
}: useGenericMutationProps<TArgs, TResult>) => {
  const errorPopup = useError();
  return useMutation<TResult, AxiosError<ServerError>, TArgs>(apiMethod, {
    retry: 0,
    onError: (error: AxiosError<ServerError>) => {
      if (error.response) {
        errorPopup(error.response.status, error.response.data.messages);

        throw error;
      }
    },
    onSettled,
    onSuccess,
  });
};

export default useGenericMutation;
