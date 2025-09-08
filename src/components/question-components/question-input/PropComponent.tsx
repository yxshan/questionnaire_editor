import { memo, useEffect, type FC } from 'react';
import { Form, Input } from 'antd';

import type { QuestionInputPropsType } from './interface';

const PropComponent: FC<QuestionInputPropsType> = memo((props) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder, form]);

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ title, placeholder }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Placeholder' name='placeholder'>
        <Input />
      </Form.Item>
    </Form>
  );
});

export default PropComponent;
