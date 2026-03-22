import dayjs from 'dayjs';

export const formatDate = (value: string | Date): string => dayjs(value).format('DD MMM YYYY');
