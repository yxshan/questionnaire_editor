import { useRequest } from 'ahooks';
import { Typography, Empty, Spin } from 'antd';
import { memo, useEffect, useState, type FC } from 'react';
import { useParams } from 'react-router-dom';

import { getComponentStatService } from '@/services/stat';
import { getComponentConfByType } from '@/components/question-components';

type PropsType = {
  selectedComponentId: string;
  selectedComponentType: string;
};

const { Title, Text } = Typography;

const ChartStat: FC<PropsType> = memo((props) => {
  const { selectedComponentId, selectedComponentType } = props;
  const { id = '' } = useParams();

  const [stat, setStat] = useState([]);
  const [loading, setLoading] = useState(false);

  const { run } = useRequest(
    async (questionId, componentId) => {
      setLoading(true);
      try {
        return await getComponentStatService(questionId, componentId);
      } finally {
        setLoading(false);
      }
    },
    {
      manual: true,
      onSuccess(res) {
        setStat(res.stat);
      },
    },
  );

  useEffect(() => {
    if (selectedComponentId) run(id, selectedComponentId);
  }, [id, selectedComponentId, run]);

  // 生成统计图表
  function genStatElem() {
    if (!selectedComponentId) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Text type='secondary' style={{ fontSize: '14px' }}>
              请先在左侧选择一个组件
            </Text>
          }
          style={{ padding: '40px 0' }}
        />
      );
    }

    const { StatComponent } = getComponentConfByType(selectedComponentType) || {};
    if (StatComponent == null) {
      return (
        <Empty
          description={
            <Text type='secondary' style={{ fontSize: '14px' }}>
              当前组件暂无统计图表
            </Text>
          }
          style={{ padding: '40px 0' }}
        />
      );
    }

    return (
      <Spin spinning={loading} tip='加载中...'>
        <StatComponent stat={stat} />
      </Spin>
    );
  }

  return (
    <>
      <Title level={3} style={{ marginBottom: '16px' }}>
        图表统计
      </Title>
      <div
        style={{
          minHeight: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {genStatElem()}
      </div>
    </>
  );
});

export default ChartStat;
