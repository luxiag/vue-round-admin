// 防抖

export const useDebounce = (fn: () => void, delay: number = 500) => {
  type Timer = number | null;
  let timer: Timer = null;
  return function () {
    if (timer !== null) clearTimeout(timer);
    timer = window?.setTimeout(fn, delay);
  };
};
