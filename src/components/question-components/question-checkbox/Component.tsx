import { type FC } from 'react';
import { Typography, Space, Checkbox } from 'antd';
import { QuestionCheckboxDefaultProps, type QuestionCheckboxPropsType } from './interface';

const { Paragraph } = Typography;

const Component: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
  const {
    title = '',
    isVertical = false,
    list = [],
  } = { ...QuestionCheckboxDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list.map((opt) => {
          const { value, text, checked } = opt;
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          );
        })}
      </Space>
    </div>
  );
};

export default Component;
