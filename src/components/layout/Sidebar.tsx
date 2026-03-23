import {
  BankOutlined,
  DashboardOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FundViewOutlined,
  ReadOutlined,
  SettingOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const items = [
  { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/pf-accounts', icon: <TeamOutlined />, label: 'PF Accounts' },
  { key: '/contributions', icon: <BankOutlined />, label: 'Contributions' },
  { key: '/transactions', icon: <ReadOutlined />, label: 'Transactions' },
  { key: '/withdrawals', icon: <DollarOutlined />, label: 'Withdrawals' },
  { key: '/loans', icon: <FundViewOutlined />, label: 'Loans' },
  { key: '/settlements', icon: <FileDoneOutlined />, label: 'Settlements' },
  { key: '/reports', icon: <FileTextOutlined />, label: 'Reports' },
  { key: '/admin/settings', icon: <SettingOutlined />, label: 'Settings' },
  { key: '/portal', icon: <TeamOutlined />, label: 'Employee Portal' },
  { key: '/portal/requests', icon: <DollarOutlined />, label: 'Portal Requests' },
];

export function Sidebar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Layout.Sider width={240} style={{ background: '#0F2544' }}>
      <div style={{ color: '#A8B8D0', fontWeight: 600, padding: 20 }}>PF Management</div>
      <Menu
        theme="dark"
        style={{ background: '#0F2544' }}
        items={items}
        onClick={({ key }) => navigate(key)}
      />
    </Layout.Sider>
  );
}
