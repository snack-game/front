type MemberRoleType = 'admin' | 'user' | 'guest';

export interface MemberType {
  id?: number;
  name: string;
  group?: {
    id?: number;
    name: string | null;
  };
  accessToken?: string;
  bestScore?: number;
  role?: MemberRoleType;
}
