import { Drawer, Input, Space, Typography, Tag, Statistic, Divider } from 'antd';
import { useMemo, useState } from 'react';
import { useAccounts } from '../../api/hooks/useAccounts';
import { AmountDisplay } from '../../components/common/AmountDisplay';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

type AccountRow = {
  id: string;
  accountNumber: string;
  status: string;
  enrolledAt: string;
  employeeSnapshot: {
    employeeId: string;
    fullName: string;
  };
};

export function PfAccountsPage(): JSX.Element {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<AccountRow | null>(null);
  const { data, isLoading } = useAccounts();

  const rows = useMemo(() => {
    const items = (data ?? []) as AccountRow[];
    if (!query.trim()) return items;
    return items.filter((item) =>
      `${item.employeeSnapshot.employeeId} ${item.employeeSnapshot.fullName}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
  }, [data, query]);

  return (
    <>
      <PageHeader title="PF Accounts" breadcrumb={['PF Accounts']} />
      
      <TutorialCard
        title="Individual PF Accounts"
        description="Browse and manage individual employee provident fund accounts."
        businessContext="Each enrolled employee has a unique PF account that tracks their contributions, interest, loans, and pending requests. Accounts show real-time balance and transaction history."
        points={[
          'Search employees by ID or name to find their account',
          'Click any account to view detailed balance and history',
          'Account shows gross balance minus any outstanding loans',
          'Track monthly contribution credits and interest earnings',
          'View pending withdrawals and loan applications',
        ]}
      />
      
      <Space style={{ marginBottom: 12, width: '100%' }}>
        <Input.Search
          allowClear
          placeholder="Search by employee ID or name"
          onChange={(event) => setQuery(event.target.value)}
          style={{ width: 320 }}
        />
      </Space>
      <DataTable<AccountRow>
        loading={isLoading}
        dataSource={rows}
        onRow={(record) => ({ onClick: () => setSelected(record) })}
        columns={[
          { title: 'Employee ID', dataIndex: ['employeeSnapshot', 'employeeId'] },
          { title: 'Name', dataIndex: ['employeeSnapshot', 'fullName'] },
          { title: 'Account No', dataIndex: 'accountNumber' },
          {
            title: 'Balance',
            render: () => <AmountDisplay value={0} />,
          },
          { title: 'Status', render: (_, record) => <StatusBadge status={record.status} /> },
          { title: 'Enrolled', dataIndex: 'enrolledAt' },
        ]}
      />

      <Drawer
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        title="PF Account Quick View"
        width={420}
      >
        {selected ? (
          <Space direction="vertical" size={6}>
            <Typography.Text strong>{selected.employeeSnapshot.fullName}</Typography.Text>
            <Typography.Text>Employee ID: {selected.employeeSnapshot.employeeId}</Typography.Text>
            <Typography.Text>Account: {selected.accountNumber}</Typography.Text>
            <Typography.Text>Status: {selected.status}</Typography.Text>
          </Space>
        ) : null}
      </Drawer>
    </>
  );
}
