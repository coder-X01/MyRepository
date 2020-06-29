<template>
  <div class="homepage">
    <div class="head_content">
      <div class="user_qr">
        <div class="user_info" @click="goSettings">
          <img src="@/../static/image/wo.png" alt="">
          <span>{{user_info.name}}</span>
        </div>
        <div class="qr" @click="getQRCode()">
          <span class="qr_icon"></span>
          <span>二维码</span>
        </div>
      </div>
      <div class="account_money">
        <span>账户总余额</span>
        <p>￥{{totalAmount}}</p>
      </div>
      <div class="subsidy_cash">
          <div class="subsidy" :link= 'cbmxUrl' type_id='0002' @click = GoSubsidy($event)>
            <span>餐补账户</span>
            <p>￥{{supplementBalance}}</p>
          </div>
        <div class="cash" :link= 'xjczUrl' type_id='0002' @click = GoSubsidy($event)>
          <span>现金账户</span>
          <p>￥{{cashBalance}}</p>
        </div>
      </div>
    </div>
    <div class="bottom_content">
      <div class="content_box">
        <div class="content">
          <div class="icon" v-for="(item,index) in menuList" :key="index">
            <div :link= "item.ACTION" @click = GoSubsidy($event) class="icon_box" :type_id = "item.TYPE_ID">
              <img :src="item.IMAGE_REF" alt="">
              <p>{{item.MENU_NAME}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="qrbox">
        <mt-popup
        v-model="popupVisible"
        popup-transition="popup-fade">
        <slot name="qr_box1">
          <canvas id="QRCode"></canvas>
        </slot>
      </mt-popup>
   </div>
  </div>
</template>
<script>

import QRCode from 'qrcode'
export default {
  name: 'home',
  data () {
    return {
      user_info: {
        name: ''
      },
      totalAmount: '',
      supplementBalance: '',
      cashBalance: '',
      menuList: [],
      QRCodeMsg: '',
      popupVisible: false,
      cbmxUrl: '',
      xjczUrl: '',
      xgmmUrl: ''
    }
  },
  methods: {
    goSettings () {
      this.$router.push({path: '/settings'})
    },
    // 跳转
    GoSubsidy (e) {
      let type = e.currentTarget.getAttribute('TYPE_ID')
      if (type === '0002') {
        let target = e.currentTarget.getAttribute('link')
        this.$router.push({path: '/myiframe', query: {target: target}})
        console.log(target)
      } else {
        console.log('打开摄像头')
      }
      // this.$router.push({path: '/myiframe'})
    },
    // 初始化
    init () {
      let that = this
      let mobilePhone = localStorage.getItem('mobile')
      let campusId = localStorage.getItem('campusId')
      let cidNo = localStorage.getItem('cidNo')
      let PASSWORD = localStorage.getItem('PASSWORD')
      let LOGINTYPE = localStorage.getItem('LOGINTYPE')
      let params = {'TXCODE': 'ST0020', 'mobile': mobilePhone, 'CAMPUS_ID': campusId, 'CIDNO': cidNo, 'PASSWORD': PASSWORD, 'LOGINTYPE': LOGINTYPE}
      this.ajax('get', params, function (res) {
        if (res.data.errCode === '10000') {
          that.getData()
        } else {
          alert(res.data.errMsg)
          let campusId = localStorage.getItem('campusId')
          localStorage.clear()
          this.$router.push({path: '/login', query: {'campusId': campusId}})
        }
      }, function (err) { console.log(err) }, this.testURL)
    },
    // 获取数据
    getData () {
      let that = this
      let campusId = localStorage.getItem('campusId')
      let params = {'CAMPUS_ID': campusId, 'TXCODE': 'ST0040'}
      this.ajax('get', params, function (res) {
        console.log(res)
        that.menuList = res.data.menuList
        that.user_info.name = res.data.name
        that.totalAmount = res.data.totalAmount
        that.cashBalance = res.data.cashBalance
        that.supplementBalance = res.data.supplementBalance
        that.cbmxUrl = res.data.cbmxUrl
        that.xjczUrl = res.data.xjczUrl
        that.xgmmUrl = res.data.xgmmUrl
        localStorage.setItem('xgmmUrl', that.xgmmUrl)
      }, function (err) { console.log(err) }, this.testURL)
    },
    // 二维码
    getQRCode () {
      // // 生成的二维码为URL地址
      // this.QRCodeMsg = '123'
      // // 控制二维码
      // this.popupVisible = true
      let that = this
      let campusId = localStorage.getItem('campusId')
      let cidNo = localStorage.getItem('cidNo')
      console.log(campusId)
      let params = {'TXCODE': 'ST0021', 'CAMPUS_ID': campusId, 'CIDNO': cidNo}
      this.ajax('get', params, function (res) {
        // 生成的二维码为URL地址
        that.QRCodeMsg = res.data.encMsg
        // 控制二维码
        that.popupVisible = true
      }, function (err) { console.log(err) }, this.testURL)
    }
  },
  mounted () {
    this.init()
  },
  // 通过监听获取数据
  watch: {
    QRCodeMsg (val) {
      // 获取页面的canvas
      let msg = document.getElementById('QRCode')
      // 将获取到的数据（val）画到msg（canvas）上
      QRCode.toCanvas(msg, val, function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<style scoped="scoped">
.backcolor{
  width: 100%;
  height: 100%;
  background-color: #FF6600
}
.qr_icon{
  display: inline-block;
  width: 32px;
  height: 32px;
  background: url('../../../static/image/qr.png');
  background-size:100% 100%;
  position: absolute;
  left: 0px;
  top:14px;
}
.head_content{
  width: 100%;
  height: 510px;
  background-color: #FF6600;
  margin: 0 auto;
}
.user_qr{
  display: flex;
  justify-content:space-between;
  padding-top: 70px;
  padding-left: 15px;
  padding-right: 15px;
}
.user_info>span{
  font-size: 36px;
  text-indent: 10px;
  color: #fff;
  display: inline-block;
  box-sizing: border-box;
}
.user_info>img{
  width: 80px;
  height: 80px;
  vertical-align:middle;
  border-radius: 50%;
}
.qr{
  width: 200px;
  height: 60px;
  line-height: 60px;
  background-color: #da4700;
  border-radius: 30px;
  margin-top: 10px;
  position: relative;
}
.qr span{
  font-size: 28px;
  color: #fff;
  margin-left: 35px;
}
.account_money{
  margin-top: 25px;
}
.account_money span{
  margin-left: 50px;
  font-size: 28px;
  color: #fff
}
.account_money p {
  font-size: 64px;
  color: #fff;
  margin: 0;
}
.subsidy_cash{
  margin-top: 25px;
  display: flex;
}
.subsidy_cash .subsidy{
  width: 49%;
}
.subsidy_cash .cash{
  width: 49%;
}
.subsidy span{
  margin-left: 35px;
  font-size: 24px;
  color: #fff
}
.subsidy p{
  font-size: 40px;
  color: #fff;
  margin: 0;
}
.cash span{
  margin-left: 40px;
  font-size: 24px;
  color: #fff
}
.cash p{
  font-size: 40px;
  color: #fff;
  margin: 0;
}
.bottom_content{
  width: 100%;
  height: 70%;
  background-color:  #F6F4F5;
}
.content{
  position: absolute;
  display: flex;
  flex-wrap:wrap;
  width: 680px;
  background-color: #fff;
  border-radius: 40px 40px 0 0;
  top:-50px;
  left: 35px;
  box-sizing: border-box;
  padding-top: 50px;
  align-content: flex-start;
  height: 100%;
}
.icon{
  width: 25%;
  height: 130px;
  margin-bottom: 60px;
}
.icon p{
  margin: 0;
}
.icon img {
  width: 90px;
  height: 90px;
}
.icon:nth-child(4n){
  margin-right: 0;
}
.content_box{
  position: relative;
  height: 100%
}
#QRCode{
  width:600px !important;
  height:600px !important;
}
.icon_box>p{
  font-size: 28px;
}
.homepage{
  height: 100%;
}
</style>
