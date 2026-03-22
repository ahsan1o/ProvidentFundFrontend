import { Button, Space } from 'antd';

export function ApprovalActions(props: {
  onApprove: () => void;
  onReject: () => void;
  disabled?: boolean;
}): JSX.Element {
  return (
    <Space>
      <Button type="primary" onClick={props.onApprove} disabled={props.disabled}>Approve</Button>
      <Button danger onClick={props.onReject} disabled={props.disabled}>Reject</Button>
    </Space>
  );
}
