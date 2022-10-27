import { createFromIconfontCN } from '@ant-design/icons-vue';
import { defineComponent, computed, unref } from 'vue';
import type { PropType } from 'vue';
import { isString } from '@/utils/is';
import { IconUrl } from '@/utils/const';

// const IconFont = createFromIconfontCN({
//   scriptUrl,
// });

export default defineComponent({
  name: 'IconFont',
  props: {
    // icon标签
    type: {
      type: String,
      default: '',
    },
    // type 前置名称 icon-tuichu
    prefix: {
      type: String,
      default: 'icon-',
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 14,
    },
    scriptUrl: {
      type: String as PropType<string | string[]>,
      default: '',
    },
  },
  setup(props, { attrs }) {
    let IconFont = undefined as any;
    let scriptUrls = [IconUrl];

    if (props.scriptUrl) {
      scriptUrls = [...new Set(scriptUrls.concat(props.scriptUrl))];
    }
    IconFont = createFromIconfontCN({
      scriptUrl: scriptUrls,
    });

    const wrapStyleRef = computed(() => {
      const { color, size } = props;
      const fs = isString(size) ? parseFloat(size) : size;
      return {
        color,
        fontSize: `${fs}px`,
      };
    });

    return () => {
      const { type, prefix } = props;
      return type ? (
        <IconFont
          type={type.startsWith(prefix) ? type : `${prefix}${type}`}
          {...attrs}
          style={unref(wrapStyleRef)}
        />
      ) : null;
    };
  },
});
