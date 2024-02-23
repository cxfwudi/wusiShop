<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserProfile">
      一键登录
    </button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
import { showMsg } from "@/utils/showMsg";
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations("m_user", ["updateUserInfo"]),
    //获取用户的基本信息

    getUserProfile() {
      uni.getUserProfile({
        desc: " 完善用户资料",
        success: (res) => {
          if (res.errMsg !== "getUserProfile:ok")
            return showMsg("登陆中出现了问题");
          console.log(res);
          this.updateUserInfo(res);
          this.getToken(res);
        },
        fail: () => {
          showMsg("您取消了授权");
        },
      });
    },
    async getToken(info) {
      const res = await uni.login().catch((err) => err);
      console.log(res);
      if (res.errMsg !== "login:ok") return showMsg("登录失败");
      const query = {
        code: res.code,
        encryptedData: info.encryptedData,
        iv: info.iv,
        rawData: info.rawData,
        signature: info.signature,
      };
      //由于小程序开发者权限问题，此处拿不到token，故token写死
      this.$http
        .post("/api/public/v1/users/wxlogin",query)
        .then(data=>{
          // console.log(data)
        })
    },
  },
};
</script>

<style lang="scss">
.login-container {
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  &::after {
    content: " ";
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
