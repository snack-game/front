import api from '@api/index';
import { ItemResponse, ItemType } from '@utils/types/item.type';

export const getItemInventory = async (): Promise<{
  items: ItemResponse[];
}> => {
  const { data } = await api.get('/games/2/items');

  return data;
};

export const getItem = async (itemType: ItemType): Promise<ItemResponse> => {
  const { data } = await api.post('/games/2/item', { itemType });

  return data;
};
