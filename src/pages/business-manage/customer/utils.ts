import { CustomerInfo } from '@/types/user';

export const getStatusColors = (status?: CustomerInfo['status']) => {
  switch (status) {
    case 'active':
      return 'secondary';
    case 'forbidden':
      return 'neutral';
    case 'reviewing':
      return 'primary';
    case 'churned':
      return 'danger';
    default:
      return 'neutral';
  }
};
