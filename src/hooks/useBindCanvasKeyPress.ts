import { useKeyPress } from 'ahooks';
import { useDispatch } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import {
  copySelectedComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  selectNextCoomponent,
  selectPrevCoomponent,
} from '@/store/modules/componentsReducer';

function isActiveElementValid() {
  // 获取DOM中当前拥有焦点的Element
  const activeElem = document.activeElement;

  // // 没有增加 dnd-kit 之前
  // if (activeElem === document.body) return true // 光标没有 focus 到 input

  // 增加了 dnd-kit 以后
  if (activeElem === document.body) return true;
  if (activeElem?.matches('div[role="button"]')) return true;

  return false;
}

function useBindCanvasKeyPress() {
  const dispatch = useDispatch();

  // 删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementValid()) return;

    dispatch(removeSelectedComponent());
  });

  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    dispatch(copySelectedComponent());
  });

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    dispatch(pasteCopiedComponent());
  });

  // 选中上一个
  useKeyPress('uparrow', () => {
    if (!isActiveElementValid) return;

    dispatch(selectPrevCoomponent());
  });

  // 选中下一个
  useKeyPress('downarrow', () => {
    if (!isActiveElementValid) return;

    dispatch(selectNextCoomponent());
  });

  // 撤销
  useKeyPress(['ctrl.z', 'meta.z'], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoActionCreators.undo());
  });

  // 重做
  useKeyPress(['ctrl.y', 'meta.y'], () => {
    if (!isActiveElementValid()) return;
    dispatch(UndoActionCreators.redo());
  });
}

export default useBindCanvasKeyPress;
