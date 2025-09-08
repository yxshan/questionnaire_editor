import { memo, useState } from 'react';
import type { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'ahooks';
import { Button, Result, Spin } from 'antd';

import useLoadQuestionData from '@/hooks/useLoadQuestionData';
import useGetPageInfo from '@/hooks/useGetPageInfo';
import styles from './index.module.scss';
import StatHeader from './stat-header';
import ComponentList from './component-list';
import PageStat from './page-stat';
import ChartStat from './chart-stat';

interface Props {
  children?: ReactNode;
}

const Stat: FC<Props> = memo(() => {
  const nav = useNavigate();

  const { loading } = useLoadQuestionData();
  const { title, isPublished } = useGetPageInfo();

  useTitle(`问卷统计-${title}`);

  const [selectedComponentId, setSelectedComponentId] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState('');

  const LoadingELem = (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <Spin />
    </div>
  );

  function genContentElem() {
    if (typeof isPublished === 'boolean' && !isPublished) {
      return (
        <div style={{ flex: '1' }}>
          <Result
            status='warning'
            title='该页面尚未发布'
            extra={
              <Button type='primary' onClick={() => nav(-1)}>
                返回
              </Button>
            }
          ></Result>
        </div>
      );
    }

    return (
      <>
        <div className={styles.left}>
          <ComponentList
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          />
        </div>
        <div className={styles.main}>
          <PageStat
            selectedComponentId={selectedComponentId}
            setSelectedComponentId={setSelectedComponentId}
            setSelectedComponentType={setSelectedComponentType}
          ></PageStat>
        </div>
        <div className={styles.right}>
          <ChartStat
            selectedComponentId={selectedComponentId}
            selectedComponentType={selectedComponentType}
          />
        </div>
      </>
    );
  }

  return (
    <div className={styles.container}>
      <StatHeader />
      <div className={styles['content-wrapper']}>
        {loading ? LoadingELem : <div className={styles.content}>{genContentElem()}</div>}
      </div>
    </div>
  );
});

export default Stat;
