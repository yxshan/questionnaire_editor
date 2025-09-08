import { memo, useEffect, type FC } from 'react';
import { Checkbox, Form, Input, Select } from 'antd';

import type { QuesitonTitlePropsType } from './interface';

const PropComponent: FC<QuesitonTitlePropsType> = memo((props) => {
  const { text, level, isCenter, onChange, disabled } = props;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({ text, level, isCenter });
  }, [text, level, isCenter, form]);

  function handleValueChange() {
    if (onChange) {
      onChange(form.getFieldsValue());
    }
  }

  return (
    <Form
      form={form}
      layout='vertical'
      initialValues={{ text, level, isCenter }}
      onValuesChange={handleValueChange}
      disabled={disabled}
    >
      <Form.Item
        label='标题内容'
        name='text'
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label='层级' name='level'>
        <Select
          options={[
            { value: 1, label: 1 },
            { value: 2, label: 2 },
            { value: 3, label: 3 },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item name='isCenter' valuePropName='checked'>
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  );
});

export default PropComponent;
