import { Button, Card, DatePicker, Form, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRunContributions } from '../../api/hooks/useContributions';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

const contributionHistory = [
  { key: '1', period: '2025-12', status: '✓ Completed', employees: 25, totalAmount: 'PKR 2.1M', date: '2025-12-28' },
  { key: '2', period: '2025-11', status: '✓ Completed', employees: 25, totalAmount: 'PKR 2.05M', date: '2025-11-28' },
  { key: '3', period: '2025-10', status: '✓ Completed', employees: 25, totalAmount: 'PKR 2.0M', date: '2025-10-28' },
];

export function ContributionsPage(): JSX.Element {
  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const runMutation = useRunContributions();

  return (
    <>
      <PageHeader title="Contribution Management" breadcrumb={['Contributions']} />
      
      <TutorialCard
        title="Monthly Contributions"
        description="Process monthly employee and employer contributions to PF accounts."
        businessContext="Contributions are typically run on the last day of each month. Both employees and employers contribute fixed percentages (usually 8.33% each) of gross salary to the provident fund."
        points={[
          'Select the month/year for the contribution run',
          'Confirm to trigger automatic posting to all active accounts',
          'System calculates employee and employer portions automatically',
          'Interest is also credited based on configured annual rate',
          'All transactions are logged for audit trail',
        ]}
      />

      <Card style={{ marginBottom: 16 }}>
        <Form layout="inline">
          <Form.Item label="Period">
            <DatePicker
              picker="month"
              value={dayjs(period, 'YYYY-MM')}
              onChange={(value) => setPeriod((value ?? dayjs()).format('YYYY-MM'))}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setConfirmOpen(true)}>
              Run Contributions
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ConfirmModal
        open={confirmOpen}
        title="Run Contribution Posting"
        content={`Trigger monthly run for ${period}?`}
        confirmLoading={runMutation.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          await runMutation.mutateAsync(period);
          setConfirmOpen(false);
          message.success('Contribution run triggered successfully');
        }}
      />

      <Card title="Recent Contribution Runs" style={{ marginTop: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
              <th style={{ padding: '8px' }}>Period</th>
              <th style={{ padding: '8px' }}>Status</th>
              <th style={{ padding: '8px' }}>Employees</th>
              <th style={{ padding: '8px' }}>Total Amount</th>
              <th style={{ padding: '8px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {contributionHistory.map(row => (
              <tr key={row.key} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={{ padding: '8px' }}>{row.period}</td>
                <td style={{ padding: '8px' }}>{row.status}</td>
                <td style={{ padding: '8px' }}>{row.employees}</td>
                <td style={{ padding: '8px' }}>{row.totalAmount}</td>
                <td style={{ padding: '8px' }}>{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </>
  );
}
