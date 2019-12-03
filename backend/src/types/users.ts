export type User = {
  id?: number,
  authLevel?: 'god' | 'admin' | 'accountant' | 'personalist' | 'user',
  email?: string,
  password?: string,
  companyId?: number,
  accessToken?: string,
}

export type UserTokenPayload = {
  user: User,
  iat?: number,
  exp?: number
}

export type Users = User[]