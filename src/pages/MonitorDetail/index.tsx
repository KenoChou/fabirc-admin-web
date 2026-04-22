import { Button, Card, Space, Typography } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchHostMonitorApi } from '../../api/modules/resource';
import { PageState } from '../../components/PageState';
import type { MonitorPoint } from '../../types/resource';

export default function MonitorDetailPage() {
  const { hostId = '' } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [list, setList] = useState<MonitorPoint[]>([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchHostMonitorApi({ hostId });
      setList(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : '获取监控失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [hostId]);

  const option = useMemo(
    () => ({
      tooltip: { trigger: 'axis' },
      legend: { data: ['CPU', 'GPU', 'MEM'] },
      xAxis: { type: 'category', data: list.map((i) => i.timestamp) },
      yAxis: { type: 'value', min: 0, max: 100 },
      series: [
        { name: 'CPU', type: 'line', data: list.map((i) => i.cpuUsage) },
        { name: 'GPU', type: 'line', data: list.map((i) => i.gpuUsage) },
        { name: 'MEM', type: 'line', data: list.map((i) => i.memoryUsage) },
      ],
    }),
    [list],
  );

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <Space>
        <Button onClick={() => navigate(-1)}>返回</Button>
        <Typography.Title level={4} style={{ margin: 0 }}>
          主机监控详情 - {hostId}
        </Typography.Title>
      </Space>

      <Card>
        <PageState loading={loading} error={error} isEmpty={list.length === 0} onRetry={fetchData}>
          <ReactECharts option={option} style={{ height: 420 }} />
        </PageState>
      </Card>
    </Space>
  );
}
