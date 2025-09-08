import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout, Spin } from 'antd';

import styles from './index.module.scss';
import Logo from '@/components/logo';
import UserInfo from '@/components/user-info';
import useLoadUserData from '@/hooks/useLoadUserData';
import useNavPage from '@/hooks/useNavPage';

interface Props {
  children?: ReactNode;
}

const { Header, Content, Footer } = Layout;

const MainLayout: FC<Props> = memo(() => {
  const { waitingUserData } = useLoadUserData();
  useNavPage(waitingUserData);

  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Layout className={styles.main}>
        <Content>
          {waitingUserData ? (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
              <Spin />
            </div>
          ) : (
            <Outlet />
          )}
        </Content>
      </Layout>
      <Footer className={styles.footer}>小慕问卷 &copy;2025-present</Footer>
    </Layout>
  );
});

export default MainLayout;
