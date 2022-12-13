import { message, notification, Modal, ModalFuncProps } from 'ant-design-vue';
import { createVNode } from 'vue';

export const useNotification = () => notification;

export const useMessage = () => {
  message.destroy();
  return message;
};

export const useConfirm = (options: Partial<ModalFuncProps>) => {
  const opt: ModalFuncProps = {
    ...options,
    title: options.title ?? '提示',
    content: createVNode('div', { style: options.style }, options.content ?? ''),
  };
  return Modal.confirm(opt);
};
