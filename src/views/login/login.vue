<template>
  <ion-page>
    <ion-content :fullscreen="true" class="login-wrapper">
      <ion-card class="login-container">
        <h1>珠海百智科技</h1>
        <h6>CMS 2.0</h6>
        <div>
          <ion-item>
            <ion-input
              enterkeyhint="next"
              clearInput
              placeholder="请输入账号"
              v-model="userInfo.name"
            ></ion-input>
          </ion-item>
          <ion-item>
            <ion-input
              enterkeyhint="done"
              clearInput
              type="password"
              placeholder="请输入密码"
              v-model="userInfo.password"
            ></ion-input>
          </ion-item>
          <ion-button expand="block" color="success" @click="login"
            >登录</ion-button
          >
        </div>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonPage,
  loadingController,
  IonInput,
  IonButton,
  IonCard,
  IonItem,
} from "@ionic/vue";
import { defineComponent, reactive } from "vue";
import { useRouter } from "vue-router";

import loginApi from "@/api/loginApi";
import showToast from "@/utils/showToast";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonPage,
    IonInput,
    IonButton,
    IonCard,
    IonItem,
  },
  setup() {
    const router = useRouter();

    const userInfo = reactive({
      name: "",
      password: "",
    });

    const login = async () => {
      const data = {
        username: userInfo.name,
        password: userInfo.password,
      };

      if (!data.username) {
        showToast({ message: "账号不能为空" });
        return;
      }
      if (!data.password) {
        showToast({ message: "密码不能为空" });
        return;
      }

      const loading = await loadingController.create({
        message: "登录中...",
      });
      loading.present();

      loginApi
        .login(data)
        .then(() => {
          loginApi.getUserInfo().then((response: any) => {
            loading.dismiss();
            window.localStorage.setItem(
              "BizCurrentUser",
              JSON.stringify(response.Result)
            );
            router.push("/");
          });
        })
        .catch(() => {
          loading.dismiss();
        });
      // console.log(axios)
    };
    return {
      userInfo,
      login,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-wrapper {
  --background: url("~@/assets/images/login.png");
}

.login-container {
  width: 80%;
  margin: 0 auto;
  padding: 0 1em 2em;
  transform: translate(0, 50%);
  > h1 {
    text-align: center;
  }
  > h6 {
    text-align: center;
    margin-bottom: 2em;
  }
}
</style>