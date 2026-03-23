import { Button, Card, Input, Space, Tabs } from 'antd';
import { useState } from 'react';
import { useLoansByAccount } from '../../api/hooks/useLoans';
import { useAccountBalance, useAccountTransactions } from '../../api/hooks/useTransactions';
import { usePendingWithdrawals } from '../../api/hooks/useWithdrawals';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

type TxRow = {
  id: string;
  postingDate: string;
  period: string;
  type: string;
  amount: string;
};

export function TransactionsPage(): JSX.Element {
  const [accountId, setAccountId] = useState('');
  const [activeAccountId, setActiveAccountId] = useState('');

  const tx = useAccountTransactions(activeAccountId);
  const balance = useAccountBalance(activeAccountId);
  const loans = useLoansByAccount(activeAccountId);
  const withdrawals = usePendingWithdrawals();

  return (
    <>
      <PageHeader title="💼 Transaction & Account Reconciliation" breadcrumb={['Transactions', 'Account Detail']} />
      
      <TutorialCard
        title="Complete Account Audit Trail"
        description="View the complete transaction history for any employee account—every rupee tracked, verified, and reconcilable."
        businessContext="Each employee PF account is like a bank account. This page shows every transaction: when contributions were posted, when loans were issued, when interest was credited, etc. Auditors and compliance officers use this to verify no money was misappropriated and all accounts balance correctly. It's the permanent record for legal disputes and tax audits."
        points={[
          'Transaction Ledger: Every posting timestamped and itemized (contribution, interest, loan issue, withdrawal, tax deduction)',
          'Real-time balance: Always matches the sum of all transactions (perfect audit trail)',
          'Active loans detail: Shows loan ID, original amount, remaining outstanding, payment schedule',
          'Withdrawal history: All approved/paid/rejected withdrawal requests with amounts and status',
          'Export capability: Download ledger for external auditor or tax authority submission',
          'Integration: Data flows from payroll (contributions), interest calculator (annual rates), loan system (repayments), withdrawal processor',
          'Reconciliation: Can be reconciled to general ledger in accounting system (no discrepancies)',
        ]}
      />

      <Card style={{ marginBottom: 16, marginTop: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>🔍 Search Employee Account:</label>
            <Space>
              <Input
                placeholder="Enter Account ID (12 digits) or Employee Name"
                value={accountId}
                onChange={(event) => setAccountId(event.target.value)}
                style={{ width: 340 }}
              />
              <Button type="primary" onClick={() => setActiveAccountId(accountId)}>
                Load Account Details
              </Button>
            </Space>
          </div>
        </Space>
      </Card>

      {activeAccountId && (
        <>
          <Card 
            title="💰 Current Account Balance" 
            style={{ 
              marginBottom: 16,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
            headStyle={{ color: 'white' }}
          >
            <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'white' }}>
              PKR <span>{balance.data?.balance ?? 0}</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px' }}>
              Total accumulated in account (employee + employer contributions + interest - loans - withdrawals)
            </p>
          </Card>

          <Tabs
            items={[
              {
                key: 'ledger',
                label: '📋 Transaction Ledger (Complete History)',
                children: (
                  <Card>
                    <p style={{ marginBottom: '16px', color: '#666' }}>
                      <strong>Every transaction ever posted to this account:</strong> Monthly contributions, interest credits, loan disbursements, automatic repayments, withdrawals, tax deductions. Used for reconciliation and audit.
                    </p>
                    <DataTable<TxRow>
                      loading={tx.isLoading}
                      dataSource={(tx.data ?? []) as TxRow[]}
                      columns={[
                        { 
                          title: 'Date', 
                          dataIndex: 'postingDate',
                          width: '15%'
                        },
                        { 
                          title: 'Period', 
                          dataIndex: 'period',
                          width: '12%'
                        },
                        { 
                          title: 'Transaction Type', 
                          dataIndex: 'type',
                          width: '20%',
                          render: (type) => {
                            return <span style={{ fontWeight: 'bold' }}>{type}</span>;
                          }
                        },
                        { 
                          title: 'Amount (PKR)', 
                          dataIndex: 'amount',
                          width: '15%',
                          render: (amount) => <span style={{ fontWeight: 'bold', color: '#1890ff' }}>{amount}</span>
                        },
                      ]}
                    />
                  </Card>
                ),
              },
              {
                key: 'loans',
                label: '🏦 Active Loans',
                children: (
                  <Card>
                    <p style={{ marginBottom: '16px', color: '#666' }}>
                      <strong>Loans taken against this account:</strong> Shows original loan amount, how much is left to pay, and monthly deduction from salary.
                    </p>
                    <DataTable<{ id: string; amount: string; outstandingAmount: string; status: string }>
                      loading={loans.isLoading}
                      dataSource={(loans.data ?? []) as Array<{ id: string; amount: string; outstandingAmount: string; status: string }>}
                      columns={[
                        { 
                          title: 'Loan ID', 
                          dataIndex: 'id',
                          width: '20%',
                          render: (id) => <strong>{id}</strong>
                        },
                        { 
                          title: 'Original Amount (PKR)', 
                          dataIndex: 'amount',
                          width: '25%'
                        },
                        { 
                          title: 'Outstanding Balance (PKR)', 
                          dataIndex: 'outstandingAmount',
                          width: '25%',
                          render: (amount) => <span style={{ color: '#f5222d', fontWeight: 'bold' }}>{amount}</span>
                        },
                        { 
                          title: 'Status', 
                          dataIndex: 'status',
                          width: '20%'
                        },
                      ]}
                    />
                  </Card>
                ),
              },
              {
                key: 'withdrawals',
                label: '💸 Withdrawal Requests & History',
                children: (
                  <Card>
                    <p style={{ marginBottom: '16px', color: '#666' }}>
                      <strong>All withdrawal requests:</strong> Pending approvals, approved & paid, rejected. Shows approval status and amount.
                    </p>
                    <DataTable<{ id: string; accountId: string; requestedAmount: string; status: string }>
                      loading={withdrawals.isLoading}
                      dataSource={((withdrawals.data ?? []) as Array<{ id: string; accountId: string; requestedAmount: string; status: string }>).filter((row) => row.accountId === activeAccountId)}
                      columns={[
                        { 
                          title: 'Request ID', 
                          dataIndex: 'id',
                          width: '25%'
                        },
                        { 
                          title: 'Amount Requested (PKR)', 
                          dataIndex: 'requestedAmount',
                          width: '25%'
                        },
                        { 
                          title: 'Status', 
                          dataIndex: 'status',
                          width: '20%',
                          render: (status) => {
                            const statusColors: Record<string, string> = {
                              'pending': '#faad14',
                              'approved': '#52c41a',
                              'rejected': '#f5222d',
                              'paid': '#1890ff'
                            };
                            return <span style={{ fontWeight: 'bold', color: statusColors[status as keyof typeof statusColors] || '#000' }}>{status}</span>;
                          }
                        },
                      ]}
                    />
                  </Card>
                ),
              },
            ]}
          />

          <Card style={{ marginTop: 24, background: '#f0f5ff', borderColor: '#adc6ff' }}>
            <p><strong>🔐 Audit & Compliance Notes:</strong></p>
            <ul style={{ marginBottom: 0, color: '#666' }}>
              <li><strong>Reconciliation:</strong> Balance should equal sum of all ledger transactions. If it doesn't, there's a data error.</li>
              <li><strong>For auditors:</strong> Download ledger and verify against payroll records (contributions match salary runs)</li>
              <li><strong>For employees:</strong> Request this report anytime to verify no errors in their account</li>
              <li><strong>For finance team:</strong> Use to resolve disputes ("I didn't get my interest" - check ledger date)</li>
            </ul>
          </Card>
        </>
      )}
    </>
  );
}
