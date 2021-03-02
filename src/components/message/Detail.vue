<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="message" />
        </ion-buttons>
        <ion-title>信息详情</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-item>
        <ion-label><span class="redStart">*</span>开始时间</ion-label>
        2020-01-01 12:22:00
      </ion-item>

      <ion-item>
        <ion-label><span class="redStart">*</span>结束时间</ion-label>
        2020-01-01 12:22:00
      </ion-item>

      <ion-item>
        <ion-label><span class="redStart">*</span>出差事由</ion-label>
        家里有事
      </ion-item>
      <div>
        <ion-button color="success" @click="agree">同意</ion-button>
        <ion-button color="danger" @click="reject">驳回</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonItem,
  IonLabel,
  IonHeader,
  IonTitle,
  IonContent,
  IonPage,
  IonButton,
  IonButtons,
  IonBackButton,
} from "@ionic/vue";

export default defineComponent({
  components: {
    IonPage,
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonBackButton,
  },
  setup() {
    const agree = () => {
      console.log(1);
    };
    const reject = () => {
      console.log(2);
    };
    return { agree, reject };
  },
});
</script>

<style lang="scss" scoped>
</style>