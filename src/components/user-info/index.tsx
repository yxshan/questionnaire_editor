import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { LOGIN_PATHNAME } from '@/router';
import { getToken, removeToken } from '@/utils/user-token';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { useDispatch } from 'react-redux';
import { logoutReducer } from '@/store/modules/userReducer';

interface Props {
  children?: ReactNode;
}

const UserInfo: FC<Props> = memo(() => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const { username, nickname } = useGetUserInfo();

  function logout() {
    dispatch(logoutReducer());
    removeToken();
    message.success('退出成功');
    nav(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type='link' onClick={logout}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <div>{username && getToken() ? UserInfo : Login}</div>;
});

export default UserInfo;
