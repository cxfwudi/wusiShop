import Vue from 'vue';
import Vuex from 'vuex';
import moduleCart from '@/store/cart';
import moduleUser from '@/store/user';
Vue.use(Vuex);

const store:any = new Vuex.Store({
  modules:{
    'm_cart':moduleCart,
    m_user: moduleUser,
  }
})

export default store;