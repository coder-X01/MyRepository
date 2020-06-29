<template>
  <div class="accept-container">
    <div class="back_box" @click="goBack">
      返回
    </div>
    <!-- <span class="go-back" v-show="goBackState">返回</span> -->
  <iframe v-show="iframeState" style="position: absolute; left: 0" id="show-iframe" height="100%" width="100%" frameborder=0 name="showHere" scrolling=auto :src="URL"></iframe>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
export default {
  name: 'myframe',
  data () {
    return {
      URL: '',
      iframeState: true,
      goBackState: true
    }
  },
  methods: {
    goBack () {
      console.log('父盒子内容')
      this.$router.go(-1)
    },
    init () {
      let that = this
      that.myModal.downLoad(that, true)
      let oIframe = document.getElementById('show-iframe')
      let deviceWidth = document.documentElement.clientWidth
      let deviceHeight = document.documentElement.clientHeight
      oIframe.style.width = deviceWidth + 'px'
      oIframe.style.height = deviceHeight + 'px'
      // console.log(this.$route.query)
      let url = this.$route.query.target
      // let url = 'http://baidu.com'
      console.log(url)
      if (!url) {
        MessageBox.alert('功能正在开发中', '提示')
        this.$router.push({path: '/home'})
      } else {
        this.URL = url
        const iframe = document.querySelector('#show-iframe')
        iframe.onload = () => {
          console.log('加载完成') // 这样每次都会触发
          that.myModal.downLoad(that, false)
        }
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped>
.back_box{
  position: fixed;
  top: 200px;
  right: 0px;
  width: 150px;
  height: 70px;
  line-height: 70px;
  background-color:rgba(120,120,120,0.3);
  border-radius: 40px 0 0 40px;
  z-index: 1000;
}
.go-back{
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 10;
}
</style>
