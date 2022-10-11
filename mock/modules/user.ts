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
      homePath: '/', // 登录跳转主页
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
        return resultError('没有改用户');
      }
      const { userId, username: _username, token, realName, roles } = checkUser;
      return resultSuccess({
        roles,
        userId,
        username: _username,
        token,
        realName,
      });
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
