<template>
  <nav class="nav-wrapper">
    <router-link to="/home">
      <ion-icon size="large" :icon="homeOutline" />
      <span>百智</span>
    </router-link>

    <router-link to="/message" class="message-wrapper">
      <ion-badge color="danger">5</ion-badge>
      <ion-icon size="large" :icon="mailUnreadOutline" />
      <span>信息</span>
    </router-link>

    <router-link to="/user">
      <ion-icon size="large" :icon="personOutline" />
      <span>个人</span>
    </router-link>
  </nav>
</template>

<script lang="ts">
import { IonIcon, IonBadge } from "@ionic/vue";
import { homeOutline, mailUnreadOutline, personOutline } from "ionicons/icons";
import { defineComponent, onMounted, onUnmounted, reactive } from "vue";
import { hasExpired } from "@/utils/check";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Tabs",
  components: { IonIcon, IonBadge },
  setup() {
    const state = reactive({
      height: document.documentElement.clientHeight,
      navVisible: true,
    });
    const router = useRouter();
    const navToggle = () => {
      if (document.documentElement.clientHeight < state.height) {
        state.navVisible = false;
      } else {
        state.navVisible = true;
      }
    };
    onMounted(() => {
      if (hasExpired()) {
        router.push("/login");
      }
      // window.addEventListener("resize", navToggle);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", navToggle);
    });

    return {
      homeOutline,
      mailUnreadOutline,
      personOutline,
      state,
    };
  },
});
</script>

<style lang="scss" scoped>
.nav-wrapper {
  justify-content: center;
  background: #fff;
  z-index: 20;
  align-items: center;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  display: flex;
  a {
    &.selected {
      color: #3880ff;
    }
    &.router-link-active {
      color: #3880ff;
    }
    width: 33.333333%;
    max-height: 56px;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 6px 0;
    color: #333;
    &.active {
      color: #3880ff;
    }
    span {
      font-size: 12px;
    }
  }
  .message-wrapper {
    position: relative;
    ion-badge {
      position: absolute;
      top: 1px;
      transform: translateX(70%);
      z-index: 10;
    }
  }
}
</style>