<template>
  <div>
    <ion-header class="z-12">
      <ion-toolbar>
        <ion-icon
          class="back-button"
          slot="start"
          size="large"
          :icon="arrowBackOutline"
          @click="backPre"
        />
        <ion-title>新建加班单</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="z-11">
      <ion-item>
        <ion-label><span class="redStart">*</span>开始时间</ion-label>
        <ion-datetime
          cancelText="取消"
          doneText="确认"
          placeholder="选择开始日期"
          name="startTime"
          displayFormat="YYYY-MM-DD HH:mm"
          v-model="formData.startTime"
        ></ion-datetime>
      </ion-item>

      <ion-item>
        <ion-label><span class="redStart">*</span>结束时间</ion-label>
        <ion-datetime
          cancelText="取消"
          doneText="确认"
          placeholder="选择结束日期"
          displayFormat="YYYY-MM-DD HH:mm"
          v-model="formData.endTime"
        ></ion-datetime>
      </ion-item>

      <ion-item>
        <ion-label><span class="redStart">*</span>加班事由</ion-label>
        <ion-textarea
          :autoGrow="true"
          wrap="off"
          required
          v-model="formData.overtimeReason"
          placeholder="请输入加班原因"
        ></ion-textarea>
      </ion-item>
      <ion-button expand="block" @click="createForm">提交</ion-button>
    </ion-content>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  IonItem,
  IonLabel,
  IonDatetime,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonIcon,
  IonTextarea,
} from "@ionic/vue";
import showToast from "@/utils/showToast";
import { useRouter } from "vue-router";
import { arrowBackOutline } from "ionicons/icons";

export default defineComponent({
  components: {
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonDatetime,
    IonContent,
    IonButton,
    IonTextarea,
    IonIcon,
    IonToolbar,
  },
  setup() {
    const router = useRouter();
    const backPre = () => {
      router.push("/home");
    };
    const formData = reactive({
      startTime: "",
      endTime: "",
      overtimeReason: "",
    });

    const createForm = () => {
      const { startTime, endTime, overtimeReason } = formData;
      if (!startTime) {
        showToast({
          message: "开始时间不能为空",
        });
        return;
      }
      if (!endTime) {
        showToast({
          message: "结束时间不能为空",
        });
        return;
      }
      if (!overtimeReason) {
        showToast({
          message: "加班事由不能为空",
        });
        return;
      }
    };
    return { createForm, formData, backPre, arrowBackOutline };
  },
});
</script>

<style lang="scss" scoped>
</style>