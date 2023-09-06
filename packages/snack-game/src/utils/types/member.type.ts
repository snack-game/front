export interface MemberType {
  id?: number;
  name?: string;
  group?: {
    id?: number;
    name: string | null;
  };
  accessToken?: string;
}

export interface AuthType {
  member: MemberType;
  accessToken: string;
}
