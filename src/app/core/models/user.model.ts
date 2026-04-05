export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'viewer';
  avatarUrl?: string;
}
