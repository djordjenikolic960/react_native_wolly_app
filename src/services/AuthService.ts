import { apiClient } from "../api/ApiClient";

export const login = async (email: string, password: string) => {
  return await apiClient.post<{ email: string; password: string }, { jwtToken: string }>(
    '/api/v1/users/login',
    { email, password }
  );
};

export const logout = async () => {
  return await apiClient.post<null, void>('/auth/logout', null);
};

// djordjenikolic@gmail.com
// malbasa13