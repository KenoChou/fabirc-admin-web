import { Button, Modal } from 'antd';

interface ConfirmActionButtonProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  danger?: boolean;
  children: string;
}

export function ConfirmActionButton({ title, description, onConfirm, danger, children }: ConfirmActionButtonProps) {
  const confirm = () => {
    Modal.confirm({
      title,
      content: description,
      okText: '确认',
      cancelText: '取消',
      okButtonProps: { danger },
      onOk: onConfirm,
    });
  };

  return (
    <Button danger={danger} onClick={confirm}>
      {children}
    </Button>
  );
}
