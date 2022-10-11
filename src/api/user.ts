import { http } from '@/utils/axios';
import { LoginParams } from './model/userModel';

enum Api {
  Login = '/login',
}

async function loginApi(data: LoginParams) {
  return await http.post({ url: Api.Login, data });
}

export default { loginApi };
