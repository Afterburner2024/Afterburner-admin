export const USER_STATUS = {
  ADMIN: '관리자',
  PENDING: '승인 대기',
  WAITTING: '승인 대기 중',
  REJECTED: '승인 거절',
} as const;

export type UserStatus = (typeof USER_STATUS)[keyof typeof USER_STATUS];