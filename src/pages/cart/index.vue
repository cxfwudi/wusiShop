<template>
  <view>
    <my-address></my-address>
    <!-- 购物车商品列表的标题区域 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <!-- 描述文本 -->
      <text class="cart-title-text">购物车</text>
    </view>
    <!-- 商品列表区域 -->

    <uni-swipe-action>
      <block v-for="(goods, i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swiperClickHandler(goods)">
          <my-goods
            :goods="goods"
            :showRadio="true"
            @radio-change="radioChangeHandler"
            :showNum="true"
            @num-change="numberChangeHandler"
          ></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
  </view>
</template>

<script>
import { showMsg } from "../../utils/showMsg";
import { mapGetters, mapState, mapMutations } from "vuex";
import myGoods from "@/components/my-goods/index.vue";
import myAddress from "@/components/my-address/index.vue";
import badgeMix from "@/mixins/tabbar-badge";
export default {
  data(){
    return {
      options:[{
        text:'删除',
        style:{
          backgroundColor:'#C00000'
        }
      }]
    }
  },
  mixins: [badgeMix],
  components: { myGoods,myAddress },
  //从vuex中拿到
  computed: {
    ...mapState("m_cart", ["cart"]),
  },
  methods: {
    ...mapMutations("m_cart", ["updateGoodsState", "updateGoodsCount","removeGoodsById"]),
    //e获取子组件传的数据
    radioChangeHandler(e) {
      this.updateGoodsState(e);
    },
    numberChangeHandler(e) {
      this.updateGoodsCount(e);
    },
    swiperClickHandler(goods){
      this.removeGoodsById(goods.goods_id);
    }
  },
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
