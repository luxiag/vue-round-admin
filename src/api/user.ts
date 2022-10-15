import { http } from '@/utils/axios';
import { LoginParams, UserModel } from './model/userModel';

enum Api {
  Login = '/login',
  Menu = '/getMenuList',
}

async function loginApi(data: LoginParams) {
  return await http.post<UserModel>({ url: Api.Login, data });
}

async function menuApi() {
  return await http.get({ url: Api.Menu });
}

export default { loginApi, menuApi };
