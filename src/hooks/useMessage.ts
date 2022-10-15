import { message, notification } from 'ant-design-vue';

export const useNotification = () => notification;

export const useMessage = () => {
  message.destroy();
  return message;
};
