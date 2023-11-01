import { Auth } from '@/store/auth';

export type Credential = {
  user: Auth['user'];
  authorization: string;
  success: boolean;
};

export type LoginParams = {
  email: string;
  password: string;
};
