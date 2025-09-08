import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRequest } from 'ahooks';

import {
  isLoginOrRegister,
  isNoNeedUserInfo,
  LOGIN_PATHNAME,
  MANAGE_INDEX_PATHNAME,
} from '@/router';
import useGetUserInfo from './useGetUserInfo';
import { getToken, setToken } from '@/utils/user-token';
import { getUserInfoService } from '@/services/user';
import { useDispatch } from 'react-redux';
import { loginReducer } from '@/store/modules/userReducer';

/**
 * 根据登录情况对路由导向进行判断
 * @param waitingUserData 等待加载用户信息的状态
 */
function useNavPage(waitingUserData: boolean) {
  const nav = useNavigate();
  const { username } = useGetUserInfo();
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  // 添加自动刷新token的请求
  const { run: refreshToken } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess: (result) => {
      // 刷新成功，更新用户信息和token（如果需要）
      const { username, nickname, token } = result;
      if (token) {
        setToken(token); // 更新token
      }
      dispatch(loginReducer({ username, nickname }));
    },
    onError: () => {
      // 刷新失败，清除本地token并跳转到登录页
      localStorage.removeItem('token');
      if (!isNoNeedUserInfo(pathname)) {
        nav(LOGIN_PATHNAME);
      }
    },
  });

  useEffect(() => {
    // 如果有token但没有用户信息，尝试自动刷新
    if (getToken() && !username && !waitingUserData) {
      refreshToken();
    }
  }, [username, waitingUserData, refreshToken]);

  useEffect(() => {
    if (waitingUserData) return;

    // 已经登录了
    if (username && getToken()) {
      if (isLoginOrRegister(pathname)) {
        nav(MANAGE_INDEX_PATHNAME);
      }
      return;
    }

    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return;
    } else {
      nav(LOGIN_PATHNAME);
    }
  }, [waitingUserData, username, pathname, nav]);
}

export default useNavPage;
