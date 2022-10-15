import { http } from '@/utils/axios';
import { LoginParams, UserModel } from './model/userModel';

enum Api {
  Login = '/login',
}

async function loginApi(data: LoginParams) {
  return await http.post<UserModel>({ url: Api.Login, data });
}

export default { loginApi };
