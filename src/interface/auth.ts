import { Auth } from '@/store/auth';

export type Credential = {
  user: Auth['user'];
  authorization: string;
  success: boolean;
};
