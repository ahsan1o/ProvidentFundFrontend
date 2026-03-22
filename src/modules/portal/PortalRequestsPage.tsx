import { Button, Card, Form, Input, InputNumber, Space, message } from 'antd';
import { useCreateLoan } from '../../api/hooks/useLoans';
import { useCreateWithdrawal } from '../../api/hooks/useWithdrawals';
import { PageHeader } from '../../components/layout/PageHeader';

export function PortalRequestsPage(): JSX.Element {
  const withdrawal = useCreateWithdrawal();
  const loan = useCreateLoan();

  return (
    <>
      <PageHeader title="Portal Requests" breadcrumb={['Portal', 'Requests']} />
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <Card title="Request Withdrawal">
          <Form
            layout="vertical"
            onFinish={async (values: { accountId: string; amount: string; notes?: string }) => {
              await withdrawal.mutateAsync(values);
              message.success('Withdrawal request submitted');
            }}
          >
            <Form.Item label="Account ID" name="accountId" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Notes" name="notes">
              <Input.TextArea rows={3} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={withdrawal.isPending}>Submit Withdrawal</Button>
          </Form>
        </Card>

        <Card title="Apply for Loan">
          <Form
            layout="vertical"
            onFinish={async (values: { accountId: string; amount: string; tenureMonths: number }) => {
              await loan.mutateAsync(values);
              message.success('Loan application submitted');
            }}
          >
            <Form.Item label="Account ID" name="accountId" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Tenure Months" name="tenureMonths" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loan.isPending}>Submit Loan</Button>
          </Form>
        </Card>
      </Space>
    </>
  );
}
