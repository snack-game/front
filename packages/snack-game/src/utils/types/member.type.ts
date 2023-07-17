interface MemberRoleType {
  role: 'admin' | 'user' | 'guest';
}

export interface MemberType {
  name: string;
  group: string;
  bestScore?: number;
  role?: MemberRoleType;
}
