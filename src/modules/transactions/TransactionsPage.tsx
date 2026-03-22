import { Button, Card, Input, Space, Tabs } from 'antd';
import { useState } from 'react';
import { useLoansByAccount } from '../../api/hooks/useLoans';
import { useAccountBalance, useAccountTransactions } from '../../api/hooks/useTransactions';
import { usePendingWithdrawals } from '../../api/hooks/useWithdrawals';
import { AmountDisplay } from '../../components/common/AmountDisplay';
import { DataTable } from '../../components/common/DataTable';
import { PageHeader } from '../../components/layout/PageHeader';

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
      <PageHeader title="PF Account Detail" breadcrumb={['Transactions', 'Account Detail']} />
      <Card style={{ marginBottom: 12 }}>
        <Space>
          <Input
            placeholder="Enter Account ID"
            value={accountId}
            onChange={(event) => setAccountId(event.target.value)}
            style={{ width: 340 }}
          />
          <Button type="primary" onClick={() => setActiveAccountId(accountId)}>Load Account</Button>
        </Space>
      </Card>

      <Card title="Account Summary" style={{ marginBottom: 12 }}>
        <AmountDisplay value={balance.data?.balance ?? 0} />
      </Card>

      <Tabs
        items={[
          {
            key: 'ledger',
            label: 'Transaction Ledger',
            children: (
              <DataTable<TxRow>
                loading={tx.isLoading}
                dataSource={(tx.data ?? []) as TxRow[]}
                columns={[
                  { title: 'Date', dataIndex: 'postingDate' },
                  { title: 'Period', dataIndex: 'period' },
                  { title: 'Type', dataIndex: 'type' },
                  { title: 'Amount', dataIndex: 'amount' },
                ]}
              />
            ),
          },
          {
            key: 'loans',
            label: 'Active Loan',
            children: (
              <DataTable<{ id: string; amount: string; outstandingAmount: string; status: string }>
                loading={loans.isLoading}
                dataSource={(loans.data ?? []) as Array<{ id: string; amount: string; outstandingAmount: string; status: string }>}
                columns={[
                  { title: 'Loan ID', dataIndex: 'id' },
                  { title: 'Amount', dataIndex: 'amount' },
                  { title: 'Outstanding', dataIndex: 'outstandingAmount' },
                  { title: 'Status', dataIndex: 'status' },
                ]}
              />
            ),
          },
          {
            key: 'withdrawals',
            label: 'Withdrawal History',
            children: (
              <DataTable<{ id: string; accountId: string; requestedAmount: string; status: string }>
                loading={withdrawals.isLoading}
                dataSource={((withdrawals.data ?? []) as Array<{ id: string; accountId: string; requestedAmount: string; status: string }>).filter((row) => row.accountId === activeAccountId)}
                columns={[
                  { title: 'Request ID', dataIndex: 'id' },
                  { title: 'Amount', dataIndex: 'requestedAmount' },
                  { title: 'Status', dataIndex: 'status' },
                ]}
              />
            ),
          },
        ]}
      />
    </>
  );
}
