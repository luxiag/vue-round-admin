<template>
  <a-dropdown>
    <span class="detail">
      <IconFontVue type="icon-fanyi" :size="20" />
    </span>
    <template #overlay>
      <a-menu :selected-keys="[locale]" @click="handleSwitchLanguage">
        <a-menu-item key="zh_CN">
          <span>
            <IconFontVue type="icon-a-yuyanzhongwen" />
            简体中文
          </span>
        </a-menu-item>
        <a-menu-item key="en_US">
          <span>
            <IconFontVue type="icon-a-yuyanyingwen" />
            English
          </span>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script setup lang="ts">
  import { Dropdown as ADropdown, Menu as AMenu, MenuItem as AMenuItem } from 'ant-design-vue';
  import IconFontVue from '@/components/IconFont/IconFont.vue';
  import { useLocaleStore } from '@/store/modules/locale';
  import { storeToRefs } from 'pinia';
  import { LocaleType } from '@/locales/config';
  import { MenuInfo } from 'ant-design-vue/lib/menu/src/interface';
  import { useLocale } from '@/locales/useLocale';
  const localStorage = useLocaleStore();
  const { locale } = storeToRefs(localStorage);
  const handleSwitchLanguage = (e: MenuInfo) => {
    // localStorage.setLocale(e.key as LocaleType);
    // changeLang(e.key as LocaleType);
    const { changeLocale } = useLocale();
    changeLocale(e.key as LocaleType);

    // location.reload();
  };
</script>
