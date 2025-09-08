import { memo, useEffect, type FC } from 'react';
import { Checkbox, Form, Input } from 'antd';

import type { QuestionParagraphPropsType } from './interface';

const { TextArea } = Input;

const PropComponent: FC<QuestionParagraphPropsType> = memo((props) => {
  const { text, isCenter, disabled, onChange } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, isCenter });
  }, [text, isCenter, form]);

  function handleValuesChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ text, isCenter }}
      disabled={disabled}
      onValuesChange={handleValuesChange}
    >
      <Form.Item
        label='段落内容'
        name='text'
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item name='isCenter' valuePropName='checked'>
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
});

export default PropComponent;
