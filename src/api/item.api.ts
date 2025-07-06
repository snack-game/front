import api from '@api/index';
import { ItemResponse } from '@utils/types/item.type';

export const getItemInventory = async (): Promise<{
  items: ItemResponse[];
}> => {
  const { data } = await api.get('/games/2/items');

  return data;
};
