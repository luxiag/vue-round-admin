# Vue 3.2 + TypeScript + Pinia + Vite3 + Antd Design Vue

## 前言

基于 Vue3.2、TypeScript、Vite3、Pinia、Antd Design Vue 开源的一套后台管理模版，

部分设计参考了 [vue-vben-admin](https://github.com/vbenjs/vue-vben-admin)

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/luxiag/vue-round-admin.git
```

- 安装依赖

```bash
cd vue-round-admin

pnpm i
```

- 运行

```bash
pnpm run dev
```

- 打包

```bash
pnpm run build
```

## 项目说明

- 目前是利用空余时间开发中，很多地方不完善
- 开发这个项目主要是学习 Vue3.2 + TypeScript, 尝试自己写了一个项目

## 一、在线预览

- Link: https://luxiag.github.io/vue-round-admin/

## 二、项目介绍

- 使用 Vue3.2`<script setup>`开发
- 整个项目集成了 TypeScript+Eslint
- 后台接口是由 mock 提供
- UI 库基于 AntdVue 二次封装开发
- 项目路由、多语言导入均使用 vite3 提供的`glob`动态导入
- git 提交使用 husky、lint-staged、commitlint 规范体检信息
