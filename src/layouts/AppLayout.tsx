import { Layout, Menu, Typography, Button, Space } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useAuthStore } from '../store/auth';
import { ROLE } from '../constants';

const { Header, Content, Sider } = Layout;

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { username, role, clearAuth } = useAuthStore();

  const items = useMemo(() => {
    const base = [
      { key: '/resource-list', label: <Link to="/resource-list">主机资源</Link> },
      { key: '/reserve', label: <Link to="/reserve">预占管理</Link> },
      { key: '/open-manage', label: <Link to="/open-manage">开通管理</Link> },
      { key: '/order-update', label: <Link to="/order-update">订单更新</Link> },
    ];

    if (role === ROLE.admin) {
      base.push({ key: '/ops-tools', label: <Link to="/ops-tools">运维工具 /gpu</Link> });
    }

    return base;
  }, [role]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light">
        <div style={{ padding: 16, fontWeight: 700 }}>Fabric Admin</div>
        <Menu selectedKeys={[location.pathname]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
          <Space style={{ float: 'right' }}>
            <Typography.Text>{username || '未登录用户'}</Typography.Text>
            <Typography.Text type="secondary">角色: {role}</Typography.Text>
            <Button
              onClick={() => {
                clearAuth();
                navigate('/login');
              }}
            >
              退出登录
            </Button>
          </Space>
        </Header>
        <Content style={{ padding: 20 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
