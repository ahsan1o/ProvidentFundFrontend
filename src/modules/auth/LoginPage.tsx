import { Button, Card, Form, Input, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/client';
import { API_ENDPOINTS } from '../../api/endpoints';
import { useAuthStore } from '../../store/auth.store';

export function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
      }}
    >
      <Card style={{ width: 380 }}>
        <Typography.Title level={4}>Hashoo PF Management</Typography.Title>
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
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form>
      </Card>
    </div>
  );
}
