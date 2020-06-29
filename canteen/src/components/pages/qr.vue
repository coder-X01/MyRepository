<template>
  <div class="main">
      <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade">
      <solt name="qr_box">
        <canvas id="QRCode"></canvas>
      </solt>
    </mt-popup>
    <div @click='drag' class="drag"></div>
 </div>
</template>
<script>
// 引入qrcode
import QRCode from 'qrcode'
export default{
  name: 'qr',
  data () {
    return {
      popupVisible: false,
      QRCodeMsg: '' // 生成二维码信息
    }
  },
  // 通过监听获取数据
  watch: {
    QRCodeMsg (val) {
      // 获取页面的canvas
      var msg = document.getElementById('QRCode')
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, val, function (error) {
        console.log(error)
      })
    }
  },
  methods: {
    getQRCode () {
    // 生成的二维码为URL地址
      this.popupVisible = true
      this.QRCodeMsg = window.location.href
    },
    drag (el) {
      console.log(el)
      console.log('========')
      el.onmousedown = function (e) {
        console.log(111)
        var disx = e.pageX - el.offsetLeft
        var disy = e.pageY - el.offsetTop
        document.onmousemove = function (e) {
          el.style.left = e.pageX - disx + 'px'
          el.style.top = e.pageY - disy + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null
        }
      }
    }
  }
}
</script>

<style scoped>
.main{
  width:9px;
  height:9px;
}
#QRCode{
  width:400px !important;
  height:400px !important;
}
.drag{
            width: 100px;
            height: 100px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: red;
}
</style>
