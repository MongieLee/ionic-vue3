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
        <ion-title>新建外派单</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" class="z-11">
      <ion-item>
        <ion-label><span class="redStart">*</span>开始时间</ion-label>
        <ion-datetime
          cancelText="取消"
          doneText="确认"
          placeholder="选择开始日期"
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
        <ion-label><span class="redStart">*</span>项目名称</ion-label>
        <ion-select
          v-model="formData.project"
          placeholder="请选择项目"
          cancelText="关闭"
          okText="确定"
        >
          <ion-select-option value="1">拱北海关</ion-select-option>
          <ion-select-option value="2">湾仔海关</ion-select-option>
        </ion-select>
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
  IonContent,
  IonToolbar,
  IonButton,
  IonSelect,
  IonIcon,
  IonSelectOption,
} from "@ionic/vue";
import showToast from "@/utils/showToast";
import { arrowBackOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonDatetime,
    IonContent,
    IonToolbar,
    IonButton,
    IonSelectOption,
    IonIcon,
    IonSelect,
  },
  setup() {
    const router = useRouter();
    const formData = reactive({
      startTime: "",
      endTime: "",
      project: "",
    });
    const backPre = () => {
      router.push("/home");
    };
    const createForm = () => {
      const { startTime, endTime, project } = formData;
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
      if (!project) {
        showToast({
          message: "项目名称不能为空",
        });
        return;
      }
    };
    return { createForm, formData, arrowBackOutline, backPre };
  },
});
</script>

<style lang="scss" scoped>
</style>