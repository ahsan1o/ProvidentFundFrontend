import { Breadcrumb, Space, Typography } from 'antd';

export function PageHeader(props: { title: string; breadcrumb: string[]; actions?: JSX.Element }): JSX.Element {
  return (
    <div style={{ marginBottom: 16 }}>
      <Space direction="vertical" size={4} style={{ width: '100%' }}>
        <Breadcrumb items={props.breadcrumb.map((item) => ({ title: item }))} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography.Title level={4} style={{ margin: 0 }}>{props.title}</Typography.Title>
          {props.actions}
        </div>
      </Space>
    </div>
  );
}
