import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { memo } from 'react';
import type { FC, ReactNode } from 'react';

import ComponentLib from './component-lib';
import Layers from './layers';

interface Props {
  children?: ReactNode;
}

const LeftPanel: FC<Props> = memo(() => {
  const tabsItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined style={{ marginRight: '5px' }} />
          组件库
        </span>
      ),
      children: <ComponentLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined style={{ marginRight: '5px' }} />
          图层
        </span>
      ),
      children: <Layers />,
    },
  ];

  return <Tabs defaultActiveKey='componentLib' items={tabsItems}></Tabs>;
});

export default LeftPanel;
