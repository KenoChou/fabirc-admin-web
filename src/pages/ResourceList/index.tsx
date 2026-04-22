import { Button, Card, Form, Input, Select, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchHostListApi } from '../../api/modules/resource';
import { PageState } from '../../components/PageState';
import type { HostItem, ResourceListRequest } from '../../types/resource';

export default function ResourceListPage() {
  const [form] = Form.useForm<ResourceListRequest>();
  const [data, setData] = useState<HostItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    const values = form.getFieldsValue();
    try {
      setLoading(true);
      setError('');
      const list = await fetchHostListApi(values);
      setData(list);
    } catch (e) {
      setError(e instanceof Error ? e.message : '获取主机资源失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        主机资源列表
      </Typography.Title>
      <Card>
        <Form form={form} layout="inline" onFinish={fetchData}>
          <Form.Item name="keyword" label="关键词">
            <Input placeholder="hostId / hostname" allowClear />
          </Form.Item>
          <Form.Item name="status" label="状态">
            <Select
              allowClear
              style={{ width: 140 }}
              options={[
                { value: 'running', label: '运行中' },
                { value: 'offline', label: '离线' },
              ]}
            />
          </Form.Item>
          <Form.Item name="region" label="区域">
            <Input placeholder="如 cn-hz-a" allowClear />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            筛选
          </Button>
          <Button onClick={fetchData}>刷新</Button>
        </Form>
      </Card>

      <Card>
        <PageState loading={loading} error={error} isEmpty={data.length === 0} onRetry={fetchData}>
          <Table
            rowKey="hostId"
            dataSource={data}
            columns={[
              { title: '主机 ID', dataIndex: 'hostId' },
              { title: '名称', dataIndex: 'hostname' },
              { title: '状态', dataIndex: 'status' },
              { title: '区域', dataIndex: 'region' },
              { title: 'GPU', dataIndex: 'gpuCount' },
              { title: 'CPU 使用率', dataIndex: 'cpuUsage', render: (v: number) => `${v}%` },
              { title: '内存使用率', dataIndex: 'memoryUsage', render: (v: number) => `${v}%` },
              {
                title: '操作',
                render: (_, row) => (
                  <Button type="link" onClick={() => navigate(`/monitor/${row.hostId}`)}>
                    查看监控
                  </Button>
                ),
              },
            ]}
          />
        </PageState>
      </Card>
    </Space>
  );
}
