<template>
  <div>
      <div class="head_box">
        <mt-header title="更改手机号">
          <router-link to="/settings" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
      </div>
    <form class="box">
      <div style="position: relative">
        <span class="mobile"></span>
        <input type="text" v-model="mobilePhone" maxlength="11" placeholder="手机号"/>
      </div>
      <div style="position: relative">
        <span class="yzm">&nbsp;</span>
        <input type="text" v-model="checkNum" class="checkNum" placeholder="验证码"/>
        <div :disabled="isClick" @click="getCode" class="getnum">{{tempTitle}}</div>
      </div>
      <div>
        <button @click="next" class="loginButton" onclick="return false;">完&nbsp;&nbsp;&nbsp;成</button>
      </div>
    </form>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'

export default{
  data () {
    return {
      cidNo: '',
      custName: '',
      tempTitle: '获取验证码',
      isClick: false,
      mobilePhone: '',
      checkNum: ''
    }
  },
  methods: {
    init () {
      // const token = localStorage.getItem('localToken')
    },
    getCode () {
      let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      if (!this.mobilePhone) {
        Toast('请输入手机号！')
        return false
      }
      if (!TEL_REGEXP.test(this.mobilePhone)) {
        Toast('请输入正确的手机号！')
        return false
      } else {
        let count = 60
        let countDown = setInterval(() => {
          if (count < 1) {
            this.isClick = false
            this.tempTitle = '获取验证码'
            clearInterval(countDown)
          } else {
            this.isClick = true
            this.tempTitle = count-- + 's后重发'
          }
        }, 1000)
        let params = {'TXCODE': 'ST0002', 'mobile': this.mobilePhone}
        this.ajax('get', params, function (res) {
        }, function (err) { console.log(err) }, this.testURL)
      }
    },
    next () {
      let that = this
      let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      if (!this.mobilePhone) {
        Toast('请输入手机号！')
        return false
      }
      if (!TEL_REGEXP.test(this.mobilePhone)) {
        Toast('请输入正确的手机号！')
        return false
      }
      if (!this.checkNum) {
        Toast('请输入验证码！')
        return false
      }
      let campusId = localStorage.getItem('campusId')
      let cidNo = localStorage.getItem('cidNo')
      let params = {'TXCODE': 'ST0006', 'mobile': this.mobilePhone, 'SMScode': this.checkNum, 'campusId': campusId, 'cidNo': cidNo}
      this.ajax('get', params, function (res) {
        if (res.data.errCode === '10000') {
          that.$router.push({path: '/home'})
        } else {
          alert(res.data.errMsg)
        }
      }, function (err) { console.log(err) }, this.testURL)
    }
  },
  mounted () {
  }
}
</script>
<style scoped="scoped">
.mint-header{
  background-color: #ff5b00;
  height: 90px;
  line-height: 90px;
  font-size: 34px;
}
.mintui mintui-back{
  font-size: 19px;
}
.mint-header-title{
  font-weight: 900
}
.mint-header-button.is-left{
  margin-left: 10px
}
.getnum{
  position: absolute;
  background-color:#F6F4F5;
  top:70px;
  right: 90px;
  color: #FF6600;
}
.box .loginButton{
  margin-top: 20px;
  width: 600px;
  background-color: #FF6600;
  color: white;
  height: 100px;
  border-radius: 56px;
}
.yzm{
  background: url("../../../static/image/yzm.png");
  top:65px;
  background-size: 100% 100%;
}
.pwrod{
  background: url("../../../static/image/passwrod.png");
  top:65px;
  background-size: 100% 100%;
}
.box input{
  width: 600px;
  margin-top: 20px;
  height: 100px;
  text-indent: 100px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  font-size: 36px;
}
.box button{
  border: none;
  font-size: 36px;
}
.box span{
  display: inline-block;
  width: 64px;
  height: 64px;
  position: absolute;
  left: 90px;
}
.box p {
  text-decoration: underline;
  font-size: 37px;
  color: #ff5900;
  display: inline-block;
  margin-right: 300px;
}
.box{
  font-family: PingFangSC-Regular;
  margin-top: 50%;
  text-align:center;
}
.box .checkNum{
  margin-top: 42px;
  width: 600px
}
</style>
