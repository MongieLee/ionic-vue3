<template>
  <div class="wrapper">
    <div class="z-12" :class="'top-bar'">
      <ion-toolbar>
        <ion-icon
          class="back-button"
          slot="start"
          size="large"
          :icon="arrowBackOutline"
          @click="backPre"
        />
        <ion-title>表单详情</ion-title>
      </ion-toolbar>
    </div>
    <div class="z-11 dio">
      <ion-item>
        <ion-label>表单类型</ion-label>
        <ion-badge color="success">请假单</ion-badge>
      </ion-item>
      <ion-item>
        <ion-label>请假类别</ion-label>
        <ion-badge color="secondary">事假</ion-badge>
      </ion-item>
      <ion-item>
        <ion-label>请假人</ion-label>
        <ion-badge color="tertiary">王德发</ion-badge>
      </ion-item>
      <ion-item>
        <ion-label>开始时间</ion-label>
        2020-12-01 12:00:00
      </ion-item>
      <ion-item>
        <ion-label>结束时间</ion-label>
        2020-12-01 12:00:00
      </ion-item>
      <ion-item>
        <ion-label>加班事由</ion-label>
        家里有事
      </ion-item>
      <div class="buttons-wrapper">
        <ion-button @click="agree">同意</ion-button>
        <ion-button @click="reject" color="danger">驳回</ion-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonItem,
  IonBadge,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonButton,
  alertController,
  IonIcon,
} from "@ionic/vue";
import { useRouter } from "vue-router";
import { arrowBackOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    IonItem,
    IonLabel,
    IonTitle,
    IonButton,
    IonToolbar,
    IonBadge,
    IonIcon,
  },
  setup() {
    const router = useRouter();
    const backPre = () => {
      router.back();
    };
    const agree = async () => {
      const alert = await alertController.create({
        header: "二次确认",
        message: "确定同意该申请吗.",
        buttons: [
          {
            role: "cancel",
            text: "取消",
            handler: () => {
              console.log("取消");
            },
          },
          {
            text: "确认",
            handler: () => {
              console.log("Confirm Cancel:");
            },
          },
        ],
      });
      alert.present();
    };
    const reject = async () => {
      const alert = await alertController.create({
        header: "二次确认",
        message: "确定驳回该申请吗.",
        buttons: [
          {
            role: "cancel",
            text: "取消",
            handler: () => {
              console.log("取消");
            },
          },
          {
            text: "确认",
            handler: () => {
              console.log("Confirm Cancel:");
            },
          },
        ],
      });
      alert.present();
    };
    return { backPre, arrowBackOutline, agree, reject };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  height: calc(100vh - 56px);
  .top-bar {
    border-bottom: 1px solid #ddd;
  }
}
.buttons-wrapper {
  margin-top: 1em;
  display: flex;
  justify-content: space-around;
}
</style>