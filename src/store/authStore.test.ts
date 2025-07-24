import { act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

// 테스트 실행 전, 각 테스트 케이스가 격리된 환경에서 실행되도록 store의 상태를 초기화합니다.
beforeEach(() => {
  act(() => {
    useAuthStore.getState().logout();
  });
});

describe('authStore', () => {
  it('초기 상태는 로그아웃 상태여야 합니다.', () => {
    const { isLoggedIn, userStatus } = useAuthStore.getState();
    expect(isLoggedIn).toBe(false);
    expect(userStatus).toBeNull();
  });

  it('login 액션은 상태를 올바르게 설정해야 합니다.', () => {
    act(() => {
      useAuthStore.getState().login('active');
    });

    const { isLoggedIn, userStatus } = useAuthStore.getState();
    expect(isLoggedIn).toBe(true);
    expect(userStatus).toBe('active');
  });

  it('logout 액션은 모든 인증 상태를 제거해야 합니다.', () => {
    act(() => {
      useAuthStore.getState().login('active');
    });

    expect(useAuthStore.getState().isLoggedIn).toBe(true);

    act(() => {
      useAuthStore.getState().logout();
    });

    const { isLoggedIn, userStatus } = useAuthStore.getState();
    expect(isLoggedIn).toBe(false);
    expect(userStatus).toBeNull();
  });

  it('로그인 후 상태는 유지되며 로그아웃 시 초기화되어야 합니다.', () => {
    act(() => {
      useAuthStore.getState().login('active');
    });

    const stateAfterLogin = useAuthStore.getState();
    expect(stateAfterLogin.isLoggedIn).toBe(true);

    act(() => {
      useAuthStore.getState().logout();
    });

    const { isLoggedIn, userStatus } = useAuthStore.getState();
    expect(isLoggedIn).toBe(false);
    expect(userStatus).toBeNull();
  });
});
