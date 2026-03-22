import { Card, Form, Input, InputNumber, Tabs, Button, message } from 'antd';
import { apiClient } from '../../api/client';
import { PageHeader } from '../../components/layout/PageHeader';

export function SettingsPage(): JSX.Element {
  return (
    <>
      <PageHeader title="Admin Settings" breadcrumb={['Admin', 'Settings']} />
      <Tabs
        items={[
          {
            key: 'contribution',
            label: 'Contribution Config',
            children: (
              <Card>
                <Form
                  layout="vertical"
                  onFinish={async (values: { employeePercent: number; employerPercent: number }) => {
                    await apiClient.post('/admin/contribution-configs', values);
                    message.success('Contribution configuration saved');
                  }}
                >
                  <Form.Item label="Employee %" name="employeePercent" rules={[{ required: true }]}>
                    <InputNumber min={0} max={100} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Employer %" name="employerPercent" rules={[{ required: true }]}>
                    <InputNumber min={0} max={100} style={{ width: '100%' }} />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">Save</Button>
                </Form>
              </Card>
            ),
          },
          {
            key: 'tax',
            label: 'Tax Slabs',
            children: (
              <Card>
                <Form
                  layout="vertical"
                  onFinish={async (values: {
                    minTenureYears: number;
                    maxTenureYears: number;
                    taxPercent: string;
                    effectiveFrom: string;
                  }) => {
                    await apiClient.post('/tax/configs', values);
                    message.success('Tax slab saved');
                  }}
                >
                  <Form.Item label="Min Tenure Years" name="minTenureYears" rules={[{ required: true }]}>
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Max Tenure Years" name="maxTenureYears">
                    <InputNumber min={0} style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="Tax %" name="taxPercent" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Effective From (ISO date)" name="effectiveFrom" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">Save</Button>
                </Form>
              </Card>
            ),
          },
        ]}
      />
    </>
  );
}
