export type ItemType = 'BOMB' | 'FEVER_TIME';

export interface ItemResponse {
  ownerId: number;
  type: ItemType;
  count: number;
  lastGrantedAt: string;
}
