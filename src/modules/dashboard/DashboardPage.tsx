import { Card, Col, Row, Table, Typography } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { PageHeader } from '../../components/layout/PageHeader';

const kpi = [
  { title: 'Total Fund Liability', value: 'PKR 48.2M' },
  { title: 'Active Accounts', value: '25' },
  { title: 'Monthly Contributions', value: 'PKR 2.1M' },
  { title: 'Pending Approvals', value: '4' },
];

const trend = [
  { m: 'Jan', value: 32 },
  { m: 'Feb', value: 34 },
  { m: 'Mar', value: 35 },
  { m: 'Apr', value: 37 },
  { m: 'May', value: 39 },
  { m: 'Jun', value: 41 },
  { m: 'Jul', value: 43 },
  { m: 'Aug', value: 44 },
  { m: 'Sep', value: 45 },
  { m: 'Oct', value: 46 },
  { m: 'Nov', value: 47 },
  { m: 'Dec', value: 48 },
];

export function DashboardPage(): JSX.Element {
  return (
    <>
      <PageHeader title="Admin Dashboard" breadcrumb={['Home', 'Dashboard']} />
      <Row gutter={[16, 16]}>
        {kpi.map((item) => (
          <Col span={6} key={item.title}>
            <Card>
              <Typography.Text type="secondary">{item.title}</Typography.Text>
              <Typography.Title level={3} style={{ margin: 0 }}>{item.value}</Typography.Title>
            </Card>
          </Col>
        ))}
      </Row>

      <Card title="Fund Growth (12 Months)" style={{ marginTop: 16 }}>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="m" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#1B3A6B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Recent Activity" style={{ marginTop: 16 }}>
        <Table
          pagination={{ pageSize: 5 }}
          dataSource={[{ key: '1', event: 'Contribution Run', period: '2025-12', status: 'Completed' }]}
          columns={[
            { title: 'Event', dataIndex: 'event' },
            { title: 'Period', dataIndex: 'period' },
            { title: 'Status', dataIndex: 'status' },
          ]}
        />
      </Card>
    </>
  );
}
