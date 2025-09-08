import { shallowEqual, useSelector } from 'react-redux';

import type { StateType } from '@/store';
import type { ComponentsStateType } from '@/store/modules/componentsReducer';

/**
 * 从redux store中获取问卷中的组件列表
 * @returns componentList：组件列表，selectedId：被选中的问卷id，
 * selectedComponent：被选中的组件，copiedComponent：被复制的组件
 */
function useGetComponentInfo() {
  const components = useSelector<StateType>(
    (state) => state.components.present,
    shallowEqual,
  ) as ComponentsStateType;

  const { componentList = [], selectedId, copiedComponent } = components;

  const selectedComponent = componentList.find((c) => c.fe_id === selectedId);

  return {
    componentList,
    selectedId,
    selectedComponent,
    copiedComponent,
  };
}

export default useGetComponentInfo;
