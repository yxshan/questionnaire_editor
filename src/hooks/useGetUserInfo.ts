import { shallowEqual, useSelector } from 'react-redux';
import type { StateType } from '@/store';
import type { UserStateType } from '@/store/modules/userReducer';

/**
 * 从redux store中获取用户信息
 * @returns username：用户名，nickname：昵称
 */
function useGetUserInfo() {
  const { username, nickname } = useSelector<StateType>(
    (state) => state.user,
    shallowEqual,
  ) as UserStateType;
  return { username, nickname };
}

export default useGetUserInfo;
