import { FormOutlined } from '@ant-design/icons';
import { Space, Typography } from 'antd';
import { memo, useEffect, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';
import useGetUserInfo from '@/hooks/useGetUserInfo';
import { HOME_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/router';

interface Props {
  children?: ReactNode;
}

const { Title } = Typography;

const Logo: FC<Props> = memo(() => {
  const { username } = useGetUserInfo();

  const [pathname, setPathname] = useState(HOME_PATHNAME);

  useEffect(() => {
    if (username) {
      setPathname(MANAGE_INDEX_PATHNAME);
    }
  }, [username]);

  return (
    <div className={styles.container}>
      <Link to={pathname}>
        <Space>
          <Title>
            <FormOutlined />
          </Title>
          <Title>小慕问卷</Title>
        </Space>
      </Link>
    </div>
  );
});

export default Logo;
