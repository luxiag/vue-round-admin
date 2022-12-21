<template>
  <icon-font :type="props.prefix + props.type" :style="unref(customStyleRef)" />
  <!-- {{ props.type }} -->
</template>
<script lang="ts" setup>
  import { IconUrl } from '@/config/const';
  import { computed, PropType, unref } from 'vue';

  import { createFromIconfontCN } from '@ant-design/icons-vue';
  import { isString } from '@/utils/is';
  const props = defineProps({
    type: {
      type: String,
      required: true,
      // default:''
    },
    url: {
      type: String,
      default: IconUrl,
    },
    prefix: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#fffff',
    },
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 14,
    },
    scriptUrl: {
      type: String as PropType<string | string[]>,
      default: '',
    },
  });
  const customStyleRef = computed(() => {
    const fontSize = isString(props.size) ? parseFloat(props.size) : props.size;
    return {
      color: props.color,
      fontSize: `${fontSize}px`,
    };
  });

  const IconFont = createFromIconfontCN({
    scriptUrl: props.url,
  });
</script>
