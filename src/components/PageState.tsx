import { Button, Empty, Result, Spin } from 'antd';
import type { ReactNode } from 'react';

interface PageStateProps {
  loading: boolean;
  error: string;
  isEmpty: boolean;
  onRetry: () => void;
  children: ReactNode;
  emptyDescription?: string;
}

export function PageState({ loading, error, isEmpty, onRetry, children, emptyDescription }: PageStateProps) {
  if (loading) {
    return <Spin size="large" spinning style={{ display: 'block', margin: '48px auto' }} />;
  }

  if (error) {
    return (
      <Result
        status="error"
        title="请求失败"
        subTitle={error}
        extra={
          <Button type="primary" onClick={onRetry}>
            重试
          </Button>
        }
      />
    );
  }

  if (isEmpty) {
    return (
      <Empty description={emptyDescription ?? '暂无数据'}>
        <Button onClick={onRetry}>刷新</Button>
      </Empty>
    );
  }

  return <>{children}</>;
}
