import { memo } from 'react';
import type { FC, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import classNames from 'classnames';

import styles from './index.module.scss';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import { changeSelectedId, type ComponentInfoType } from '@/store/modules/componentsReducer';
import { getComponentConfByType } from '@/components/question-components';
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress';

interface Props {
  loading: boolean;
}

/**
 * @parmas 组件的配置信息
 * @returns 生成对应的组件
 */
function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo;

  const componentConf = getComponentConfByType(type);
  if (componentConf == null) return null;

  const { Component } = componentConf;

  return <Component {...props} />;
}

const EditCanvas: FC<Props> = memo((props) => {
  const { loading } = props;
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  function handlleClick(event: MouseEvent, id: string) {
    event.stopPropagation();
    dispatch(changeSelectedId(id));
  }

  useBindCanvasKeyPress();

  if (loading)
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin />
      </div>
    );

  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;

          const wrapperDefaultClassName = styles['component-wrapper'];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });

          return (
            <div key={fe_id} className={wrapperClassName} onClick={(e) => handlleClick(e, fe_id)}>
              <div className={styles.component}>{genComponent(c)}</div>
            </div>
          );
        })}
    </div>
  );
});

export default EditCanvas;
