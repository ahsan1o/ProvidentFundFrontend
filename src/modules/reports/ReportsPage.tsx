import { Button, Card, DatePicker, Select, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useMonthlyContributionReport } from '../../api/hooks/useReports';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

export function ReportsPage(): JSX.Element {
  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'));
  const [type, setType] = useState('monthly-contributions');
  const { data, isLoading } = useMonthlyContributionReport(period);

  const rows = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return (
    <>
      <PageHeader title="📊 Reports & Analytics" breadcrumb={['Reports']} />
      
      <TutorialCard
        title="Business Intelligence & Compliance Dashboard"
        description="Generate comprehensive reports to monitor fund health, track obligations, and comply with regulatory requirements."
        businessContext="CFOs and Compliance Officers need dashboards to answer critical questions: How much money do we owe employees? Is our contribution pace healthy? What's our tax liability? These reports auto-calculate from ledgers, eliminating manual spreadsheets and ensuring accuracy for audits and stakeholder reporting."
        points={[
          'Monthly Contributions: See total $ posted each month (employees + employer contributions)',
          'Total Liability: How much the organization owes to all employees combined (actual obligation)',
          'Loan Outstanding: Total borrowed by employees (will be repaid through salary deductions)',
          'Tax Summary: Estimated tax collected from employees on next settlement (for compliance planning)',
          'Export to PDF/Excel: Generate official reports for board meetings, bank submissions, auditor reviews',
          'Integration: Data auto-pulls from transaction ledger, refreshes daily, can be emailed to stakeholders',
          'Compliance use: Shows regulator (e.g., tax authority) that funds are properly managed and auditable',
        ]}
      />

      <Card style={{ marginTop: 24 }}>
        <Space style={{ marginBottom: 20 }}>
          <Select
            value={type}
            onChange={setType}
            style={{ width: 220 }}
            options={[
              { 
                value: 'monthly-contributions', 
                label: '💰 Monthly Contributions' 
              },
              { 
                value: 'total-liability', 
                label: '📈 Total Liability (What We Owe)' 
              },
              { 
                value: 'loan-outstanding', 
                label: '🏦 Loans Outstanding' 
              },
              { 
                value: 'tax-summary', 
                label: '🧾 Tax Summary (Settlement Tax)' 
              },
            ]}
          />
          <DatePicker
            picker="month"
            value={dayjs(period, 'YYYY-MM')}
            onChange={(value) => setPeriod((value ?? dayjs()).format('YYYY-MM'))}
          />
          <Button type="primary">📥 Export PDF Report</Button>
          <Button>📊 Export Excel Data</Button>
        </Space>

        <Card 
          title={type === 'monthly-contributions' ? "💰 How Much We Contributed This Month?" : 
                  type === 'total-liability' ? "📈 What Do We Owe Employees Right Now?" :
                  type === 'loan-outstanding' ? "🏦 How Much Are Employees Borrowing?" :
                  "🧾 How Much Tax Will We Collect?"}
          style={{ marginBottom: 16, background: '#fafafa' }}
        >
          <p style={{ color: '#666', marginBottom: '8px' }}>
            {type === 'monthly-contributions' && "Total amounts posted to all employee accounts (employee deduction + company payment + interest). Higher = healthier fund growth."}
            {type === 'total-liability' && "Total owed to all employees if the fund closed today. CFO uses this for balance sheet accounting and financial planning."}
            {type === 'loan-outstanding' && "Amount currently borrowed by employees. Gets repaid through salary deductions. Shows employee borrowing demand."}
            {type === 'tax-summary' && "Estimated tax to be collected from employees on next settlement event. Used for tax planning and compliance."}
          </p>
        </Card>

        <Table
          loading={isLoading}
          dataSource={rows}
          rowKey={(row) => row.type as string}
          pagination={false}
          columns={[
            { 
              title: 'Category', 
              dataIndex: 'type',
              render: (text) => <strong>{text}</strong>
            },
            { 
              title: `Amount (${period})`, 
              render: (_, item) => {
                const amount = item?._sum?.amount ?? 0;
                return <span style={{ fontSize: '16px', color: '#1890ff', fontWeight: 'bold' }}>
                  PKR {typeof amount === 'number' ? amount.toLocaleString() : amount}
                </span>;
              }
            },
            { 
              title: 'Usage', 
              render: () => {
                if (type === 'monthly-contributions') return 'Growth metric - shows fund momentum';
                if (type === 'total-liability') return 'Balance sheet item - financial liability';
                if (type === 'loan-outstanding') return 'Accounts payable - will be recovered';
                return 'Tax planning - future cash outflow';
              }
            },
          ]}
        />

        <Card style={{ marginTop: 16, background: '#e6f7ff', borderColor: '#91d5ff' }}>
          <p><strong>💡 How to use this report:</strong></p>
          <ul style={{ marginBottom: 0 }}>
            <li><strong>Board Meeting:</strong> Export and present monthly contribution trends to show financial health</li>
            <li><strong>Audit:</strong> Send to external auditor to verify fund balances and transactions</li>
            <li><strong>Tax Planning:</strong> Use tax summary to estimate withholding obligations quarterly</li>
            <li><strong>Cash Flow:</strong> Track loan repayments to forecast salary deduction impact</li>
          </ul>
        </Card>
      </Card>
    </>
  );
}
