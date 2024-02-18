import Vue from 'vue';
import Vuex from 'vuex';
import moduleCart from '@/store/index'
Vue.use(Vuex);

const store:any = new Vuex.Store({
  modules:{
    'm_cart':moduleCart
  }
})

export default store;