import dayjs from 'dayjs';

/**
 * 计算时间差值
 */
export const calculateTimeDifference = (startDate: Date, endDate: Date) =>  dayjs(endDate).diff(dayjs(startDate), 'day');
