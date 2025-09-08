import { memo, useEffect, type FC } from 'react';
import { Form, Input } from 'antd';

import type { QuestionInfoPropsType } from './interface';

const { TextArea } = Input;

const PropComponent: FC<QuestionInfoPropsType> = memo((props: QuestionInfoPropsType) => {
  const { title, desc, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, desc });
  }, [title, desc, form]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ title, desc }}
      onValuesChange={handleValuesChange}
      disabled={disabled}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入问卷标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='描述' name='desc'>
        <TextArea />
      </Form.Item>
    </Form>
  );
});

export default PropComponent;
