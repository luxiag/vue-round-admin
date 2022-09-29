import { http } from '@/utils/axios';
import { LoginParams } from './model/userModel';

enum Api {
  Login = '/login',
}

async function loginApi(params: LoginParams) {
  return await http.post({ url: Api.Login, params });
}

export default { loginApi };
