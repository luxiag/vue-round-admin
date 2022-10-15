export interface LoginParams {
  username: string;
  password: string;
}

// 用户定义
export interface UserModel {
  userId: string | number;
  username: string;
  realName: string;
  token: string;
  homePath: string;
  roles: RoleInfo[];
}

export interface RoleInfo {
  roleName: string;
  value: string;
}
