import { Button, Card, Form, Input, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import { useAuthStore } from '../../store/auth.store';
import { TutorialCard } from '../../components/common/TutorialCard';

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Space direction="vertical" style={{ width: '100%', maxWidth: 500 }} size="large">
        <TutorialCard
          title="Provident Fund Management System"
          description="Digital provident fund management platform for employee contributions, withdrawals, loans, and settlements."
          businessContext="A provident fund is a retirement savings scheme where both employees and employers contribute fixed percentages of salary. This platform ensures transparent, accurate record-keeping and compliance."
          points={[
            'Track all employee PF contributions monthly',
            'Manage withdrawal requests (urgent cash needs)',
            'Process loans against PF balance',
            'Calculate tax-efficient settlements at retirement',
            'Generate reports for compliance and audits',
          ]}
        />

        <Card style={{ width: '100%' }}>
          <Typography.Title level={4} style={{ marginTop: 0 }}>
            Provident Fund Management
          </Typography.Title>
          <Typography.Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 16 }}>
            Demo Login: admin / admin123
          </Typography.Text>

          <Form
            layout="vertical"
            onFinish={async (values: { email: string; password: string }) => {
              const res = await apiClient.post(API_ENDPOINTS.AUTH_LOGIN, values);
              const { accessToken, refreshToken } = res.data.data;
              setAuth({
                accessToken,
                refreshToken,
                user: {
                  userId: 'session',
                  email: values.email,
                  role: 'SUPER_ADMIN',
                  entityId: 'HHL',
                },
              });
              navigate('/dashboard');
            }}
          >
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="admin@example.com" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password placeholder="admin123" />
            </Form.Item>
            <Button type="primary" htmlType="submit" block>
              Login
            </Button>
          </Form>
        </Card>
      </Space>
    </div>
  );
}
