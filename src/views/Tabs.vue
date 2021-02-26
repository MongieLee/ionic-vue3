<template>
  <ion-page>
    <ion-tabs>
      <slot name="bottom">
        <ion-tab-bar>
          <ion-tab-button tab="tab1" href="/home">
            <ion-icon :icon="homeOutline" />
            <ion-label>百智</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab2" href="/message">
            <ion-icon :icon="mailUnreadOutline" />
            <ion-label>信息</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab3" href="/user">
            <ion-icon :icon="personOutline" />
            <ion-label>个人</ion-label>
          </ion-tab-button>
        </ion-tab-bar></slot
      >
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
} from "@ionic/vue";
import { homeOutline, mailUnreadOutline, personOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tabs",
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage },
  setup() {
    return {
      homeOutline,
      mailUnreadOutline,
      personOutline,
    };
  },
});
</script>