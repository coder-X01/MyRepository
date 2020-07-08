<!-- 错误提示页面 -->
<template>
  <div>
    <!-- 返回 -->
   <!-- <GoBack></GoBack> -->
    <!-- 错误内容 -->
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
      this.content = "<p style='font-size:18px;color:#aeaeae;margin-top:30%;text-align: center'>页面掉失，请点击返回按钮，重新登录</p>"
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
.errDiv{
  margin-top: 0;
}
.errpageBtn{
  width: 70%;
  height: 100px;
  background: #ff5b00;
  text-align: center;
  line-height: 100px;
  font-size: 36px;
  color: white;
  margin-left: 15%;
  margin-top: .6rem;
  border-radius:30px;
}
.errMessage{
  font-size: 24px
}
.errMessage > p{
  font-size: 20px;
}
.errCode > span {
  font-size: 20px
}
</style>
