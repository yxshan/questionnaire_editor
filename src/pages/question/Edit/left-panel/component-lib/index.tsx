import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Typography } from 'antd';
import { nanoid } from 'nanoid';

import { componentConfGroup, type ComponentConfType } from '@/components/question-components';
import styles from './index.module.scss';
import { addComponent } from '@/store/modules/componentsReducer';

interface Props {
  children?: ReactNode;
}

const { Title } = Typography;

const ComponentLib: FC<Props> = memo(() => {
  const dispatch = useDispatch();

  function genComponent(c: ComponentConfType) {
    const { title, type, Component, defaultProps } = c;

    function handleClick() {
      dispatch(
        addComponent({
          fe_id: nanoid(),
          title,
          type,
          props: defaultProps,
        }),
      );
    }

    return (
      <div key={type} className={styles.wrapper} onClick={handleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    );
  }

  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group;

        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>{components.map((c) => genComponent(c))}</div>
          </div>
        );
      })}
    </>
  );
});

export default ComponentLib;
