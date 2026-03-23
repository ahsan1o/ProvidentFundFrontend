import { Card, Col, Row, Typography } from 'antd';
import { PageHeader } from '../../components/layout/PageHeader';
import { TutorialCard } from '../../components/common/TutorialCard';

export function PortalHomePage(): JSX.Element {
  return (
    <>
      <PageHeader title="👤 Employee Self-Service Portal" breadcrumb={['Portal']} />
      
      <TutorialCard
        title="Your Personal PF Dashboard"
        description="View your complete PF account status in real-time—exactly what you've saved and earned."
        businessContext="Employees want transparency about their entitlements. This portal shows them live data: how much they've accumulated in their individual PF account (from both their salary deductions and company contributions), how much they're borrowing, and when they last received contributions. This builds employee trust and satisfaction."
        points={[
          'Your PF balance grows every month from contributions + interest (employer and employee contributions compound)',
          'Loans reduce your balance temporarily—they are deducted automatically from your salary until repaid',
          'Last contribution shows when the company last posted your monthly payment',
          'All figures are calculated in real-time from your actual account ledger',
          'Access this anytime to verify no mistakes in your account',
          'Integration: Data syncs automatically from payroll system every month',
        ]}
      />

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={8}>
          <Card 
            title="💾 My PF Account Balance" 
            style={{ height: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
            headStyle={{ color: 'white' }}
          >
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginTop: '16px' }}>
              PKR <span style={{ fontSize: '32px' }}>12,45,000</span>
            </div>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', display: 'block' }}>
              Your total accumulated savings (employee + employer + interest)
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="📋 Current Loan Outstanding" 
            style={{ height: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}
            headStyle={{ color: 'white' }}
          >
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginTop: '16px' }}>
              PKR <span style={{ fontSize: '32px' }}>2,50,000</span>
            </div>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.8)', marginTop: '8px', display: 'block' }}>
              Amount you borrowed - auto-deducted from salary
            </Typography.Text>
          </Card>
        </Col>
        <Col span={8}>
          <Card 
            title="📅 Last Contribution" 
            style={{ height: '100%', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}
            headStyle={{ color: 'white' }}
          >
            <Typography.Text style={{ color: 'white', marginTop: '8px', display: 'block', fontSize: '18px', fontWeight: 'bold' }}>
              December 2025
            </Typography.Text>
            <Typography.Text style={{ color: 'rgba(255,255,255,0.8)' }}>
              Your contribution was processed on Dec 28
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </>
  );
}
