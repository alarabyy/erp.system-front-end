import { UserProfile } from '../../../core/models/user.model';

export interface AuthResponse {
  token: string;
  user: UserProfile;
}
