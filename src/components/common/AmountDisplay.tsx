import { Typography } from 'antd';
import { formatMoney } from '../../utils/money';

export function AmountDisplay({ value }: { value: string | number }): JSX.Element {
  return <Typography.Text strong>{formatMoney(value)}</Typography.Text>;
}
