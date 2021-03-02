<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <ion-title>个人信息</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label>头像</ion-label>
        <ion-avatar>
          <img
            src="https://vue3js.cn/docs/logo.png"
          />
        </ion-avatar>
      </ion-item>

      <ion-item>
        <ion-label>账号</ion-label>
        {{ currentUser.UserName }}
      </ion-item>

      <ion-item>
        <ion-label>用户名</ion-label>
        {{ currentUser.ShowName }}
      </ion-item>
      <ion-button expand="block" color="danger" @click="logout"
        >注销</ion-button
      >
    </ion-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonItem,
  IonButton,
  IonToolbar,
  IonLabel,
  IonHeader,
  IonTitle,
  IonContent,
  IonAvatar,
} from "@ionic/vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonContent,
    IonButton,
    IonAvatar,
  },
  setup() {
    const router = useRouter();
    let currentUser = window.localStorage.getItem("BizCurrentUser");
    if (currentUser) {
      currentUser = JSON.parse(currentUser);
    }

    const logout = () => {
      window.localStorage.removeItem("access_token");
      window.localStorage.removeItem("refresh_token");
      window.localStorage.removeItem("expires_time");
      window.localStorage.removeItem("BizCurrentUser");
      window.localStorage.removeItem("_AMap_AMap.Geolocation");
      router.push("/login");
    };

    return { currentUser, logout };
  },
});
</script>

<style lang="scss" scoped>
</style>