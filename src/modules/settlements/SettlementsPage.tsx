import { Button, Card, Form, Input, message } from 'antd';
import { PageHeader } from '../../components/layout/PageHeader';
import { apiClient } from '../../api/client';
import { TutorialCard } from '../../components/common/TutorialCard';

export function SettlementsPage(): JSX.Element {
  return (
    <>
      <PageHeader title="Settlements" breadcrumb={['Settlements']} />
      
      <TutorialCard
        title="Final Settlement at Retirement"
        description="Calculate and process final PF settlement when an employee retires or leaves the organization."
        businessContext="At retirement or resignation, the employee's accumulated fund is settled. Tax is deducted based on tenure (6+ years = 0%, 3-5 years = 5%, 0-2 years = 10%). The net amount is paid to the employee or nominee."
        points={[
          'Enter employee account ID to initiate settlement',
          'System calculates tenure-based tax automatically',
          'Shows gross balance, tax deduction, and net payable',
          'Settlement can be processed immediately after approval',
          'Payment details and tax certificate are generated',
        ]}
      />
      
      <Card title="🏁 Initiate Settlement">
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
