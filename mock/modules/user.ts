import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, resultError, requestParams } from '../_util';

export function createUserList() {
  return [
    {
      userId: '1',
      username: 'admin',
      realName: '管理员',
      password: '123456',
      token: 'admin-token',
      homePath: '/dashboard', // 登录跳转主页
      // 用户操作权限
      roles: [
        {
          roleName: 'admin',
          value: 'admin',
        },
      ],
    },
  ];
}
export default [
  {
    url: '/login',
    timeout: 200,
    method: 'post',
    response: ({ body }: any) => {
      const { username, password } = body;
      const checkUser = createUserList().find(
        (item) => item.username === username && password === item.password,
      );
      if (!checkUser) {
        return resultError('用户不存在');
      }
      // const { userId, username: _username, token, realName, roles } = checkUser;
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = request.headers?.authorization;
      if (!token) return resultError('Invalid token!');
      const checkUser = createUserList().find((item) => item.token === token);
      if (!checkUser) return resultError('Invalid user token!');
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/test',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      return resultSuccess({ message: '成功' });
    },
  },
] as MockMethod[];
