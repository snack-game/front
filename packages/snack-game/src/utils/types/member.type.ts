export interface GroupType {
  id?: number;
  name: string;
}

export interface MemberType {
  id?: number;
  name?: string;
  group: GroupType | null;
  guest?: boolean;
  accessToken?: string;
}

export interface AuthType {
  member: MemberType;
  accessToken: string;
}
