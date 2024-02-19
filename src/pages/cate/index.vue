<template>
  <view>
    <mySearch @click="gotoSearch"></mySearch>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->

      <scroll-view
        class="left-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
      >
        <block v-for="(item, i) in cateList" :key="i">
          <view
            @click="activeChange(i)"
            :class="['left-scroll-view-item', i === active ? 'active' : '']"
            >{{ item.cat_name }}</view
          >
        </block>
      </scroll-view>

      <!-- 右侧的滚动视图区域 -->
      <scroll-view
        class="right-scroll-view"
        scroll-y
        :style="{ height: wh + 'px' }"
        :scroll-top="scrollTop"
      >
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-title"> /{{ item2.cat_name }}/ </view>
          <!-- 三级分类 -->
          <view class="cate-lv3-list">
            <!-- 三级分类 Item 项 -->
            <view
              class="cate-lv3-item"
              v-for="(item3, i3) in item2.children"
              :key="i3"
              @click="gotoGoodsList(item3)"
            >
              <!-- 图片 -->
              <image
                :src="item3.cat_icon.replace('ugo-dev','hmugo-web')"
                mode="widthFix"
              ></image>
              <!-- 文本 -->
              <text>{{ item3.cat_name }}</text>
            </view>
          </view>
        </view>
      </scroll-view>
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
      wh: 0, //当前设备可用的高度
      cateList: [],
      active: 0,
      //二级分类数组
      cateLevel2: [],
      scrollTop: 0
    };
  },
  onLoad(options) {
    const sysInfo = uni.getSystemInfoSync();
    this.wh = sysInfo.windowHeight - 50;
    this.getCateList();
  },
  methods: {
    gotoSearch(){
      uni.navigateTo({
        url:'/subpkg/search/index'
      })
    },
    getCateList() {
      this.$http
        .get("/api/public/v1/categories")
        .then(({ data }) => {
          if (data.meta.status != 200) return showMsg();
          this.cateList = data.message;
          this.cateLevel2 = data.message[0].children;
        })
        .catch((err) => console.log(err));
    },
    activeChange(i) {
      this.active = i;
      //重新为二级列表获取数据
      this.cateLevel2 = this.cateList[i].children;
      this.scrollTop = this.scrollTop === 0 ? 1 : 0;
    },
    gotoGoodsList(item3){
      uni.navigateTo({
        url:'/subpkg/goods_list/index?cid=' + item3.cat_id
      })
    }
  },
};
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;
  .left-scroll-view {
    width: 120px;
    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

     
      &.active {
        background-color: #ffffff;
        position: relative;

        &::before {
          content: " ";
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  .cate-lv2-title {
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }
  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item {
      width: 33.33%;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;

      image {
        width: 60px;
        height: 60px;
      }

      text {
        font-size: 12px;
      }
    }
  }
}
</style>
