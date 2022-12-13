import { requestParams, resultError, resultSuccess } from './../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createUserList } from './user';
const dashboardRoute = {
  path: '/dashboard',
  name: 'Dashboard',
  title: 'Dashboard',
  component: 'LAYOUT',
  redirect: '/dashboard/analysis',
  icon: 'shouye',
  children: [
    {
      path: 'analysis',
      title: 'analysis',
      component: '/dashboard/analysis/index',
      name: 'analysis',
    },
  ],
};

export default [
  {
    url: '/getMenuList',
    timeout: 1000,
    method: 'get',
    response: (request: requestParams) => {
      const token = request.headers?.authorization;
      if (!token) return resultError('Invalid token!');
      const checkUser = createUserList().find((item) => item.token === token);
      if (!checkUser) return resultError('Invalid user token!');
      let menu: Object[];
      // eslint-disable-next-line prefer-const
      menu = [dashboardRoute];

      return resultSuccess(menu);
    },
  },
] as MockMethod[];
