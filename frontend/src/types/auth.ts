export type User = {
  id: number;
  email: string;
  authLevel: 'god' | 'admin' | 'accountant' | 'personalist' | 'user';
  accessToken: string;
  companyId: number;
}