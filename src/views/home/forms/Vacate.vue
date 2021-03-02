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
        <ion-title>新建请假单</ion-title>
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
        <ion-label><span class="redStart">*</span>请假类别</ion-label>
        <ion-select
          v-model="formData.vacateType"
          placeholder="请选择请假类别"
          cancelText="关闭"
          okText="确定"
        >
          <ion-select-option value="1">事假</ion-select-option>
          <ion-select-option value="2">病假</ion-select-option>
          <ion-select-option value="3">婚假</ion-select-option>
          <ion-select-option value="4">陪产假</ion-select-option>
          <ion-select-option value="5">年假</ion-select-option>
          <ion-select-option value="6">丧假</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item>
        <ion-label><span class="redStart">*</span>请假事由</ion-label>
        <ion-textarea
          :autoGrow="true"
          wrap="off"
          required
          v-model="formData.vacateReason"
          placeholder="请输入请假原因"
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
  IonContent,
  IonToolbar,
  IonButton,
  IonTextarea,
  IonSelect,
  IonSelectOption,
} from "@ionic/vue";
import { arrowBackOutline } from "ionicons/icons";
import showToast from "@/utils/showToast";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonHeader,
    IonItem,
    IonLabel,
    IonTitle,
    IonDatetime,
    IonContent,
    IonButton,
    IonToolbar,
    IonTextarea,
    IonSelect,
    IonSelectOption,
  },
  setup() {
    const router = useRouter();
    const formData = reactive({
      startTime: "",
      endTime: "",
      vacateType: null,
      vacateReason: "",
    });

    const backPre = () => {
      router.push("/home");
    };

    const createForm = () => {
      const { startTime, endTime, vacateReason, vacateType } = formData;
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
      if (!vacateType) {
        showToast({
          message: "请假类别不能为空",
        });
        return;
      }
      if (!vacateReason) {
        showToast({
          message: "请假事由不能为空",
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