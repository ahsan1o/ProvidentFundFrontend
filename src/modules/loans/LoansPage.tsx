import { Card, Form, Input, InputNumber, Button, message } from 'antd';
import { useCreateLoan } from '../../api/hooks/useLoans';
import { PageHeader } from '../../components/layout/PageHeader';

export function LoansPage(): JSX.Element {
  const createLoan = useCreateLoan();

  return (
    <>
      <PageHeader title="Loan Management" breadcrumb={['Loans']} />
      <Card title="Apply Loan">
        <Form
          layout="vertical"
          onFinish={async (values: { accountId: string; amount: string; tenureMonths: number }) => {
            await createLoan.mutateAsync(values);
            message.success('Loan request submitted');
          }}
        >
          <Form.Item label="Account ID" name="accountId" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Tenure (Months)" name="tenureMonths" rules={[{ required: true }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={createLoan.isPending}>Submit</Button>
        </Form>
      </Card>
    </>
  );
}
