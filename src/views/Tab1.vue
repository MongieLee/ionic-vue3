<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>工作台</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="container" :fullscreen="true">
      <ul class="menu-list">
        <li
          v-for="(item, index) in menuList"
          :key="index"
          @click="item.onClick"
        >
          <ion-icon size="large" :icon="item.icon" />
          <span>{{ item.title }}</span>
        </li>
      </ul>
      <button @click="goLogin">去登录</button>
      <!-- <Map
        :akey="aMapKey"
        :onError="handleError"
        :onComplete="handleComplete"
      /> -->
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonIcon,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { defineComponent } from "vue";
import {
  golfSharp,
  airplaneSharp,
  alarmSharp,
  walkSharp,
  personAddSharp,
} from "ionicons/icons";

export default defineComponent({
  name: "Tab1",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const menuList = [
      {
        title: "考勤",
        icon: golfSharp,
        onClick() {
          router.push("/home/clock");
        },
      },
      {
        title: "出差",
        icon: airplaneSharp,
        onClick() {
          router.push("/home/createForm/1");
        },
      },
      {
        title: "加班",
        icon: alarmSharp,
        onClick() {
          router.push("/home/createForm/2");
        },
      },
      {
        title: "外派",
        icon: walkSharp,
        onClick() {
          router.push("/home/createForm/3");
        },
      },
      {
        title: "请假",
        icon: personAddSharp,
        onClick() {
          router.push("/home/createForm/4");
        },
      },
    ];

    const aMapKey = "3e3b601818fc3acf73b9f03317e150da";

    const handleComplete: (data: any) => void = (data) => {
      console.log(data);
    };

    const handleError = (data: any): void => {
      console.log(data);
    };

    const goLogin = () => {
      router.push("/login");
    };

    return {
      goLogin,
      handleError,
      handleComplete,
      aMapKey,
      menuList,
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  --background: #f6f6f8;
  .menu-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    > li {
      ion-icon {
        color: #ff730f;
      }
      margin-top: 1em;
      list-style: none;
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span {
        margin-top: 0.5em;
        font-size: 12px;
      }
    }
  }
}
</style>