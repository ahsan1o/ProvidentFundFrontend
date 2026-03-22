import { Button, Card, DatePicker, Form, message } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useRunContributions } from '../../api/hooks/useContributions';
import { ConfirmModal } from '../../components/common/ConfirmModal';
import { PageHeader } from '../../components/layout/PageHeader';

export function ContributionsPage(): JSX.Element {
  const [period, setPeriod] = useState(dayjs().format('YYYY-MM'));
  const [confirmOpen, setConfirmOpen] = useState(false);
  const runMutation = useRunContributions();

  return (
    <>
      <PageHeader title="Contribution Management" breadcrumb={['Contributions']} />
      <Card>
        <Form layout="inline">
          <Form.Item label="Period">
            <DatePicker
              picker="month"
              value={dayjs(period, 'YYYY-MM')}
              onChange={(value) => setPeriod((value ?? dayjs()).format('YYYY-MM'))}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={() => setConfirmOpen(true)}>
              Run Contributions
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <ConfirmModal
        open={confirmOpen}
        title="Run Contribution Posting"
        content={`Trigger monthly run for ${period}?`}
        confirmLoading={runMutation.isPending}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={async () => {
          await runMutation.mutateAsync(period);
          setConfirmOpen(false);
          message.success('Contribution run triggered successfully');
        }}
      />
    </>
  );
}
