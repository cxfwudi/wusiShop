export default {
  namespaced:true,
  //要返回对象所以箭头函数的大括号要拿小括号括起来
  state:()=>({
    cart:JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations:{
    addToCart(state:any,goods:any){
      const findRes = state.cart.find((x:any)=>x.goods_id === goods.goods_id);
      // find返回找到元素的第一个，没有找到则返回undefined
      if(!findRes){
        state.cart.push(goods);
      }else{
        findRes.goods_count++;
      }
      uni.setStorageSync('cart',JSON.stringify(state.cart));
    },
    //更新购物车的商品勾选状态
    updateGoodsState(state:any,goods:any){
      const findRes = state.cart.find((x:any)=>x.goods_id === goods.goods_id);
      if(findRes) findRes.goods_state = goods.goods_state;
      uni.setStorageSync('cart',JSON.stringify(state.cart));
    },
    updateGoodsCount(state:any,goods:any){
      const findRes = state.cart.find((x:any)=>x.goods_id === goods.goods_id);
      if(findRes) findRes.goods_count = goods.goods_count;
      uni.setStorageSync('cart',JSON.stringify(state.cart));
    },
    removeGoodsById(state:any,goods_id:any){
      state.cart = state.cart.filter((x:any)=>x.goods_id !== goods_id);
      uni.setStorageSync('cart',JSON.stringify(state.cart));
    }
  },
  
  getters:{
    total(state:any){
      let c = 0;
      state.cart.forEach((x:any) => {
        c += x.goods_count
      });
      return c;
    }
  }
}