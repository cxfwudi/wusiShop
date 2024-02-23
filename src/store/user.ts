export default {
  // 开启命名空间
  namespaced: true,

  // state 数据
  state: () => ({
    // 收货地址
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: 'jiadtoken',
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
  }),

  // 方法
  mutations: {
    // 更新收货地址
    updateAddress(state: any, address: any) {
      state.address = address;
      uni.setStorageSync('address', JSON.stringify(state.address));
    },
    // 更新用户的基本信息
    updateUserInfo(state:any, userinfo:any) {
      state.userinfo = userinfo;
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo));
    },
  },

  // 数据包装器
  getters: {
    addstr(state: any) {
      if (!state.address.provinceName) return "";
      return (
        state.address.provinceName +
        state.address.cityName +
        state.address.countyName +
        state.address.detailInfo
      );
    },
  },
}