import { message } from 'antd';
import { usePendingWithdrawals } from '../../api/hooks/useWithdrawals';
import { ApprovalActions } from '../../components/common/ApprovalActions';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/layout/PageHeader';

type WithdrawalRow = {
  id: string;
  accountId: string;
  requestedAmount: string;
  status: string;
  makerNotes?: string;
};

export function WithdrawalsPage(): JSX.Element {
  const { data, isLoading } = usePendingWithdrawals();

  return (
    <>
      <PageHeader title="Withdrawal Requests" breadcrumb={['Withdrawals']} />
      <DataTable<WithdrawalRow>
        loading={isLoading}
        dataSource={(data ?? []) as WithdrawalRow[]}
        columns={[
          { title: 'Request ID', dataIndex: 'id' },
          { title: 'Account', dataIndex: 'accountId' },
          { title: 'Amount', dataIndex: 'requestedAmount' },
          { title: 'Status', render: (_, row) => <StatusBadge status={row.status} /> },
          { title: 'Notes', dataIndex: 'makerNotes' },
          {
            title: 'Actions',
            render: () => (
              <ApprovalActions
                onApprove={() => message.info('Approve action can be wired to endpoint')}
                onReject={() => message.info('Reject action can be wired to endpoint')}
              />
            ),
          },
        ]}
      />
    </>
  );
}
