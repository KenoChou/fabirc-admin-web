import { Button, Card, Form, Input, Space, Typography, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';
import { runOpsToolApi } from '../../api/modules/ops';
import { useAuthStore } from '../../store/auth';
import type { ApiResponse } from '../../types/common';
import type { LoginResponse } from '../../types/auth';

interface OpsFormValues {
  path: string;
  payload: string;
}

interface TokenFormValues {
  baseUrl: string;
  username: string;
  password: string;
}

export default function OpsToolsPage() {
  const [output, setOutput] = useState('');
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenResult, setTokenResult] = useState('');
  const setAuth = useAuthStore((state) => state.setAuth);
  const role = useAuthStore((state) => state.role);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        管理员运维工具页 (/gpu/**)
      </Typography.Title>

      <Card>
        <Form
          layout="vertical"
          onFinish={async (values: OpsFormValues) => {
            const parsedPayload = values.payload ? (JSON.parse(values.payload) as Record<string, string>) : {};
            const result = await runOpsToolApi(values.path, parsedPayload);
            setOutput(JSON.stringify(result, null, 2));
          }}
          initialValues={{ path: 'health/check', payload: '{"ping":"pong"}' }}
        >
          <Form.Item name="path" label="/gpu/ 之后的路径" rules={[{ required: true }]}>
            <Input placeholder="例如 cluster/rebalance" />
          </Form.Item>
          <Form.Item name="payload" label="JSON 请求体">
            <Input.TextArea rows={6} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            执行
          </Button>
        </Form>
      </Card>

      <Card title="手动获取 token">
        <Form
          layout="vertical"
          onFinish={async (values: TokenFormValues) => {
            try {
              setTokenLoading(true);
              const normalizedBaseUrl = values.baseUrl.replace(/\/$/, '');
              const url = import.meta.env.DEV
                ? '/__proxy_auth_token/api/v1/authentication/token'
                : `${normalizedBaseUrl}/api/v1/authentication/token`;
              const { data } = await axios.post<ApiResponse<LoginResponse>>(url, {
                username: values.username,
                password: values.password,
              }, {
                headers: import.meta.env.DEV ? { 'x-proxy-target': normalizedBaseUrl } : undefined,
              });
              const token = data.data.token;
              setTokenResult(token);
              setAuth({ token, username: data.data.username || values.username, role: data.data.role || role });
              message.success('token 获取成功，已写入当前登录态');
            } catch {
              message.error('获取 token 失败，请检查接口地址或确认后端是否允许跨域');
            } finally {
              setTokenLoading(false);
            }
          }}
          initialValues={{ baseUrl: window.location.origin }}
        >
          <Form.Item label="接口地址" name="baseUrl" rules={[{ required: true, message: '请输入接口地址' }]}>
            <Input placeholder="例如 http://localhost:8080" />
          </Form.Item>
          <Form.Item label="账号" name="username" rules={[{ required: true, message: '请输入账号' }]}>
            <Input placeholder="请输入账号" />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={tokenLoading}>
            获取 token
          </Button>
        </Form>
        <Typography.Paragraph style={{ marginTop: 12, marginBottom: 0 }} copyable={{ text: tokenResult || undefined }}>
          {tokenResult || '暂无 token'}
        </Typography.Paragraph>
        <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          开发环境下会通过 Vite 代理转发请求，减少浏览器跨域限制问题。
        </Typography.Paragraph>
      </Card>

      <Card title="执行结果">
        <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{output || '暂无结果'}</pre>
      </Card>
    </Space>
  );
}
