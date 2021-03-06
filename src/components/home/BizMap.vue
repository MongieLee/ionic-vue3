<template>
  <div class="i-container">
    <ion-header class="z-11">
      <ion-toolbar>
        <ion-icon
          class="back-button"
          slot="start"
          size="large"
          :icon="arrowBackOutline"
          @click="backPre"
        />
        <ion-title>签到考勤</ion-title>
      </ion-toolbar>
    </ion-header>
    <div id="mapContainer" class="z-11">
      <ion-card class="list-card">
        <ion-card-header>
          <ion-card-title>今日考勤记录</ion-card-title>
        </ion-card-header>

        <ion-card-content class="clock-log-list">
          <div v-if="clockLog.logData.length > 0">
            <p v-for="item in clockLog.logData" :key="item.Id">
              {{ formatTime(item.CheckTime) }}
              <span class="span-mg-left">{{ item.AreaName }}</span>
            </p>
          </div>
          <span v-else>暂无数据</span>
        </ion-card-content>
      </ion-card>
    </div>
    <ion-fab vertical="buttom" horizontal="center" slot="fixed" class="fixed">
      <ion-fab-button @click="onClock">
        <ion-icon :icon="fingerPrint" />
      </ion-fab-button>
    </ion-fab>
  </div>
</template>

<script lang='ts'>
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFab,
  loadingController,
  IonFabButton,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import { fingerPrint, arrowBackOutline } from "ionicons/icons";
import { onMounted, reactive, defineComponent, onUnmounted } from "vue";
import showToast from "@/utils/showToast";
import clockApi from "@/api/clockApi";
import { useRouter } from "vue-router";

interface GeolocationResult {
  position: {
    lng: number;
    lat: number;
  };
  accuracy: number;
  location_type: number;
  message: number;
  isConverted: number;
  info: number;
  addressComponent: number;
  formattedAddress: number;
  pois: number;
  roads: number;
  crosses: number;
}

interface Coordinate {
  longitude: number;
  latitude: number;
}

interface ClockInParams extends Coordinate {
  userId: number;
}

interface UserInfoDto {
  Id: number;
  ShowName: string;
  UserName: string;
}

declare const AMap: any;

export default defineComponent({
  name: "BizMap",
  props: { akey: String, onComplete: Function, onError: Function },
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonFab,
    IonFabButton,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },
  setup(props) {
    const router = useRouter();
    const coordinate: Coordinate = reactive({
      longitude: 0,
      latitude: 0,
    });
    const clockLog = reactive({
      logData: [],
    });

    let map: any;
    const backPre = () => {
      router.push("/home");
    };
    const formatTime = (timeStr: string) => {
      const newStr = new Date(timeStr);
      const h =
        newStr.getHours() < 10 ? "0" + newStr.getHours() : newStr.getHours();
      const m =
        newStr.getMinutes() < 10
          ? "0" + newStr.getMinutes()
          : newStr.getMinutes();
      const s =
        newStr.getSeconds() < 10
          ? "0" + newStr.getSeconds()
          : newStr.getSeconds();
      const str = `${h}:${m}:${s}`;
      return str;
    };
    const onClock = async () => {
      if (!coordinate?.longitude || !coordinate?.latitude) {
        showToast({
          message:
            "打卡失败，获取当前位置异常，请保证打开定位功能并检查网络后重试",
        });
        return;
      }

      const temp = window.localStorage.getItem("BizCurrentUser") || "";
      let currentUser: UserInfoDto | null;
      if (temp) {
        currentUser = JSON.parse(temp);
      } else {
        currentUser = null;
      }

      if (!currentUser) {
        showToast({
          message: "获取当前用户失败，请尝试退出再登录",
        });
        return;
      }

      const params: ClockInParams = {
        longitude: coordinate.longitude,
        latitude: coordinate.latitude,
        userId: currentUser.Id,
      };
      const loading = await loadingController.create({
        message: "打卡中...",
      });
      loading.present();

      clockApi
        .clockIn(params)
        .then(() => {
          loading.dismiss();
          showToast({
            message: "打卡成功！",
            color: "success",
          });
          clockApi.getClockLog().then((e: any) => {
            clockLog.logData = e.Result;
          });
        })
        .catch(() => {
          loading.dismiss();
          showToast({
            message: "系统异常，打卡失败！",
          });
        });
    };
    onUnmounted(() => {
      map && map.destroy();
      console.log("我销毁了");
    });

    onMounted(() => {
      clockApi.getClockLog().then((e: any) => {
        clockLog.logData = e.Result;
      });
      if (typeof AMap !== "undefined") {
        //脚步异步加载后全局上下文会存在AMap对象，已存在则不再加载，仅执行创建地图实例
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        createAMap(); //函数提升
        console.log("你已经存在了");
        return;
      }
      function createAMap(): void {
        map = new AMap.Map("mapContainer", {
          zoom: 16,
        });

        //使用高德定位插件
        AMap.plugin("AMap.Geolocation", function () {
          const geolocation = new (AMap as any).Geolocation({
            enableHighAccuracy: true, //是否使用高精度定位，默认:true
            timeout: 10000, //超过10秒后停止定位，默认：5s
            position: "RB", //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
          });
          map.addControl(geolocation);
          geolocation.getCurrentPosition(function (
            status: string,
            data: GeolocationResult
          ) {
            if (status === "complete") {
              coordinate.latitude = data.position.lat;
              coordinate.longitude = data.position.lng;
            } else {
              showToast({
                message: "定位失败" + data.message,
              });
            }
          });
        });
      }

      const createAsyncScript: () => void = () => {
        const scriptNode: HTMLScriptElement = document.createElement("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute(
          "src",
          `https://webapi.amap.com/maps?v=2.0&key=${props.akey}&callback=onMapCallback`
        );
        document.body.appendChild(scriptNode);
      };
      createAsyncScript();

      (window as any).onMapCallback = function () {
        createAMap();
      };
    });
    return {
      fingerPrint,
      onClock,
      arrowBackOutline,
      clockLog,
      formatTime,
      backPre,
    };
  },
});
</script>

<style lang="scss" scoped>
#mapContainer {
  height: 100%;
  position: relative;
  .list-card {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }
  .span-mg-left {
    margin-left: 2em;
  }
  .clock-log-list {
    max-height: 93px;
    overflow: auto;
  }
}
.fixed {
  bottom: 10%;
}
</style>