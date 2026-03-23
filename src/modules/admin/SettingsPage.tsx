import { Card, Form, Input, InputNumber, Tabs, Button, message } from 'antd';
import { apiClient } from '../../api/client';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

export function SettingsPage(): JSX.Element {
  return (
    <>
      <PageHeader title="⚙️ Admin Settings & Configuration" breadcrumb={['Admin', 'Settings']} />
      
      <TutorialCard
        title="System Configuration Hub"
        description="Configure the core financial rules and policies that govern your entire PF scheme."
        businessContext="These settings define how much employees and employers contribute, and how taxable income is calculated when employees leave or retire. Changing these settings affects all future contributions and settlements—this is why only admins can access this area."
        points={[
          'Contribution rates determine monthly deductions from salaries (employee) and company costs (employer)',
          'Tax slabs define how much employees owe when they settle—protecting low-income workers with progressive tax rates',
          'Settings apply automatically to all new contributions and settlements after the effective date',
          'All changes are logged for compliance and audit purposes',
          'Use scheduled effective dates to roll out policy changes without disrupting current operations',
        ]}
      />
      <Tabs
        items={[
          {
            key: 'contribution',
            label: '💰 Contribution Rates',
            children: (
              <>
                <Card title="How Employee & Employer Contributions Work" style={{ marginBottom: 16 }}>
                  <p><strong>What are these percentages?</strong></p>
                  <ul>
                    <li><strong>Employee %:</strong> Deducted from each employee's monthly salary and deposited into their PF account</li>
                    <li><strong>Employer %:</strong> Paid by the company (cost to business) and credited to the employee's account</li>
                    <li><strong>Combined value:</strong> Both amounts + annual interest = employee's total savings</li>
                  </ul>
                  <p><strong>Business Example:</strong> If an employee earns PKR 100,000/month with 8.33% rates:</p>
                  <ul>
                    <li>Employee contribution: PKR 8,330 (deducted from salary)</li>
                    <li>Employer contribution: PKR 8,330 (company pays)</li>
                    <li>Monthly total: PKR 16,660 saved for the employee's future</li>
                  </ul>
                </Card>
                <Card>
                  <Form
                    layout="vertical"
                    onFinish={async (values: { employeePercent: number; employerPercent: number }) => {
                      await apiClient.post('/admin/contribution-configs', values);
                      message.success('Contribution configuration saved');
                    }}
                  >
                    <Form.Item label="Employee Contribution %" name="employeePercent" rules={[{ required: true }]}>
                      <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="e.g., 8.33" />
                    </Form.Item>
                    <Form.Item label="Employer Contribution %" name="employerPercent" rules={[{ required: true }]}>
                      <InputNumber min={0} max={100} style={{ width: '100%' }} placeholder="e.g., 8.33" />
                    </Form.Item>
                    <Form.Item>
                      <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                        These changes apply to all <strong>future contributions</strong>. Existing accounts are not recalculated.
                      </p>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Save Contribution Rates</Button>
                  </Form>
                </Card>
              </>
            ),
          },
          {
            key: 'tax',
            label: '📊 Tax Slabs for Settlements',
            children: (
              <>
                <Card title="How Tax Works When Employees Leave or Retire" style={{ marginBottom: 16 }}>
                  <p><strong>What is this slab doing?</strong></p>
                  <p>Employees pay tax only on the PF they withdraw. The percentage depends on how long they worked:</p>
                  <ul>
                    <li><strong>0-2 years tenure:</strong> 10% tax (short-term workers)</li>
                    <li><strong>3-5 years tenure:</strong> 5% tax (medium-term)</li>
                    <li><strong>6+ years tenure:</strong> 0% tax (long-term loyalty—tax-free!)</li>
                  </ul>
                  <p><strong>Real-world example:</strong> Employee with PKR 1,000,000 PF balance:</p>
                  <ul>
                    <li>If worked <strong>2 years:</strong> Pays 10% tax = PKR 100,000 tax → Gets PKR 900,000</li>
                    <li>If worked <strong>6 years:</strong> Pays 0% tax = PKR 0 tax → Gets PKR 1,000,000 (full amount!)</li>
                  </ul>
                  <p><strong>Business benefit:</strong> Encourages long-term employment. Employees stay longer = better company stability.</p>
                </Card>
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
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g., 0" />
                    </Form.Item>
                    <Form.Item label="Max Tenure Years" name="maxTenureYears">
                      <InputNumber min={0} style={{ width: '100%' }} placeholder="e.g., 2" />
                    </Form.Item>
                    <Form.Item label="Tax %" name="taxPercent" rules={[{ required: true }]}>
                      <Input placeholder="e.g., 10" />
                    </Form.Item>
                    <Form.Item label="Effective From (ISO date)" name="effectiveFrom" rules={[{ required: true }]}>
                      <Input placeholder="e.g., 2024-01-01" />
                    </Form.Item>
                    <Form.Item>
                      <p style={{ fontSize: '12px', color: '#666' }}>
                        Add one row per tenure bracket. Example: 0-2 years = 10%, then 3-5 years = 5%, then 6+ years = 0%
                      </p>
                    </Form.Item>
                    <Button type="primary" htmlType="submit">Save Tax Slab</Button>
                  </Form>
                </Card>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
