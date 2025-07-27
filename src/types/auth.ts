export type UserStatus = '관리자' | '유저' | '최고관리자';

export const UserStatus = {
  Admin: '관리자' as UserStatus,
  User: '유저' as UserStatus,
  SuperAdmin: '최고관리자' as UserStatus,
};

export default UserStatus;
