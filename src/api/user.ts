import { http } from '@/utils/axios';
import { LoginParams, UserModel } from './model/userModel';

enum Api {
  Login = '/login',
  Menu = '/getMenuList',
  UserInfo = '/getUserInfo',
}

async function loginApi(data: LoginParams) {
  return await http.post<UserModel>({ url: Api.Login, data });
}

async function menuApi() {
  return await http.get({ url: Api.Menu });
}

async function userInfo() {
  return await http.get({ url: Api.UserInfo });
}

export default { loginApi, menuApi, userInfo };
