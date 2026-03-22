import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { HeaderBar } from './Header';
import { Sidebar } from './Sidebar';

export function AppShell(): JSX.Element {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <HeaderBar />
        <Layout.Content style={{ padding: 24 }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
