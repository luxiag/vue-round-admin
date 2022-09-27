import nProgress from 'nprogress';
import type { Router } from 'vue-router';

/*
路由守卫：
    - 全局路由守卫
    - 路由独享守卫
    - 组件内的守卫
*/

// 开始路由首位
export function setupRouterGuard(router: Router) {
  createGlobalGuard(router);
  //   导航条
  createProgressGuard(router);
}

// 全局路由守卫
function createGlobalGuard(router: Router) {
  // 前置守卫
  router.beforeEach(async (to) => {});
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
