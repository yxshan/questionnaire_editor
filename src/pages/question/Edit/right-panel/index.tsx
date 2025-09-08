import { FileTextOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import { memo, useEffect } from 'react';
import { useState, type FC, type ReactNode } from 'react';

import ComponentProp from './component-prop';
import PageSetting from './page-setting';
import useGetComponentInfo from '@/hooks/useGetComponentInfo';

interface Props {
  children?: ReactNode;
}

enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}

const RightPanel: FC<Props> = memo(() => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.PROP_KEY);
  const { selectedId } = useGetComponentInfo();

  useEffect(() => {
    if (selectedId) setActiveKey(TAB_KEYS.PROP_KEY);
    else setActiveKey(TAB_KEYS.SETTING_KEY);
  }, [selectedId]);

  const tabsItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: (
        <span>
          <FileTextOutlined style={{ marginRight: '5px' }} />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: (
        <span>
          <SettingOutlined style={{ marginRight: '5px' }} />
          页面设置
        </span>
      ),
      children: <PageSetting />,
    },
  ];

  return <Tabs activeKey={activeKey} items={tabsItems}></Tabs>;
});

export default RightPanel;
