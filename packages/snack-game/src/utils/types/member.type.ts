type MemberRoleType = 'admin' | 'user' | 'guest';

export interface MemberType {
  name: string;
  group: string;
  accessToken?: string;
  bestScore?: number;
  role?: MemberRoleType;
}
