import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export interface RequestInterceptors {
  // 请求拦截
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorsCatch?: (err: any) => any;
  // 响应拦截
  responseInterceptors?: (config: AxiosResponse) => AxiosResponse;
  responseInterceptorsCatch?: (err: any) => any;
}
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: RequestInterceptors;
}

export class Axios {
  // axios实例
  instance: AxiosInstance;
  private readonly options: AxiosRequestConfig;
  constructor(config: AxiosRequestConfig) {
    this.options = config;
    // axios 实例
    this.instance = axios.create(config);
    this.setupInterceptors();
  }

  private createAxios(config: AxiosRequestConfig): void {
    this.instance = axios.create(config);
  }

  getAxios(): AxiosInstance {
    return this.instance;
  }

  //   拦截器配置

  private setupInterceptors() {
    this.instance.interceptors.request.use((res: AxiosRequestConfig) => {
      // 全局 请求拦截器

      return res;
    });
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        return res.data.result;
      },
      (err: any) => err,
    );
  }

  async post<T = any>(config: RequestConfig): Promise<T> {
    return await this.request({ ...config, method: 'POST' });
  }

  async put<T = any>(config: RequestConfig): Promise<T> {
    return await this.request({ ...config, method: 'PUT' });
  }

  async request<T>(config: RequestConfig): Promise<T> {
    return await new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config);
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res);
        })
        .catch((err: Error | AxiosError) => {
          reject(err);
        });
    });
  }
}
export enum ContentTypeEnum {
  JSON = 'application/json',
}

function createAxios(opt?: Partial<AxiosRequestConfig>) {
  return new Axios(
    Object.assign({ headers: { 'Content-Type': ContentTypeEnum.JSON }, timeout: 10 * 1000 }, opt),
  );
}

export const http = createAxios();
