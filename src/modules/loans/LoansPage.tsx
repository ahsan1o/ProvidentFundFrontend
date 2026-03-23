import { Card, Form, Input, InputNumber, Button, message, Space, Typography } from 'antd';
import { useCreateLoan } from '../../api/hooks/useLoans';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

export function LoansPage(): JSX.Element {
  const createLoan = useCreateLoan();

  return (
    <>
      <PageHeader title="Loan Management" breadcrumb={['Loans']} />
      
      <TutorialCard
        title="PF Loans"
        description="Employees can take loans against their accumulated provident fund balance."
        businessContext="PF loans are a benefit allowing employees to borrow against their fund balance at favorable interest rates (usually 2-3% annual). Loans are auto-deducted from monthly contributions."
        points={[
          'Maximum loan is typically 50% of PF balance',
          'Repayment period can be 12-60 months',
          'Interest is charged at special PF loan rates',
          'Loans cannot be taken if pending withdrawal approval',
          'All loans are secured against the PF balance',
        ]}
      />
      
      <Card title="💰 Apply for PF Loan" style={{ marginBottom: 16 }}>
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
