import { AxiosResponse } from 'axios';

import api from '@api/index';
import { ProvocationTarget } from '@utils/types/common.type';

export const canProvoke = async (
  ownerId: number,
  sessionId: number,
): Promise<AxiosResponse> => {
  const response = await api.get<boolean>(`/provoke/${ownerId}/${sessionId}`);

  return response;
};

export const getSurpassedPlayers = async (): Promise<ProvocationTarget[]> => {
  const { data } = await api.get('rankings/histories');

  return data;
};

export const sendProvocation = async ({
  ownerId,
  receiverNickname,
}: {
  ownerId: number;
  receiverNickname: string;
}): Promise<void> => {
  const { data } = await api.post(
    `/provoke/send/${ownerId}?receiverNickname=${receiverNickname}`,
  );

  return data;
};
