import { produce } from 'immer';
import cloneDeep from 'lodash.clonedeep';
import { arrayMove } from '@dnd-kit/sortable';

import type { ComponentPropsType } from '@/components/question-components';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { getNextSelectedId, insertNewComponent } from './utils';
import { nanoid } from 'nanoid';

export type ComponentInfoType = {
  fe_id: string;
  type: string;
  title: string;
  props: ComponentPropsType;
  isHidden?: boolean;
  isLocked?: boolean;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: '',
  componentList: [],
  copiedComponent: null,
};

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (_state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
      return action.payload;
    },

    // 修改selectedId
    changeSelectedId: produce((draft: ComponentsStateType, actions: PayloadAction<string>) => {
      draft.selectedId = actions.payload;
    }),

    // 添加新组件
    addComponent: produce(
      (draft: ComponentsStateType, actions: PayloadAction<ComponentInfoType>) => {
        const newComponent = actions.payload;

        insertNewComponent(draft, newComponent);
      },
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        actions: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = actions.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);

        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      },
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft;

      const newSelectedId = getNextSelectedId(removedId, componentList);
      draft.selectedId = newSelectedId;

      const index = componentList.findIndex((c) => c.fe_id === removedId);
      componentList.splice(index, 1);
    }),

    // 隐藏/显示组件
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        actions: PayloadAction<{ fe_id: string; isHidden: boolean }>,
      ) => {
        const { componentList } = draft;
        const { fe_id, isHidden } = actions.payload;

        let newSelectedId = '';
        if (isHidden) {
          newSelectedId = getNextSelectedId(fe_id, componentList);
        } else {
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
        }
      },
    ),

    // 锁定/解锁组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, actions: PayloadAction<{ fe_id: string }>) => {
        const { fe_id } = actions.payload;

        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      },
    ),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;

      const selectedComponent = componentList.find((c) => c.fe_id === selectedId);
      if (selectedComponent == null) return;

      draft.copiedComponent = cloneDeep(selectedComponent);
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;

      if (copiedComponent == null) return;

      copiedComponent.fe_id = nanoid();

      insertNewComponent(draft, copiedComponent);
    }),

    // 选中上一个
    selectPrevCoomponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const selcetedIndex = componentList.findIndex((c) => c.fe_id === selectedId);

      if (selcetedIndex < 0) return;
      if (selcetedIndex <= 0) return;

      draft.selectedId = componentList[selcetedIndex - 1].fe_id;
    }),

    // 选中下一个
    selectNextCoomponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList } = draft;
      const selcetedIndex = componentList.findIndex((c) => c.fe_id === selectedId);

      if (selcetedIndex < 0) return;
      if (selcetedIndex + 1 === componentList.length) return;

      draft.selectedId = componentList[selcetedIndex + 1].fe_id;
    }),

    // 修改组件标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { title, fe_id } = action.payload;
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) curComp.title = title;
      },
    ),

    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>,
      ) => {
        const { componentList: curComponentList } = draft;
        const { oldIndex, newIndex } = action.payload;

        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex);
      },
    ),
  },
});

export const {
  resetComponents,
  changeSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevCoomponent,
  selectNextCoomponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions;
export default componentsSlice.reducer;
