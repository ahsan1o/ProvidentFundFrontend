import { Button, Card, DatePicker, Select, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useMonthlyContributionReport } from '../../api/hooks/useReports';
import { PageHeader } from '../../components/layout/PageHeader';

export function ReportsPage(): JSX.Element {
  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'));
  const [type, setType] = useState('monthly-contributions');
  const { data, isLoading } = useMonthlyContributionReport(period);

  const rows = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  return (
    <>
      <PageHeader title="Reports" breadcrumb={['Reports']} />
      <Card>
        <Space style={{ marginBottom: 12 }}>
          <Select
            value={type}
            onChange={setType}
            style={{ width: 220 }}
            options={[
              { value: 'monthly-contributions', label: 'Monthly Contributions' },
              { value: 'total-liability', label: 'Total Liability' },
              { value: 'loan-outstanding', label: 'Loan Outstanding' },
              { value: 'tax-summary', label: 'Tax Summary' },
            ]}
          />
          <DatePicker
            picker="month"
            value={dayjs(period, 'YYYY-MM')}
            onChange={(value) => setPeriod((value ?? dayjs()).format('YYYY-MM'))}
          />
          <Button>Export PDF</Button>
          <Button>Export Excel</Button>
        </Space>
        <Table
          loading={isLoading}
          dataSource={rows}
          rowKey={(row) => row.type as string}
          columns={[
            { title: 'Type', dataIndex: 'type' },
            { title: 'Amount', render: (_, row) => row?._sum?.amount ?? 0 },
          ]}
        />
      </Card>
    </>
  );
}
