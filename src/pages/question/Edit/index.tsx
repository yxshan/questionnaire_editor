import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import useLoadQuestionData from '@/hooks/useLoadQuestionData';
import styles from './index.module.scss';
import EditCanvas from './edit-canvas';
import { changeSelectedId } from '@/store/modules/componentsReducer';
import LeftPanel from './left-panel';
import RightPanel from './right-panel';
import EditHeader from './edit-header';
import { useTitle } from 'ahooks';
import useGetPageInfo from '@/hooks/useGetPageInfo';

interface Props {
  children?: ReactNode;
}

const Edit: FC<Props> = memo(() => {
  const dispatch = useDispatch();
  const { loading } = useLoadQuestionData();

  const { title } = useGetPageInfo();
  useTitle(`问卷编辑 - ${title}`);

  function clearSelectedId() {
    dispatch(changeSelectedId(''));
  }

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectedId}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Edit;
