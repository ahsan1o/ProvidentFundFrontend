import { Card, Col, Row, Typography } from 'antd';
import { AmountDisplay } from '../../components/common/AmountDisplay';
import { PageHeader } from '../../components/layout/PageHeader';

export function PortalHomePage(): JSX.Element {
  return (
    <>
      <PageHeader title="Employee Self-Service" breadcrumb={['Portal']} />
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Card title="My PF Balance">
            <AmountDisplay value={0} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Current Loan Outstanding">
            <AmountDisplay value={0} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Last Contribution">
            <Typography.Text>Pending data</Typography.Text>
          </Card>
        </Col>
      </Row>
    </>
  );
}
