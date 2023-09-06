export interface MemberType {
  id?: number;
  name?: string;
  group?: {
    id?: number;
    name: string | null;
  };
}
