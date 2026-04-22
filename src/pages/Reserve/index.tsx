import { Button, Card, Form, Input, Space, Typography, message } from 'antd';
import { reserveNotifyApi, reserveReleaseApi } from '../../api/modules/reserve';
import { ConfirmActionButton } from '../../components/ConfirmActionButton';

interface ReserveValues {
  hostId: string;
  orderId: string;
  reason: string;
}

interface ReleaseValues {
  reserveId: string;
  reason: string;
}

export default function ReservePage() {
  const [reserveForm] = Form.useForm<ReserveValues>();
  const [releaseForm] = Form.useForm<ReleaseValues>();

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        预占管理
      </Typography.Title>

      <Card title="预占通知 /api/v1/compute/resource/reserve/notify">
        <Form
          form={reserveForm}
          layout="vertical"
          onFinish={async (values) => {
            await reserveNotifyApi(values);
            message.success('预占通知成功');
          }}
        >
          <Form.Item name="hostId" label="Host ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="orderId" label="Order ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="reason" label="原因" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            预占
          </Button>
        </Form>
      </Card>

      <Card title="释放预占 /api/v1/compute/resource/reserve/release">
        <Form form={releaseForm} layout="vertical">
          <Form.Item name="reserveId" label="Reserve ID" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="reason" label="释放原因" rules={[{ required: true }]}>
            <Input.TextArea rows={3} />
          </Form.Item>
          <ConfirmActionButton
            title="确认释放预占"
            description="该操作不可撤销，请确认是否继续释放。"
            danger
            onConfirm={async () => {
              const values = await releaseForm.validateFields();
              await reserveReleaseApi(values);
              message.success('释放成功');
            }}
          >
            释放
          </ConfirmActionButton>
        </Form>
      </Card>
    </Space>
  );
}
