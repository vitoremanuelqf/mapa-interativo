export const confirmNewPasswordErrors: Record<
  string,
  { title: string; description: string }
> = {
  "auth/expired-action-code": {
    title: "Link expirado:",
    description:
      "O link de redefinição de senha expirou. Solicite um novo e tente novamente.",
  },
  "auth/invalid-action-code": {
    title: "Código inválido:",
    description:
      "O link de redefinição de senha é inválido ou já foi utilizado.",
  },
  "auth/user-disabled": {
    title: "Usuário desativado:",
    description:
      "A conta deste usuário foi desativada. Entre em contato com o suporte.",
  },
  "auth/user-not-found": {
    title: "Usuário não encontrado:",
    description: "Nenhuma conta foi encontrada para este link de redefinição.",
  },
  "auth/weak-password": {
    title: "Senha muito fraca:",
    description:
      "A nova senha é muito fraca. Tente usar uma senha mais forte com letras, números e símbolos.",
  },
  "auth/internal-error": {
    title: "Erro interno:",
    description:
      "Ocorreu um problema ao redefinir sua senha. Tente novamente em instantes.",
  },
  "unknown/error": {
    title: "Erro desconhecido:",
    description:
      "Ocorreu um erro inesperado ao definir a nova senha. Tente novamente mais tarde.",
  },
};

export const resetPasswordErrors: Record<
  string,
  { title: string; description: string }
> = {
  "auth/user-not-found": {
    title: "Usuário não encontrado:",
    description: "Nenhum usuário foi encontrado com o e-mail fornecido.",
  },
  "auth/invalid-email": {
    title: "E-mail inválido:",
    description: "O endereço de e-mail fornecido é inválido. Tente novamente.",
  },
  "unknown/error": {
    title: "Erro desconhecido:",
    description:
      "Ocorreu um erro ao tentar recuperar a senha. Tente novamente mais tarde.",
  },
};

export const signInErrors: Record<
  string,
  { title: string; description: string }
> = {
  "auth/invalid-credential": {
    title: "Credenciais inválidas",
    description: "As credenciais de acesso são inválidas.",
  },
  "auth/wrong-password": {
    title: "Senha incorreta:",
    description: "A senha fornecida está incorreta. Tente novamente.",
  },
  "auth/user-not-found": {
    title: "Usuário não encontrado:",
    description: "Nenhum usuário foi encontrado com o e-mail fornecido.",
  },
  "auth/too-many-requests": {
    title: "Muitas tentativas:",
    description:
      "Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.",
  },
  "auth/network-request-failed": {
    title: "Problema de conexão:",
    description:
      "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
  },
  "auth/popup-closed-by-user": {
    title: "Login cancelado:",
    description: "O popup de autenticação foi fechado antes da conclusão.",
  },
  "auth/cancelled-popup-request": {
    title: "Requisição cancelada:",
    description:
      "Já existe uma tentativa de login em andamento. Aguarde ou tente novamente.",
  },
  "unknown/error": {
    title: "Erro desconhecido:",
    description:
      "Ocorreu um erro inesperado durante o login. Tente novamente mais tarde.",
  },
};

export const signUpErrors: Record<
  string,
  { title: string; description: string }
> = {
  "auth/email-already-in-use": {
    title: "E-mail em uso:",
    description: "O e-mail fornecido já está sendo usado por outra conta.",
  },
  "auth/weak-password": {
    title: "Senha fraca:",
    description: "A senha deve ter pelo menos 6 caracteres.",
  },
  "auth/invalid-email": {
    title: "E-mail inválido:",
    description: "O endereço de e-mail fornecido é inválido. Tente novamente.",
  },
  "auth/network-request-failed": {
    title: "Problema de conexão:",
    description:
      "Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.",
  },
  "unknown/error": {
    title: "Erro desconhecido:",
    description:
      "Ocorreu um erro inesperado durante a criação da conta. Tente novamente mais tarde.",
  },
};

export const formatErrorMessages = (
  type: "confirm-new-password" | "reset-password" | "sign-in" | "sign-up",
  code: string,
) => {
  const errorMessages = {
    "confirm-new-password": confirmNewPasswordErrors,
    "reset-password": resetPasswordErrors,
    "sign-in": signInErrors,
    "sign-up": signUpErrors,
  };
  return (
    errorMessages[type][code] || {
      title: "Erro desconhecido:",
      description: "Ocorreu um erro inesperado. Tente novamente mais tarde.",
    }
  );
};
