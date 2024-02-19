<template>
  <view>
    <view class="search-box">
      <mySearch @click="gotoSearch"></mySearch>
    </view>
    <!-- 轮播图区域 -->
    <swiper
      :indicator-dots="true"
      :autoplay="true"
      :interval="3000"
      :duration="1000"
      :circular="true"
    >
      <!-- 循环渲染轮播图的 item 项 -->
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator
          class="swiper-item"
          :url="'/subpkg/goods_detail/index?goods_id=' + item.goods_id"
        >
          <!-- 动态绑定图片的 src 属性 -->
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>

    <!-- 分类导航区域 -->
    <view class="nav-list">
      <view
        class="nav-item"
        v-for="(item, i) in navList"
        :key="i"
        @click="navClickHandler(item)"
      >
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>

    <!-- 楼层区域 -->
    <view class="floor-list">
      <!-- 楼层 item 项 -->
      <view class="floor-item" v-for="(item, i) in floorList" :key="i">
        <!-- 楼层标题 -->
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image
              :src="item.product_list[0].image_src"
              :style="{ width: item.product_list[0].image_width + 'rpx' }"
              mode="widthFix"
            ></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator
              class="right-img-item"
              v-for="(item2, i2) in item.product_list"
              :key="i2"
              :url="item2.url"
            >
              <image
                v-if="i2 !== 0"
                :src="item2.image_src"
                mode="widthFix"
                :style="{ width: item2.image_width + 'rpx' }"
              ></image>
            </navigator>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mySearch from '@/components/my-search/index.vue';
import { showMsg } from "../../utils/showMsg";
import badgeMix from '@/mixins/tabbar-badge';
export default {
  mixins:[badgeMix],
  components: { mySearch },
  data() {
    return {
      swiperList: [],
      //分类导航的数据
      navList: [],
      floorList: [],
    };
  },
  onLoad() {
    this.getSwiperList();
    this.getnavList();
    this.getFloorList();
  },
  methods: {
    async getSwiperList() {
      console.log(1);
      this.$http
        .get("/api/public/v1/home/swiperdata")
        .then(({ data }) => {
          console.log(data);
          if (data.meta.status != 200) return showMsg();

          this.swiperList = data.message;
          showMsg("数据请求成功");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    gotoSearch(){
      uni.navigateTo({
        url:'/subpkg/search/index'
      })
    },
    getnavList() {
      this.$http
        .get("/api/public/v1/home/catitems")
        .then(({ data }) => {
          if (data.meta.status !== 200) return showMsg();
          this.navList = data.message;
        })
        .catch((err) => console.log(err));
    },
    navClickHandler(item) {
      if (item.name === "分类") {
        uni.switchTab({
          url: "/pages/cate/index",
        });
      }
    },
    getFloorList() {
      this.$http
        .get("/api/public/v1/home/floordata")
        .then(({ data }) => {
          if (data.meta.status !== 200) return showMsg();
          console.log(data)
          data.message.forEach(floor => {
            floor.product_list.forEach(prod=>{
              prod.url = '../../subpkg/goods_list/index?' + prod.navigator_url.split('?')[1];

            })
          });
          this.floorList = data.message;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped lang="scss">
swiper {
  height: 330rpx;
  .swiper-item,
  image {
    width: 100%;
    height: 100%;
  }
}
.search-box{
  position: sticky;
  top: 0;
  z-index:999;
}
.nav-list {
  display: flex;
  justify-content: space-around;
  margin: 15px 0;

  .nav-img {
    width: 128rpx;
    height: 140rpx;
  }
}
.floor-title {
  height: 60rpx;
  width: 100%;
  display: flex;
}

.floor-img-box {
  display: flex;
  padding-left: 10rpx;
  .right-img-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
}
</style>
