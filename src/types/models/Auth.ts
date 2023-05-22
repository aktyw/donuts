export type AuthFormData = {
  email: string;
  password: string;
};


export type AuthCredentials = {
  userId: string | null;
  token: string | null;
  tokenExpiration?: number | null;
};

