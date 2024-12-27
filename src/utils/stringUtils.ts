export const isBlank = (str: string): boolean => {
    return !str || str.trim().length === 0;
  };
  
  export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };