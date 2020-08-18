<!-- 错误提示页面 -->
<template>
  <div class="errMessage">
    <div class="head_box">
      <mt-header title="错误">
        <router-link to="/home" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <!-- 返回 -->
   <!-- <GoBack></GoBack> -->
    <!-- 错误内容 -->
    <img src="../../../static/image/error.png" alt="" style="margin: 100px 0 40px 0;">
    <div v-html="content" class="errDiv"></div>
    <div class="errpageBtn" @click="goback()">返回</div>
  </div>

</template>

<script>

// import GoBack from '../module/common/goBack.vue'

export default {
  name: 'errMessage',
  data () {
    return {
      // 错误内容
      content: ''
    }
  },
  components: {
    // GoBack,
  },
  methods: {
    goback () {
      this.$router.go(-1)
      // 关闭页面
    //   window['closePageCallBackFund'] = function (data) {
    //     console.log(data)
    //     console.log('关闭指令')
    //   }
    }
  },
  mounted () {
    this.content = this.$route.params.content
    if (this.content === undefined || this.content === '') {
      this.content = "<p style='font-size:18px;color:#aeaeae;margin-top:10%;text-align: center'>页面掉失，请点击返回按钮，重新登录</p>"
    } else {
      this.$nextTick(function () {
        var errbtn = document.getElementsByClassName('errbtn')[0]
        errbtn.setAttribute('style', 'display:none;')
      })
    }
  }
}
</script>

<style scoped >
.mint-header{
  background-color: #ff5b00;
  height: 90px;
  line-height: 90px;
  font-size: 34px;
}
.errMessage{
  height: 100%;
}
.errDiv{
  margin-top: 0;
}
.errpageBtn{
  width: 600px;
  height: 88px;
  background-color:transparent;
  text-align: center;
  line-height: 88px;
  font-size: 34px;
  color: #ff5b00;
  margin-left: 75px;
  margin-top: .6rem;
  border-radius:44px;
  border: 1px solid #ff5b00;
  margin-top: 80px;
}
.errContent {
  font-size: 32px;
}
</style>
