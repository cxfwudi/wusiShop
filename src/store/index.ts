import Vue from 'vue';
import Vuex from 'vuex';
import moduleCart from '@/store/cart'
Vue.use(Vuex);

const store:any = new Vuex.Store({
  modules:{
    'm_cart':moduleCart
  }
})

export default store;