import { apiClient } from "../api/ApiClient";

export const registerUser = async (email: string, password: string, firstName: string, lastName: string) => {
    return await apiClient.post<{ email: string; password: string, firstName: string, lastName: string }, { user: undefined }>(
      'api/v1/users/register',
      { email, password, firstName, lastName }
    );
  };