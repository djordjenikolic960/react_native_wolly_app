import {apiClient} from '../../../../api/ApiClient';
import {API_ENDPOINTS} from '../../../../api/ApiEndpoints';
import {CurrentUser} from '../../domain/model/CurrentUser';

export class UserService {
  async fetchUser(): Promise<CurrentUser> {
    try {
      const response = await apiClient.get<CurrentUser>(API_ENDPOINTS.USER);
      return response;
    } catch (e) {
      throw new Error('Failed to fetch user');
    }
  }

  async addToBalance(value: number): Promise<void> {
    try {
      const response = await apiClient.patch<void, void>(
        API_ENDPOINTS.ADD_MONEY,
        undefined,
        {params: {value}},
      );
      console.log(response);
    } catch (error) {
      throw new Error('Failed to add to balance');
    }
  }
}
