import { memo, type FC } from 'react';
import { Input, Typography } from 'antd';

import { QuestionInputDefaultProps, type QuestionInputPropsType } from './interface';

const { Paragraph } = Typography;

const Component: FC<QuestionInputPropsType> = memo((props) => {
  const { title = '', placeholder = '' } = { ...QuestionInputDefaultProps, ...props };

  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder}></Input>
      </div>
    </div>
  );
});

export default Component;
