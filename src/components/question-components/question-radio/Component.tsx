import { memo, type FC } from 'react';
import { Typography, Radio, Space } from 'antd';

import { QuestionRadioDefaultProps, type QuestionRadioPropsType } from './interface';

const { Paragraph } = Typography;

const Component: FC<QuestionRadioPropsType> = memo((props: QuestionRadioPropsType) => {
  const {
    title = '',
    options = [],
    value = '',
    isVertical = false,
  } = { ...QuestionRadioDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options.map((opt) => {
            const { value, text } = opt;
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            );
          })}
        </Space>
      </Radio.Group>
    </div>
  );
});

export default Component;
