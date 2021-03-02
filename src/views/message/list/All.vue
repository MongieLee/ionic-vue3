<template>
  <div v-if="state.data.length > 0">
    <div>
      <ion-item
        @click="goDetail"
        button
        detail
        v-for="(item, index) in state.data"
        :key="index"
      >
        <span class="red-dot">
          <div v-if="!item.isRead" class="sot"></div>
        </span>
        <ion-avatar>
          <img
            width="40"
            height="40"
            src="https://vue3js.cn/docs/logo.png"
          />
        </ion-avatar>
        <div class="list-item">
          <div class="top-wrapper">
            <div class="item-title">{{ item.title }}</div>
            <div class="item-time">{{ geFormatTime() }}</div>
          </div>
          <div class="item-content">{{ item.content }}</div>
        </div>
      </ion-item>
    </div>
    <!-- <ion-infinite-scroll
      style="margin-top: 1em"
      @ionInfinite="loadData($event)"
      threshold="56px"
      id="infinite-scroll"
    > -->
    <ion-infinite-scroll
      style="margin-top: 1em"
      @ioninfinite="loadData($event)"
      threshold="56px"
      id="infinite-scroll"
    >
      <ion-infinite-scroll-content
        loading-spinner="bubbles"
        loading-text="加载更多..."
      >
      </ion-infinite-scroll-content>
    </ion-infinite-scroll>
  </div>
  <div v-else>暂无数据</div>
</template>

<script lang="ts">
import dayjs from "dayjs";
import { defineComponent, reactive } from "vue";
import {
  IonItem,
  IonAvatar,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    IonItem,
    IonAvatar,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  setup() {
    const router = useRouter();
    const geFormatTime = () => {
      return dayjs().format("YY-MM-DD HH:hh");
    };

    const defaultProps = [
      {
        title: "春节放假安排通知",
        isRead: false,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: false,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: false,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: false,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: true,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: true,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: false,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: false,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: true,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: true,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: true,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "春节放假安排通知",
        isRead: true,
        content:
          "2月11日（星期四2月11日四日（星期四2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星2月四2月11日四日（星期四2月四2月11日四日（星期四2月11日四日（星期四2月11日四",
      },
      {
        title: "这是最后一条了准备loading加载更多了",
        isRead: false,
        content: "等吧",
      },
    ];
    const state = reactive({ data: defaultProps });

    const loadData = (ev: CustomEvent) => {
      console.log(ev);
      setTimeout(() => {
        state.data = [...state.data, ...defaultProps];
        (ev as any).target.complete();
      }, 2200);
    };

    const goDetail = () => {
      router.push("/message/read/form");
    };
    return { state, geFormatTime, loadData, goDetail };
  },
});
</script>

<style lang="scss" scoped>
.red-dot {
  width: 15px;
  > .sot {
    width: 10px;
    height: 10px;
    background: red;
    border-radius: 50%;
  }
}
.list-item {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 1em;
  > .top-wrapper {
    display: flex;
    justify-content: space-between;
    > .item-title {
      width: 9em;
      font-size: 1.1em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #888;
    }
    > .item-time {
      font-size: 12px;
      color: #333;
    }
  }
  > .item-content {
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8em;
    color: #888;
  }
}
</style>