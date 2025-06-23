export interface StaffItem {
  id: string;
  username: string;
  avatarUrl?: string;
  position: string;
  startDate: Date;
  serviceTime: number; // month
  salary: number;
  status: 'employed' | 'resigned';
}
