export {};
declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    hideTab?: boolean;
    hideMenu?: boolean;
    hideBreadcrumb?: boolean;
  }
}
