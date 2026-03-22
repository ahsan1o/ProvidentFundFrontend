import { Tag } from 'antd';

const statusColor: Record<string, string> = {
  ACTIVE: 'green',
  PENDING: 'gold',
  APPROVED: 'blue',
  REJECTED: 'red',
  SETTLED: 'default',
  SUSPENDED: 'orange',
};

export function StatusBadge({ status }: { status: string }): JSX.Element {
  return <Tag color={statusColor[status] ?? 'default'}>{status}</Tag>;
}
