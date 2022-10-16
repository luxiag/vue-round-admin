import { RouteRecordRaw } from 'vue-router';
import { warn } from './log';

const LayoutMap = new Map<string, () => Promise<typeof import('*.vue')>>();
const Layout = async () => await import('@/layout/index.vue');

LayoutMap.set('LAYOUT', Layout);

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

// 动态引入组件
export function asyncImportRoute(routes: RouteRecordRaw[]) {
  // https://cn.vitejs.dev/guide/features.html#glob-import

  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../views/**/*.{vue,tsx}');
  routes.forEach((route) => {
    const { component, children } = route;
    if (!component) {
      route.component = Layout;
    } else {
      const layoutFound = LayoutMap.get((component as unknown as string).toUpperCase());
      if (layoutFound) {
        route.component = layoutFound;
      } else {
        route.component = dynamicImport(dynamicViewsModules, component as unknown as string);
      }
    }
    children && asyncImportRoute(children);
  });
  return routes;
}

export function dynamicImport(
  dynamicViewsModules: Record<string, () => Promise<Recordable>>,
  component: string,
) {
  const keys = Object.keys(dynamicViewsModules);
  /*
   glob vite 生成的代码 dynamicViewsModules
    const modules = {
        './dir/foo.js': () => import('./dir/foo.js'),
        './dir/bar.js': () => import('./dir/bar.js')
    }
  */
  const matchKeys = keys.filter((key: string) => {
    const k = key.replace('../views', '');
    // 截取 component 路径

    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    // component: '/dashboard/analysis/index'
    return k.substring(startIndex, lastIndex) === component;
  });
  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    warn(matchKeys[0] + '组件存在多个');
  } else {
    warn('不存在' + component + '组件');
  }
}
