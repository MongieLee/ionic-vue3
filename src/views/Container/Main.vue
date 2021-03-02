<template>
  <div class="container">
    <main>
      <router-view />
    </main>
    <Nav />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Nav from "@/components/Tabs.vue";
export default defineComponent({
  components: { Nav },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
    position: relative;
  }
}
</style>