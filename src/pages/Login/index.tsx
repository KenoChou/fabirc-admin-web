import { Button, Card, Form, Input, Select, Typography, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROLE } from '../../constants';
import { useAuthStore } from '../../store/auth';

interface FormValues {
  username: string;
  password?: string;
  role: 'admin' | 'normal';
}

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const onFinish = async (values: FormValues) => {
    try {
      setLoading(true);
      // 临时取消密码校验：允许直接登录后台查看页面
      const token = `dev-token-${Date.now()}`;
      setAuth({ token, username: values.username, role: values.role });
      message.success('登录成功');
      navigate('/resource-list');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f5f5f5' }}>
      <Card title="内部管理平台登录" style={{ width: 420 }}>
        <Typography.Paragraph type="secondary">已临时关闭密码校验，可直接登录进入后台。</Typography.Paragraph>
        <Form layout="vertical" onFinish={onFinish} initialValues={{ role: ROLE.normal }}>
          <Form.Item label="用户名" name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item label="密码（已不校验）" name="password">
            <Input.Password placeholder="可不填写" />
          </Form.Item>
          <Form.Item label="角色（用于本地权限演示）" name="role">
            <Select
              options={[
                { label: 'normal', value: ROLE.normal },
                { label: 'admin', value: ROLE.admin },
              ]}
            />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            登录
          </Button>
        </Form>
      </Card>
    </div>
  );
}
