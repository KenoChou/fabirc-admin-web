import { Button, Card, Form, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import { runOpsToolApi } from '../../api/modules/ops';

interface OpsFormValues {
  path: string;
  payload: string;
}

export default function OpsToolsPage() {
  const [output, setOutput] = useState('');

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

      <Card title="执行结果">
        <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{output || '暂无结果'}</pre>
      </Card>
    </Space>
  );
}
