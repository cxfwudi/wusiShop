<template>
  <view>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->
    <block v-for="(goods, i) in cart" :key="i">
      <my-goods :goods="goods" :showRadio="true" @radio-change = "radioChangeHandler" :showNum="true"></my-goods>
    </block>
  </view>
</template>

<script>
import { showMsg } from "../../utils/showMsg";
import { mapGetters, mapState,mapMutations } from "vuex";
import myGoods from "@/components/my-goods/index.vue";
import badgeMix from "@/mixins/tabbar-badge";
export default {
  mixins: [badgeMix],
  components: { myGoods },
  //从vuex中拿到
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  methods:{
    ...mapMutations('m_cart',['updateGoodsState']),
    //e获取子组件传的数据
    radioChangeHandler(e){
      this.updateGoodsState(e);
    }
  }
};
</script>

<style lang="scss">
.cart-title {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text {
    margin-left: 10px;
  }
}
</style>
