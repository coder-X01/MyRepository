<template>
  <div class="accept-container">
    <div class="back_box"
      ref="moveBtn"
      @click='goBack'
      @mousedown="down"
      @touchstart="down"
      @mousemove="move"
      @touchmove="move"
      @mouseup="end"
      @touchend="end"
      @touchcancel="end"
    >返回</div>
    <!-- <span class="go-back" v-show="goBackState">返回</span> -->
    <iframe
      v-show="iframeState"
      style="position: absolute; left: 0"
      id="show-iframe"
      height="100%"
      width="100%"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      :src="URL"
    ></iframe>
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
      goBackState: true,
      position: {
        y: 0
      },
      moveBtn: {},
      active: 0,
      ny: '',
      dy: '',
      yPum: '',
      isShow: false
    }
  },
  methods: {
    goBack () {
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
      let url = this.$route.query.target
      console.log(url)
      if (!url) {
        MessageBox.alert('正在开发中', '提示')
        this.$router.push({ path: '/home' })
      } else {
        this.URL = url
        const iframe = document.querySelector('#show-iframe')
        iframe.onload = () => {
          console.log('加载完成') // 这样每次都会触发
          that.myModal.downLoad(that, false)
        }
      }
    },
    down () {
      this.flags = true
      var touch
      if (event.touches) {
        touch = event.touches[0]
      } else {
        touch = event
      }
      this.position.y = touch.clientY
      this.dy = this.moveBtn.offsetTop
    },
    move () {
      if (this.flags) {
        var touch
        if (event.touches) {
          touch = event.touches[0]
        } else {
          touch = event
        }
        this.ny = touch.clientY - this.position.y
        this.yPum = this.dy + this.ny
        var clientHeight = document.documentElement.clientHeight
        if (
          this.yPum > 0 &&
          this.yPum < clientHeight - this.moveBtn.offsetHeight
        ) {
          this.moveBtn.style.top = this.yPum + 'px'
        }

        // 阻止页面的滑动默认事件
        document.addEventListener('touchmove', this.handler, {
          passive: false
        })
      }
    },
    // 鼠标释放时候的函数
    end () {
      this.flags = false
      document.addEventListener('touchmove', this.handler, {
        passive: false
      })
    },
    handler () {
      if (this.flags) {
        event.preventDefault()
      } else {
        return true
      }
    }
  },
  mounted () {
    this.init()
    this.moveBtn = this.$refs.moveBtn
  }
}
</script>
<style scoped>
.back_box {
  position: fixed;
  right: 0;
  top:200px;
  width: 150px;
  height: 70px;
  line-height: 70px;
  background-color: rgba(120, 120, 120, 0.3);
  border-radius: 40px 0 0 40px;
  z-index: 1;
}
.go-back {
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 10;
}

.accept-container {
  width: 100%;
  height: 100%;
}
</style>
