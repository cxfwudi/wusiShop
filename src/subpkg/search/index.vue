<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar
        @input="input"
        :radius="100"
        cancelButton="none"
        class="search-bar"
        :focus="true"
      ></uni-search-bar>
    </view>

    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view
        class="sugg-item"
        v-for="(item, i) in searchResults"
        :key="i"
        @click="gotoDetail(item.goods_id)"
      >
        <view class="goods-name">{{ item.goods_name }}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>

    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 列表区域 -->
      <view class="history-list">
        <uni-tag :text="item" v-for="(item, i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
import { showMsg } from "../../utils/showMsg";
export default {
  data() {
    return {
      // 延时器的 timerId
      timer: null,
      // 搜索关键词
      kw: "",
      searchResults: [],
      historyList: [],
    };
  },
  computed: {
    histories() {
      return [...this.historyList].reverse();
    },
  },
  onLoad() {
    this.historyList = JSON.parse(uni.getStorageSync("kw") || "[]");
  },
  methods: {
    gotoGoodsList(item){
      uni.navigateTo({
        url:'/subpkg/goods_list/index?query='+item
      })
    },
    cleanHistory(){
      this.historyList = [];
      uni.setStorageSync('kw', '[]');
    },
    input(e) {
      clearTimeout(this.timer);
      // 重新启动一个延时器，并把 timerId 赋值给 this.timer
      this.timer = setTimeout(() => {
        // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
        this.kw = e;
        this.getSearchList();
        console.log(this.kw);
      }, 500);
    },
    getSearchList() {
      if (this.kw.length === 0) {
        this.searchResults = [];
        return;
      }
      this.$http
        .get("/api/public/v1/goods/qsearch", {
          params: {
            query: this.kw,
          },
        })
        .then(({ data }) => {
          if (data.meta.status !== 200) return showMsg();
          this.searchResults = data.message;
          this.saveSearchList();
        });
    },
    gotoDetail(good_id) {
      uni.navigateTo({
        url: "/subpkg/goods_detail/index?goods_id" + good_id,
      });
    },
    saveSearchList() {
      const set = new Set(this.historyList);
      set.delete(this.kw);
      set.add(this.kw);
      this.historyList = Array.from(set);
      uni.setStorageSync("kw", JSON.stringify(this.historyList));
    },
  },
};
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
}
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}
.history-box {
  padding: 0 15px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;
    .uni-tag {
      margin-right: 5px;
    }
  }
}
</style>
