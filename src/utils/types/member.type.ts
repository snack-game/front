export interface GroupType {
  id?: number;
  name: string;
}

export type AuthType = 'SOCIAL' | 'GUEST' | 'SELF';

export interface MemberType {
  id?: number;
  name?: string;
  group: GroupType | null;
  profileImage?: string;
  guest?: boolean;
  type?: AuthType;
  status?: StatusType;
}

export interface StatusType {
  level: number;
  exp: number;
  maxExp: number;
}
