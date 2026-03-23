import { Card, Typography, Space, Alert } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

interface TutorialCardProps {
  title: string;
  description: string;
  businessContext?: string;
  points?: string[];
  type?: 'info' | 'success' | 'warning' | 'error';
}

export function TutorialCard({
  title,
  description,
  businessContext,
  points,
  type = 'info',
}: TutorialCardProps): JSX.Element {
  return (
    <Card
      style={{
        marginBottom: 16,
        backgroundColor: type === 'info' ? '#f0f5ff' : undefined,
        borderLeft: `4px solid ${
          type === 'info' ? '#1890ff' : type === 'success' ? '#52c41a' : type === 'warning' ? '#faad14' : '#ff4d4f'
        }`,
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }} size="middle">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <InfoCircleOutlined style={{ fontSize: 18, color: '#1890ff' }} />
          <Typography.Title level={5} style={{ margin: 0 }}>
            {title}
          </Typography.Title>
        </div>

        <Typography.Text>{description}</Typography.Text>

        {businessContext && (
          <Alert
            message="💼 Business Context"
            description={businessContext}
            type="info"
            showIcon={false}
            style={{ margin: 0 }}
          />
        )}

        {points && points.length > 0 && (
          <div style={{ paddingLeft: 16 }}>
            {points.map((point, idx) => (
              <div key={idx} style={{ marginBottom: 8 }}>
                <Typography.Text>
                  <strong>→</strong> {point}
                </Typography.Text>
              </div>
            ))}
          </div>
        )}
      </Space>
    </Card>
  );
}
