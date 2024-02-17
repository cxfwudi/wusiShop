<template>
  <view>
    <view class="goods-list">
      <block v-for="(goods, i) in goodsList" :key="i">
        <my-goods :goods="goods"></my-goods>
      </block>
    </view>
  </view>
</template>

<script>
import { showMsg } from "../../utils/showMsg";
import myGoods from "@/components/my-goods/index.vue";
export default {
  components: { myGoods },
  data() {
    return {
      queryObj: {
        query: "",
        cid: "",
        pagenum: 1,
        pagesize: 10,
      },
      goodsList: [],
      total: 0,
      defaultPic:
        "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
      isLoading: false, //节流阀
    };
  },
  onLoad(options) {
    this.queryObj.query = options.query || "";
    this.queryObj.cid = options.cid || "";
    // console.log(this.queryObj)
    this.getGoodsList();
  },
  methods: {
    getGoodsList(cb) {
      this.isLoading = true;
      this.$http
        .get("/api/public/v1/goods/search", {
          params: this.queryObj,
        })
        .then(({ data }) => {
          this.isLoading = false;  //节流，防止加载时触发另外的请求
          if (data.meta.status !== 200) {
            return showMsg();
          }
          this.goodsList = [...this.goodsList, ...data.message.goods];
          this.total = data.message.total;
        });
      cb && cb();
    },
  },
  onReachBottom() {
    if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total)
      return showMsg("数据加载完毕");
    // 让页码+1
    if (this.isLoading) return;
    this.queryObj.pagenum++;
    this.getGoodsList();
  },
  onPullDownRefresh() {
    this.queryObj.pagenum = 1;
    this.total = 0;
    this.isLoading = false;
    this.goodsList = [];
    this.getGoodsList(() => uni.stopPullDownRefresh());
  },
};
</script>

<style lang="scss"></style>
