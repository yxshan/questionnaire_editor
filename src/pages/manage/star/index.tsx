import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Empty, Spin, Typography } from 'antd';
import { useTitle } from 'ahooks';

import styles from '../common.module.scss';
import QuestionCard from '@/components/question-card';
import ListSearch from '@/components/list-search';
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData';
import ListPage from '@/components/list-page';

interface Props {
  children?: ReactNode;
}

interface QuestionItem {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
}

const { Title } = Typography;

const Star: FC<Props> = memo(() => {
  useTitle('小慕问卷 - 星标问卷');

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {list.length > 0
          ? list.map((q: QuestionItem) => <QuestionCard key={q._id} {...q} />)
          : !loading && <Empty description='暂无数据' />}
      </div>
      <div className={styles.footer}>
        <ListPage total={total} />
      </div>
    </>
  );
});

export default Star;
