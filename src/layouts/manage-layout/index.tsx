import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Button, Divider, message, Space } from 'antd';
import { BarsOutlined, DeleteOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';

import styles from './index.module.scss';
import { createQuestionService } from '@/services/question';
import { useRequest } from 'ahooks';

interface Props {
  children?: ReactNode;
}

const ManageLayout: FC<Props> = memo(() => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  const {
    loading,
    // error,
    run: handleCreateClick,
  } = useRequest(createQuestionService, {
    manual: true,
    onSuccess(result) {
      nav(`/question/edit/${result.id}`);
      message.success('创建成功');
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction='vertical'>
          <Button
            type='primary'
            size='large'
            icon={<PlusOutlined />}
            onClick={handleCreateClick}
            disabled={loading}
          >
            新建问卷
          </Button>
          <Divider style={{ borderTop: 'transparent' }} />
          <Button
            type={pathname.startsWith('/manage/list') ? 'default' : 'text'}
            size='large'
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/star') ? 'default' : 'text'}
            size='large'
            icon={<StarOutlined />}
            onClick={() => nav('/manage/star')}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith('/manage/trash') ? 'default' : 'text'}
            size='large'
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
});

export default ManageLayout;
