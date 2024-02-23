export default {
  namespaced: true,
  //要返回对象所以箭头函数的大括号要拿小括号括起来
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    addToCart(state: any, goods: any) {
      const findRes = state.cart.find((x: any) => x.goods_id === goods.goods_id);
      // find返回找到元素的第一个，没有找到则返回undefined
      if (!findRes) {
        state.cart.push(goods);
      } else {
        findRes.goods_count++;
      }
      uni.setStorageSync('cart', JSON.stringify(state.cart));
    },
    //更新购物车的商品勾选状态
    updateGoodsState(state: any, goods: any) {
      const findRes = state.cart.find((x: any) => x.goods_id === goods.goods_id);
      if (findRes) findRes.goods_state = goods.goods_state;
      uni.setStorageSync('cart', JSON.stringify(state.cart));
    },
    updateGoodsCount(state: any, goods: any) {
      const findRes = state.cart.find((x: any) => x.goods_id === goods.goods_id);
      if (findRes) findRes.goods_count = goods.goods_count;
      uni.setStorageSync('cart', JSON.stringify(state.cart));
    },
    removeGoodsById(state: any, goods_id: any) {
      state.cart = state.cart.filter((x: any) => x.goods_id !== goods_id);
      uni.setStorageSync('cart', JSON.stringify(state.cart));
    },
    updateAllGoodsState(state: any, newState: any) {
      state.cart.forEach((x: any) => x.goods_state = newState);
      uni.setStorageSync('cart', JSON.stringify(state.cart));
    }
  },

  getters: {
    total(state: any) {
      return state.cart.reduce((total: number, item: any) => { return total += item.goods_count }, 0);
    },
    checkedCount(state: any) {
      return state.cart.filter((x: any) => x.goods_state).reduce((total: number, item: any) => { return total += item.goods_count }, 0)
    },
    checkedGoodsAmount(state:any) {
      //计算商品的总价格
      return state.cart.filter((x:any) => x.goods_state)
        .reduce((total:number, item:any) => total += item.goods_count * item.goods_price, 0)
        .toFixed(2)
    }
  }
}