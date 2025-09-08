import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

import MainLayout from '@/layouts/main-layout';
import ManageLayout from '@/layouts/manage-layout';
import QuestionLayout from '@/layouts/question-layout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Register from '@/pages/register';
import NotFound from '@/pages/not-found';
import List from '@/pages/manage/list';
import Trash from '@/pages/manage/trash';
import Star from '@/pages/manage/star';

const Edit = lazy(() => import('@/pages/question/Edit'));
const Stat = lazy(() => import('@/pages/question/Stat'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          {
            path: 'list',
            element: <List />,
          },
          {
            path: 'star',
            element: <Star />,
          },
          {
            path: 'trash',
            element: <Trash />,
          },
        ],
      },
      {
        path: '*', // 404 路由配置，都写在最后（兜底）
        element: <NotFound />,
      },
    ],
  },
  {
    path: 'question',
    element: <QuestionLayout />,
    children: [
      {
        path: 'edit/:id',
        element: <Edit />,
      },
      {
        path: 'stat/:id', // statistic 统计
        element: <Stat />,
      },
    ],
  },
]);

export default router;

export const HOME_PATHNAME = '/';
export const LOGIN_PATHNAME = '/login';
export const REGISTER_PATHNAME = '/register';
export const MANAGE_INDEX_PATHNAME = '/manage/list';

export function isLoginOrRegister(pathname: string) {
  if ([LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}

export function isNoNeedUserInfo(pathname: string) {
  if ([HOME_PATHNAME, LOGIN_PATHNAME, REGISTER_PATHNAME].includes(pathname)) return true;
  return false;
}
