import { Button, Card, Form, Input, Space, Table, Typography, message } from 'antd';
import { useState } from 'react';
import { hostOpenApi, hostOpenQueryApi } from '../../api/modules/open';
import { PageState } from '../../components/PageState';
import type { OpenQueryItem } from '../../types/open';

export default function OpenManagePage() {
  const [queryForm] = Form.useForm<{ orderId: string }>();
  const [queryList, setQueryList] = useState<OpenQueryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        开通管理
      </Typography.Title>

      <Card title="开通请求 /api/v1/compute/resource/host/open">
        <Form
          layout="vertical"
          onFinish={async (values: { hostId: string; orderId: string; operator: string }) => {
            await hostOpenApi(values);
            message.success('开通请求已发送');
          }}
        >
          <Form.Item name="hostId" label="Host ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="orderId" label="Order ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="operator" label="操作人" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            立即开通
          </Button>
        </Form>
      </Card>

      <Card title="开通查询 /api/v1/compute/resource/host/open/query">
        <Form
          form={queryForm}
          layout="inline"
          onFinish={async (values) => {
            try {
              setLoading(true);
              setError('');
              const data = await hostOpenQueryApi(values);
              setQueryList(data);
            } catch (e) {
              setError(e instanceof Error ? e.message : '查询失败');
            } finally {
              setLoading(false);
            }
          }}
        >
          <Form.Item name="orderId" label="Order ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            查询
          </Button>
        </Form>
        <div style={{ marginTop: 16 }}>
          <PageState
            loading={loading}
            error={error}
            isEmpty={queryList.length === 0}
            onRetry={() => queryForm.submit()}
            emptyDescription="请输入订单号并查询"
          >
            <Table
              rowKey={(row) => `${row.orderId}-${row.hostId}`}
              dataSource={queryList}
              columns={[
                { title: 'Order ID', dataIndex: 'orderId' },
                { title: 'Host ID', dataIndex: 'hostId' },
                { title: '状态', dataIndex: 'status' },
                { title: '更新时间', dataIndex: 'updatedAt' },
              ]}
            />
          </PageState>
        </div>
      </Card>
    </Space>
  );
}
