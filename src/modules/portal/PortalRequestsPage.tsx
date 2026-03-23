import { Button, Card, Form, Input, InputNumber, Space, message } from 'antd';
import { useCreateLoan } from '../../api/hooks/useLoans';
import { useCreateWithdrawal } from '../../api/hooks/useWithdrawals';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

export function PortalRequestsPage(): JSX.Element {
  const withdrawal = useCreateWithdrawal();
  const loan = useCreateLoan();

  return (
    <>
      <PageHeader title="📝 My Requests (Withdrawals & Loans)" breadcrumb={['Portal', 'Requests']} />
      
      <TutorialCard
        title="Employee Self-Service Requests"
        description="Employees can directly apply for withdrawals or loans through this page without visiting HR."
        businessContext="Instead of HR manually processing requests, employees submit them digitally. The system auto-validates (is the amount available? is tenure sufficient?), routes to managers for approval, and processes automatically. This reduces paperwork, speeds up processing, and gives employees control."
        points={[
          'Withdrawals: For emergencies, medical, education—must meet policy requirements',
          'Loans: Borrow up to 50% of balance at negotiated tenure (1-5 years), auto-deducted from salary',
          'Workflow: You submit → Manager approves → System calculates taxes/deductions → Money transferred',
          'Integration: Integrates with payroll (auto-deduct loans), approval workflows (manager notifications), and finance system (balance updates)',
          'Transparency: Track request status in real-time from submission to payment',
          'Audit trail: Every request timestamped and logged for compliance',
        ]}
      />

      <Space direction="vertical" size={24} style={{ width: '100%', marginTop: 24 }}>
        <Card 
          title="💰 Request Withdrawal (Emergency/Medical/Education)"
          style={{ borderTop: '4px solid #faad14' }}
        >
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>When to use:</strong> You need access to your own money for emergency, medical expenses, or education. You'll pay taxes based on how long you've worked (6+ years = tax-free).
          </p>
          <Form
            layout="vertical"
            onFinish={async (values: { accountId: string; amount: string; notes?: string }) => {
              await withdrawal.mutateAsync(values);
              message.success('Withdrawal request submitted');
            }}
          >
            <Form.Item label="Account ID" name="accountId" rules={[{ required: true }]}>
              <Input placeholder="Your 12-digit account number" />
            </Form.Item>
            <Form.Item label="Withdrawal Amount (PKR)" name="amount" rules={[{ required: true }]}>
              <Input placeholder="e.g., 500000" />
            </Form.Item>
            <Form.Item label="Reason (required for approval)" name="notes">
              <Input.TextArea 
                rows={3} 
                placeholder="e.g., Medical treatment bill / Emergency home repair / Child's school fees"
              />
            </Form.Item>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              ⏱️ <strong>Processing time:</strong> 5-7 business days after manager approval
            </p>
            <Button type="primary" htmlType="submit" loading={withdrawal.isPending}>Submit Withdrawal Request</Button>
          </Form>
        </Card>

        <Card 
          title="🏦 Apply for Loan (Against Your PF Balance)"
          style={{ borderTop: '4px solid #1890ff' }}
        >
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>When to use:</strong> You need cash but want to keep your PF growing. Borrow up to 50% of your balance. The loan is paid back through monthly salary deductions over your chosen period (1-5 years).
          </p>
          <Form
            layout="vertical"
            onFinish={async (values: { accountId: string; amount: string; tenureMonths: number }) => {
              await loan.mutateAsync(values);
              message.success('Loan application submitted');
            }}
          >
            <Form.Item label="Account ID" name="accountId" rules={[{ required: true }]}>
              <Input placeholder="Your 12-digit account number" />
            </Form.Item>
            <Form.Item label="Loan Amount (Max 50% of Balance)" name="amount" rules={[{ required: true }]}>
              <Input placeholder="e.g., 600000" />
            </Form.Item>
            <Form.Item label="Repayment Period (Months)" name="tenureMonths" rules={[{ required: true }]}>
              <InputNumber 
                min={12} 
                max={60} 
                style={{ width: '100%' }}
                placeholder="12-60 months (1-5 years)"
              />
            </Form.Item>
            <p style={{ fontSize: '12px', color: '#999', marginTop: '8px' }}>
              💡 <strong>Tip:</strong> Shorter tenure = higher monthly payment but less interest. Example: PKR 600,000 over 24 months = ~PKR 25,000/month deducted from your salary.
            </p>
            <Button type="primary" htmlType="submit" loading={loan.isPending}>Submit Loan Application</Button>
          </Form>
        </Card>
      </Space>
    </>
  );
}
