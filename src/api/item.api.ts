import api from '@api/index';

export const getItemInventory = async (): Promise<{
  items: Record<string, number>;
}> => {
  const { data } = await api.get('/games/2/items');

  return data;
};
