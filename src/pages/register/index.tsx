import { memo } from 'react';
import type { FC, ReactNode } from 'react';
import { Form, Input, Space, Typography, Button, message } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useRequest, useTitle } from 'ahooks';

import styles from './index.module.scss';
import { LOGIN_PATHNAME } from '@/router';
import { registerService } from '@/services/user';

interface Props {
  children?: ReactNode;
}

type RegisterValuesType = {
  username: string;
  password: string;
  nickname?: string;
};

const { Title } = Typography;

const Register: FC<Props> = memo(() => {
  useTitle('小慕问卷 - 用户注册');

  const nav = useNavigate();

  const { run } = useRequest(
    async (values: RegisterValuesType) => {
      const { username, password, nickname } = values;
      await registerService(username, password, nickname);
    },
    {
      manual: true,
      onSuccess() {
        message.success('注册成功');
        nav(LOGIN_PATHNAME); // 跳转到登录页
      },
    },
  );

  const onFinish = (values: RegisterValuesType) => {
    run(values); // 调用 ajax
  };

  return (
    <div className={styles.container}>
      <div>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div>
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
          <Form.Item
            label='用户名'
            name='username'
            rules={[
              { required: true, message: '请输入用户名' },
              { type: 'string', min: 5, max: 20, message: '字符长度在 5-20 之间' },
              { pattern: /^\w+$/, message: '只能是字母数字下划线' },
            ]}
          >
            <Input autoComplete='new-password' />
          </Form.Item>
          <Form.Item
            label='密码'
            name='password'
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password autoComplete='new-password' />
          </Form.Item>
          <Form.Item
            label='确认密码'
            name='confirm'
            dependencies={['password']} // 依赖于 password ，password 变化，会重新触发 validator
            rules={[
              { required: true, message: '请输入密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(new Error('两次密码不一致'));
                  }
                },
              }),
            ]}
          >
            <Input.Password autoComplete='new-password' />
          </Form.Item>
          <Form.Item label='昵称' name='nickname'>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type='primary' htmlType='submit'>
                注册
              </Button>
              <Link to={LOGIN_PATHNAME}>已有账户，登录</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});

export default Register;
