export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  module: string;
  timestamp: string;
  details: string;
  status: 'success' | 'warning' | 'danger' | 'info';
  ipAddress: string;
}
