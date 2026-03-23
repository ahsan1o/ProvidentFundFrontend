import { Card, Col, Row, Table, Typography, Statistic, Space } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';
import { DollarOutlined, TeamOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

const kpi = [
  { title: 'Total Fund Liability', value: 'PKR 48.2M', icon: DollarOutlined, description: 'Total amount owed to all employees' },
  { title: 'Active Accounts', value: '25', icon: TeamOutlined, description: 'Enrolled employees with active PF accounts' },
  { title: 'Monthly Contributions', value: 'PKR 2.1M', icon: CheckCircleOutlined, description: 'Employee + employer contributions this month' },
  { title: 'Pending Approvals', value: '4', icon: ClockCircleOutlined, description: 'Withdrawals & loans awaiting approval' },
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

const recentActivity = [
  { key: '1', event: 'Monthly Contribution Run', period: '2025-12', status: 'Completed', amount: 'PKR 2.1M' },
  { key: '2', event: 'Withdrawal Approved', period: '2025-12-01', status: 'Completed', amount: 'PKR 250K' },
  { key: '3', event: 'Loan Disbursed', period: '2025-11-28', status: 'Completed', amount: 'PKR 500K' },
  { key: '4', event: 'Settlement Processed', period: '2025-11-20', status: 'Completed', amount: 'PKR 1.8M' },
];

export function DashboardPage(): JSX.Element {
  return (
    <>
      <PageHeader title="Admin Dashboard" breadcrumb={['Home', 'Dashboard']} />

      <TutorialCard
        title="Dashboard Overview"
        description="Your PF management command center. Monitor fund health, pending approvals, and monthly contributions at a glance."
        points={[
          'Total Fund Liability: Amount owed to employees (growing with interest)',
          'Active Accounts: Number of employees with enrolled PF accounts',
          'Monthly Contributions: Combined employee + employer contributions',
          'Pending Approvals: Withdrawals and loans awaiting HR manager approval',
        ]}
      />

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {kpi.map((item) => {
          const Icon = item.icon;
          return (
            <Col span={6} key={item.title}>
              <Card hoverable>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Icon style={{ fontSize: 20, color: '#1890ff' }} />
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {item.title}
                    </Typography.Text>
                  </div>
                  <Statistic value={item.value} />
                  <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                    {item.description}
                  </Typography.Text>
                </Space>
              </Card>
            </Col>
          );
        })}
      </Row>

      <Card title="📈 Fund Growth Over 12 Months (PKR Millions)" style={{ marginBottom: 16 }}>
        <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          Shows cumulative fund liability growth. Growth driven by monthly employee/employer contributions plus interest earnings.
        </Typography.Text>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="m" />
              <YAxis label={{ value: 'PKR Millions', angle: -90, position: 'insideLeft' }} />
              <Tooltip formatter={(value) => `PKR ${value}M`} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1B3A6B"
                strokeWidth={2}
                dot={{ fill: '#1B3A6B', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="📊 Recent Activity Snapshot" style={{ marginBottom: 16 }}>
        <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
          Latest fund management activities including contribution runs, approvals, and settlements.
        </Typography.Text>
        <Table
          pagination={{ pageSize: 5 }}
          dataSource={recentActivity}
          columns={[
            { title: 'Event', dataIndex: 'event', width: '30%' },
            { title: 'Date', dataIndex: 'period', width: '20%' },
            { title: 'Amount', dataIndex: 'amount', width: '20%' },
            {
              title: 'Status',
              dataIndex: 'status',
              render: (text) => (
                <span style={{ color: text === 'Completed' ? '#52c41a' : '#faad14' }}>✓ {text}</span>
              ),
            },
          ]}
          size="small"
        />
      </Card>

      <TutorialCard
        title="Next Steps"
        description="Navigate through the menu to manage employee fund accounts and processes."
        points={[
          'Contributions → Run monthly contribution batches',
          'PF Accounts → View employee account details and balances',
          'Withdrawals → Review and approve employee withdrawal requests',
          'Loans → Process employee loan applications',
          'Settlements → Calculate retirement settlements with tax optimization',
          'Reports → Generate compliance and analytics reports',
        ]}
        type="success"
      />
    </>
  );
}
