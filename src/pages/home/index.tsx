import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';

import { MANAGE_INDEX_PATHNAME } from '@/router';
import styles from './index.module.scss';
import { useTitle } from 'ahooks';

interface Props {
  children?: ReactNode;
}

const { Title, Paragraph } = Typography;

const Home: FC<Props> = memo(() => {
  useTitle('小慕问卷 - 首页');

  const nav = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份</Paragraph>
        <div>
          <Button type='primary' onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
});

export default Home;
