declare type Recordable<T = any> = Record<string, T>;

declare type Nullable<T> = T | null;

declare namespace Menu {
  interface MenuOptions {
    path: string;
    title: string;
    name: string;
    icon?: string;
    isLink?: string;
    close?: boolean;
    children?: MenuOptions[];
  }
}
