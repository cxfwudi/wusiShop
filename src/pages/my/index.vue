<template>
  <view class="my-container">
    <my-login v-if="!token"></my-login>
    <my-userinfo v-else></my-userinfo>
  </view>
</template>

<script>
import { showMsg } from "../../utils/showMsg";
import badgeMix from "@/mixins/tabbar-badge";
import myLogin from "@/components/my-login/index.vue";
import myUserinfo from "@/components/my-userinfo/index.vue";
import { mapState } from "vuex";
export default {
  mixins: [badgeMix],
  components: { myLogin, myUserinfo },
  data() {
    return {};
  },
  computed: {
    ...mapState("m_user", ["token"]),
  },
};
</script>

<style lang="scss">
.my-container {
  height: 100%;
}
</style>
