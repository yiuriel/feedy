export interface RegisterDto {
  user: {
    email: string;
    password: string;
    name: string;
  };
  organization: {
    name: string;
  };
  subscription: {
    plan: 'free' | 'pro';
  };
}
