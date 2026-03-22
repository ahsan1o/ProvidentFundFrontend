import { Button, Card, Form, Input, message } from 'antd';
import { PageHeader } from '../../components/layout/PageHeader';
import { apiClient } from '../../api/client';

export function SettlementsPage(): JSX.Element {
  return (
    <>
      <PageHeader title="Settlements" breadcrumb={['Settlements']} />
      <Card title="Initiate Settlement">
        <Form
          layout="vertical"
          onFinish={async (values: { accountId: string }) => {
            await apiClient.post(`/settlements/initiate/${values.accountId}`);
            message.success('Settlement initiated');
          }}
        >
          <Form.Item label="Account ID" name="accountId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">Initiate</Button>
        </Form>
      </Card>
    </>
  );
}
