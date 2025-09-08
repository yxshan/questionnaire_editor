import {
  BlockOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  RedoOutlined,
  UndoOutlined,
  UpOutlined,
} from '@ant-design/icons';
import { Button, Space, Tooltip } from 'antd';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreators as UndoActionCreators } from 'redux-undo';

import useGetComponentInfo from '@/hooks/useGetComponentInfo';
import {
  changeComponentHidden,
  copySelectedComponent,
  moveComponent,
  pasteCopiedComponent,
  removeSelectedComponent,
  toggleComponentLocked,
} from '@/store/modules/componentsReducer';

interface Props {
  children?: ReactNode;
}

const EditToolBar: FC<Props> = memo(() => {
  const dispatch = useDispatch();
  const { selectedId, componentList, selectedComponent, copiedComponent } = useGetComponentInfo();
  const { isLocked } = selectedComponent || {};
  const length = componentList.length;
  const selectedIndex = componentList.findIndex((c) => c.fe_id === selectedId);
  const isFirst = selectedIndex <= 0; // 第一个
  const isLast = selectedIndex + 1 >= length; // 最后一个

  function handleDelete() {
    dispatch(removeSelectedComponent());
  }

  function handleHidden() {
    dispatch(changeComponentHidden({ fe_id: selectedId, isHidden: true }));
  }

  function handleLock() {
    dispatch(toggleComponentLocked({ fe_id: selectedId }));
  }

  function copy() {
    dispatch(copySelectedComponent());
  }

  function paste() {
    dispatch(pasteCopiedComponent());
  }

  function moveUp() {
    if (isFirst) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }));
  }

  function moveDown() {
    if (isLast) return;
    dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }));
  }

  function undo() {
    dispatch(UndoActionCreators.undo());
  }

  function redo() {
    dispatch(UndoActionCreators.redo());
  }

  return (
    <Space>
      <Tooltip title='删除'>
        <Button shape='circle' icon={<DeleteOutlined />} onClick={handleDelete}></Button>
      </Tooltip>
      <Tooltip title='隐藏'>
        <Button shape='circle' icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
      </Tooltip>
      <Tooltip title='锁定'>
        <Button
          shape='circle'
          icon={<LockOutlined />}
          onClick={handleLock}
          type={isLocked ? 'primary' : 'default'}
        ></Button>
      </Tooltip>
      <Tooltip title='复制'>
        <Button shape='circle' icon={<CopyOutlined />} onClick={copy}></Button>
      </Tooltip>
      <Tooltip title='粘贴'>
        <Button
          shape='circle'
          icon={<BlockOutlined />}
          onClick={paste}
          disabled={copiedComponent == null}
        ></Button>
      </Tooltip>
      <Tooltip title='上移'>
        <Button shape='circle' icon={<UpOutlined />} onClick={moveUp} disabled={isFirst}></Button>
      </Tooltip>
      <Tooltip title='下移'>
        <Button
          shape='circle'
          icon={<DownOutlined />}
          onClick={moveDown}
          disabled={isLast}
        ></Button>
      </Tooltip>
      <Tooltip title='撤销'>
        <Button shape='circle' icon={<UndoOutlined />} onClick={undo}></Button>
      </Tooltip>
      <Tooltip title='重做'>
        <Button shape='circle' icon={<RedoOutlined />} onClick={redo}></Button>
      </Tooltip>
    </Space>
  );
});

export default EditToolBar;
