import type { RouteRecordRaw } from 'vue-router';
import { layout } from '@/router/constant';
const dashboard: RouteRecordRaw = {
  path: '/dashboard',
  name: 'Dashboard',
  component: layout,
};

export default dashboard;
