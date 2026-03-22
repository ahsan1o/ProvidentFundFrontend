import { Space, Typography } from 'antd';

export function AuditInfo(props: { createdBy?: string; createdAt?: string; approvedBy?: string; approvedAt?: string }): JSX.Element {
  return (
    <Space direction="vertical" size={2}>
      <Typography.Text type="secondary">Created By: {props.createdBy ?? 'N/A'}</Typography.Text>
      <Typography.Text type="secondary">Created At: {props.createdAt ?? 'N/A'}</Typography.Text>
      <Typography.Text type="secondary">Approved By: {props.approvedBy ?? 'N/A'}</Typography.Text>
      <Typography.Text type="secondary">Approved At: {props.approvedAt ?? 'N/A'}</Typography.Text>
    </Space>
  );
}
