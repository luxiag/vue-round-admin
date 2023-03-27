import { requestParams, resultError, resultSuccess } from './../_util';
import { MockMethod } from 'vite-plugin-mock';
import { createUserList } from './user';
// vue-router 导航模式
// 1. name router.push({name:'routerName'})
// 2. path router.push({path: 'path'})
//     children 跳转 子path

const dashboardRoute = {
  path: '/dashboard',
  name: 'dashboard',
  title: 'Dashboard',
  component: 'LAYOUT',
  meta: {
    title: 'dashboard',
    icon: 'icon-shouye',
  },
  redirect: '/dashboard/analysis',

  children: [
    {
      path: 'analysis',
      name: 'analysis',
      component: '/dashboard/analysis/index',
      meta: {
        title: 'analysis',
      },
    },
    {
      path: 'workbench',
      name: 'workbench',
      component: '/dashboard/workbench/index',
      meta: {
        title: 'workbench',
      },
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
