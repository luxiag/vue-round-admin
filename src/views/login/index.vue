<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="view-login">
    <div id="container"> </div>
    <div class="login-form">
      <a-form
        :model="formState"
        name="basic"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, nextTick, reactive } from 'vue';
  import { App } from './js/InfiniteLights.js';
  import { turbulentDistortion } from './js/Distortions.js';
  import user from '@/api/user';
  // form
  interface FormState {
    username: string;
    password: string;
    remember: boolean;
  }
  const formState = reactive<FormState>({
    username: '',
    password: '',
    remember: true,
  });
  const onFinish = async (values: any) => {
    const userInfo = await user.loginApi(formState);
    console.log('Success:', userInfo);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  //
  const options = {
    onSpeedUp: () => {},
    onSlowDown: () => {},
    // mountainDistortion || LongRaceDistortion || xyDistortion || turbulentDistortion || turbulentDistortionStill || deepDistortionStill || deepDistortion
    distortion: turbulentDistortion,

    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,

    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,

    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,

    // Percentage of the lane's width
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,

    /** * These ones have to be arrays of [min,max].  ***/
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],

    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],

    /** **  Anything below can be either a number or an array of [min,max] ****/

    // Length of the lights. Best to be less than total length
    carLightsLength: [400 * 0.03, 400 * 0.2],
    // Radius of the tubes
    carLightsRadius: [0.05, 0.14],
    // Width is percentage of a lane. Numbers from 0 to 1
    carWidthPercentage: [0.3, 0.5],
    // How drunk the driver is.
    // carWidthPercentage's max + carShiftX's max -> Cannot go over 1.
    // Or cars start going into other lanes
    carShiftX: [-0.8, 0.8],
    // Self Explanatory
    carFloorSeparation: [0, 5],

    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131318,
      brokenLines: 0x131318,
      /** *  Only these colors can be an array ***/
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3,
    },
  };
  const debounce = (fn: () => void, delay: number = 500) => {
    type Timer = number | null;
    let timer: Timer = null;
    return function () {
      if (timer !== null) clearTimeout(timer);
      timer = window.setTimeout(fn, delay);
    };
  };
  let myApp: App | null = null;
  const drawerThree = () => {
    const container = document.getElementById('container');
    myApp = new App(container, options);
    myApp.loadAssets().then(myApp.init);
  };
  onMounted(() => {
    drawerThree();
    window.addEventListener(
      'resize',
      debounce(() => {
        nextTick(() => {
          const height = window.innerHeight;
          const width = window.innerWidth;
          myApp?.setSize(width, height, true);
          //   drawerThree();
        });
      }, 500),
    );
  });
</script>
<style scoped>
  .view-login {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    position: relative;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
  }

  #container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    position: absolute;
  }

  .content__title-wrap {
    position: relative;
    text-align: center;
    pointer-events: none;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .content__title-wrap a {
    pointer-events: auto;
  }

  .content__pretitle {
    color: var(--color-alt);
    font-size: 1.35rem;
  }

  .content__title {
    font-size: 6vw;
    font-weight: normal;
    margin: 0.5rem 0 1.5rem;
    font-family: azo-sans-uber, sans-serif;
  }

  .content__link {
    text-decoration: underline;
    font-family: azo-sans-uber, sans-serif;
    font-size: 1.1rem;
    color: inherit;
  }
  canvas {
    width: 100%;
    height: 100%;
  }
</style>
