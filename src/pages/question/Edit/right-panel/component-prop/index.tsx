import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

import { getComponentConfByType, type ComponentPropsType } from '@/components/question-components';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import { changeComponentProps } from '@/store/modules/componentsReducer';

interface Props {
  children?: ReactNode;
}

const NoProp: FC = () => {
  return <div style={{ textAlign: 'center' }}>未选中组件</div>;
};

const ComponentProp: FC<Props> = memo(() => {
  const dispatch = useDispatch();

  const { selectedComponent } = useGetComponentInfo();
  if (selectedComponent == null) return <NoProp />;

  const { type, props, isLocked, isHidden } = selectedComponent;
  const componenyConf = getComponentConfByType(type);
  if (componenyConf == null) return <NoProp />;

  const { PropComponent } = componenyConf;

  function changeProps(newProps: ComponentPropsType) {
    if (selectedComponent == null) return;

    const { fe_id } = selectedComponent;
    dispatch(changeComponentProps({ fe_id, newProps }));
  }

  return <PropComponent {...props} onChange={changeProps} disabled={isLocked || isHidden} />;
});

export default ComponentProp;
