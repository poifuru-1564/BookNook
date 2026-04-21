export const validatePassword = (email: string, password: string) => {
  if (email.trim().length === 0 || password.trim().length === 0) {
    return { isValid: false, message: "Enter both Email & Password" };
  } else if (password.trim().length < 8) {
    return {
      isValid: false,
      message: "Password needs to be at least 8 characters long.",
    };
  } else if (
    password.trim().toLowerCase() === password.trim() ||
    password.trim().toUpperCase() === password.trim()
  ) {
    return {
      isValid: false,
      message: "Password must be a mix of uppercase and lowercase letters.",
    };
  }
  return { isValid: true };
};
