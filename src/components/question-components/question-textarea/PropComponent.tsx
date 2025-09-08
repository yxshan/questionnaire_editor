import { type FC, useEffect } from 'react';
import { Form, Input } from 'antd';
import { type QuestionTextareaPropsType } from './interface';

const PropComponent: FC<QuestionTextareaPropsType> = (props: QuestionTextareaPropsType) => {
  const { title, placeholder, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ title, placeholder });
  }, [title, placeholder, form]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ title, placeholder }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label='Placeholder' name='placeholder'>
        <Input />
      </Form.Item>
    </Form>
  );
};

export default PropComponent;
