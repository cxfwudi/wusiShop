<template>
  <view class="goods-item">
    <!-- 商品左侧图片区域 -->
    <view class="goods-item-left">
      <radio
        color="#C00000"
        :checked="goods.goods_state"
        v-if="showRadio"
        @click="radioClickHandler"
      />
      <image
        :src="goods.goods_small_logo || defaultPic"
        class="goods-pic"
      ></image>
    </view>
    <!-- 商品右侧信息区域 -->
    <view class="goods-item-right">
      <!-- 商品标题 -->
      <view class="goods-name">{{ goods.goods_name }}</view>
      <view class="goods-info-box">
        <!-- 商品价格 -->
        <view class="goods-price">￥{{ goods.goods_price | myToFixed }}</view>
        <uni-number-box
          :min="1"
          :value="goods.goods_count"
          v-if="showNum"
        ></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default: {},
    },
    showRadio: {
      type: Boolean,
      //默认情况不展示radio组件
      default: false,
    },
    //控制隐藏数量选择框
    showNum: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      defaultPic:
        "https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png",
    };
  },
  filters: {
    myToFixed(num) {
      return Number(num).toFixed(2);
    },
  },
  methods: {
    radioClickHandler() {
      this.$emit("radio-change", {
        goods_id: this.goods.goods_id,
        goods_state: !this.goods.goods_state,
      });
    },
  },
};
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* flex:1平分剩下的区域 */
    flex: 1;

    .goods-name {
      font-size: 13px;
    }
    .goods-info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-price {
        font-size: 16px;
        color: #c00000;
      }
    }
  }
}
</style>
