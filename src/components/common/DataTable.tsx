import { Table, type TableProps } from 'antd';

export function DataTable<T extends object>(props: TableProps<T>): JSX.Element {
  return <Table<T> rowKey="id" pagination={{ pageSize: 10 }} {...props} />;
}
