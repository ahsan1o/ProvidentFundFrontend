import { Avatar, Dropdown, Layout, Space, Typography } from 'antd';
import { useAuthStore } from '../../store/auth.store';

export function HeaderBar(): JSX.Element {
  const user = useAuthStore((s) => s.user);

  return (
    <Layout.Header
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E0E4ED',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 24px',
      }}
    >
      <Typography.Text strong>Entity: {user?.entityId ?? 'N/A'}</Typography.Text>
      <Dropdown menu={{ items: [{ key: 'user', label: user?.email ?? 'Guest' }] }}>
        <Space>
          <Avatar>{user?.email?.charAt(0).toUpperCase() ?? 'U'}</Avatar>
          <Typography.Text>{user?.role ?? 'No role'}</Typography.Text>
        </Space>
      </Dropdown>
    </Layout.Header>
  );
}
