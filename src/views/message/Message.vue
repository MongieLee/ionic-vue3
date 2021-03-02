<template>
  <div class="message-container">
    <ion-header>
      <ion-toolbar>
        <ion-segment value="unread" @ionChange="segmentChanged($event)">
          <ion-segment-button value="unread">未读</ion-segment-button>
          <ion-segment-button value="all">全部</ion-segment-button>
          <ion-segment-button value="read">已读</ion-segment-button>
        </ion-segment>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true"> <router-view /> </ion-content>

    <div class="message-detail-container">
      <router-view name="detail" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegmentButton,
  IonSegment,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "Tab2",
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonSegmentButton,
    IonSegment,
  },
  setup() {
    const router = useRouter();
    const segmentChanged = (ev: CustomEvent) => {
      router.push(`/message/${ev.detail.value}`);
    };
    return { segmentChanged };
  },
});
</script>

<style lang="scss" scoped>
.message-detail-container {
  position: fixed;
  width: 100%;
  z-index: 10;
}
.message-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  ion-content {
    flex: 1;
  }
}
</style>