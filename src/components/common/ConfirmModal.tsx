import { Modal } from 'antd';

export function ConfirmModal(props: {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
}): JSX.Element {
  return (
    <Modal
      open={props.open}
      title={props.title}
      onOk={props.onConfirm}
      onCancel={props.onCancel}
      confirmLoading={props.confirmLoading}
    >
      <p>{props.content}</p>
    </Modal>
  );
}
