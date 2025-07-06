import { useSuspenseQuery } from '@tanstack/react-query';

import { getItemInventory } from '@api/item.api';

import { QUERY_KEY } from '@constants/api.constant';

export const useGetUserItem = (userId: number) => {
  return useSuspenseQuery({
    queryKey: [QUERY_KEY.USER_ITEM, userId],
    queryFn: getItemInventory,
    staleTime: 1000 * 60 * 60 * 24,
    select: (data) => data.items,
  });
};
