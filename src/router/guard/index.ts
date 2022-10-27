import nProgress from 'nprogress';
import type { Router } from 'vue-router';
import { useAuthStore } from '@/store/modules/auth';
import { useUserStore } from '@/store/modules/user';
import { routeEnum } from '@/enums/routeEnum';
/*
https://router.vuejs.org/zh/guide/advanced/navigation-guards.html
路由守卫：
    - 全局路由守卫
    - 路由独享守卫
    - 组件内的守卫
*/

const whitePathList = [routeEnum.Login];

// 开始路由首位
export function setupRouterGuard(router: Router) {
  //  全局路由导航
  createGlobalGuard(router);
  //   导航条
  createProgressGuard(router);
}

// 全局路由守卫
function createGlobalGuard(router: Router) {
  // 前置守卫
  router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore();
    const userStore = useUserStore();

    const token = userStore.getToken;
    if (whitePathList.includes(to.path as routeEnum)) {
      next();
    } else if (token) {
      if (userStore.getLastUpdateTime === 0) {
        await userStore.getUserInfoFromToken();
      }

      if (auth.getIsAddRoutes) {
        next();
        return;
      }

      const routes = auth.getAuthRoutes;
      routes.forEach((route) => {
        router.addRoute(route);
      });
      auth.setIsAddRoutes(true);
      next({ path: to.fullPath, replace: true });
    } else {
      next(routeEnum.Login);
    }
  });
  // 后置守卫
  router.afterEach((to) => {});
}

export function createProgressGuard(router: Router) {
  router.beforeEach(async (to) => {
    nProgress.start();
    // return 值
    // false: 取消当前的导航
    // undefined 或返回 true，则导航是有效的，并调用下一个导航守卫
  });

  router.afterEach((to) => {
    nProgress.done();
  });
}
