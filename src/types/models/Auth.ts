export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthAction = {
  action: string;
};

export type AuthCredentials = {
  userId: string | null;
  token: string | null;
  tokenExpiration?: number | null;
};

export type AuthFormDataAction = AuthFormData & AuthAction;
