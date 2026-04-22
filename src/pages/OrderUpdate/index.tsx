import { Card, Form, Input, Select, Space, Typography, message } from 'antd';
import { ConfirmActionButton } from '../../components/ConfirmActionButton';
import { updateOrderStatusApi } from '../../api/modules/order';

interface OrderFormValues {
  orderId: string;
  status: string;
  remark: string;
}

export default function OrderUpdatePage() {
  const [form] = Form.useForm<OrderFormValues>();

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        订单状态更新
      </Typography.Title>

      <Card>
        <Form form={form} layout="vertical">
          <Form.Item name="orderId" label="订单号" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="status" label="目标状态" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'pending', value: 'pending' },
                { label: 'success', value: 'success' },
                { label: 'failed', value: 'failed' },
              ]}
            />
          </Form.Item>
          <Form.Item name="remark" label="备注">
            <Input.TextArea rows={3} />
          </Form.Item>

          <ConfirmActionButton
            title="确认更新订单状态"
            description="请确认订单号与目标状态正确，该操作将直接通知后端。"
            danger
            onConfirm={async () => {
              const values = await form.validateFields();
              await updateOrderStatusApi(values);
              message.success('订单状态更新成功');
            }}
          >
            更新状态
          </ConfirmActionButton>
        </Form>
      </Card>
    </Space>
  );
}
