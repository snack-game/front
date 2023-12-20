export interface GroupType {
  id?: number;
  name: string;
}

export type AuthType = 'SOCIAL' | 'GUEST' | 'SELF';

export interface MemberType {
  member: {
    id?: number;
    name?: string;
    group: GroupType | null;
    guest?: boolean;
    type?: AuthType;
  };
  accessToken?: string;
}
