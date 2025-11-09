export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignUpCredentials = {
  email: string;
  password: string;
  displayName: string;
};

export type ResetPasswordCredentials = {
  email: string;
};

export type ConfirmNewPasswordCredentials = {
  oobCode: string;
  password: string;
};
