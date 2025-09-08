import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
import { useDispatch } from 'react-redux';

import useGetUserInfo from './useGetUserInfo';
import { getUserInfoService } from '@/services/user';
import { loginReducer } from '@/store/modules/userReducer';

/**
 * 获取用户信息并分配到redux store
 * @returns waitingUserData：等待加载用户信息的状态
 */
function useLoadUserData() {
  const dispatch = useDispatch();

  // 判断当前 redux store 是否已经存在用户信息
  const { username } = useGetUserInfo(); // redux store

  const [waitingUserData, setWaitingUserData] = useState(true);

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      dispatch(loginReducer({ username, nickname })); // 存储到 redux store
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  useEffect(() => {
    if (username) {
      setWaitingUserData(false); // 如果 redux store 已经存在用户信息，就不用重新加载了
      return;
    }
    run(); // 如果 redux store 中没有用户信息，则进行加载
  }, [username, run]);

  return { waitingUserData };
}

export default useLoadUserData;
