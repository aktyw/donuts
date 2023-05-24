export type AuthFormData = {
  email: string;
  password: string;
};

export type AuthNewMail = {
  email: string;
  confirmEmail: string;
};

export type AuthNewPassword = {
  password: string;
  confirmPassword: string;
};

export type AuthCredentials = {
  userId: string | null;
  token: string | null;
  tokenExpiration?: number | null;
};
