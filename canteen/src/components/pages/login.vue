<template>
  <div class="login_page">
    <div class="img_text">
      <img src="@/../static/image/logo.png" alt="">
    </div>
    <!-- 手机号验证码登陆 -->
    <form class="box" v-show="cur==0">
      <div style="position: relative">
        <span class="mobile"></span>
        <input type="text" v-model="mobilePhone" maxlength="11" placeholder="手机号"/>
      </div>
      <div style="position: relative">
        <span class="yzm">&nbsp;</span>
        <input type="text" v-model="checkNum" class="checkNum" placeholder="验证码"/>
        <div :disabled="isClick" @click="getCode" class="getnum">{{tempTitle}}</div>
      </div>
      <div class="change_box" style="position: relative" @click = 'toggle' v-show="loginMode=='1'">
        <p>{{tip}}</p>
      </div>
      <div>
        <button @click="loginTo" class="loginButton" onclick="return false;">登&nbsp;&nbsp;&nbsp;录</button>
      </div>
    </form>
    <!-- 账号密码登陆 -->
    <form class="box" v-show="cur==1" >
      <div style="position: relative">
        <span class="uesrCid"></span>
        <input type="text" v-model="cidNo" placeholder="员工编号"/>
      </div>
      <div style="position: relative">
        <span class="pwrod">&nbsp;</span>
        <input type="password" v-model="userPword" class="checkNum" placeholder="密码"/>
      </div>
      <div class="change_box" style="position: relative" >
        <p @click = 'toggle'>{{tip}}</p>
      </div>
      <div>
        <button @click="loginTo" class="loginButton" onclick="return false;">登&nbsp;&nbsp;&nbsp;录</button>
      </div>
    </form>

  </div>
</template>

<script>

import { Toast } from 'mint-ui'

export default {
  name: 'login',
  data () {
    return {
      mobilePhone: '',
      checkNum: '',
      isClick: false,
      tempTitle: '获取验证码',
      cur: '0', // 切换登陆模式
      tip: '账号密码登陆',
      cidNo: '',
      userPword: '',
      campusId: '',
      loginMode: '1'
    }
  },
  methods: {
    init () {
      console.log(this.$route)
      this.campusId = this.$route.query.campusId
      let that = this
      let params = {'TXCODE': 'ST0024', 'ENTRYID': this.campusId}
      this.ajax('get', params, function (res) {
        that.loginMode = res.data.loginMode
        if (that.loginMode === '1') {
          that.cur = '1'
          that.tip = '手机验证码登陆'
        }
      }, function (err) { console.log(err) }, this.testURL)
    },
    // 加密
    jiamiMima () {
      // let a = 'S000000000000000'
      // let b = 'S000000000000000'
    },
    // 保存数据
    saveData (res) {
      let campusId = res.data.campusId
      let localToken = res.data.localToken
      let mobile = res.data.mobile
      let userId = res.data.userId
      let cidNo = res.data.cidNo
      let campusName = res.data.campusName
      let custName = res.data.custName
      localStorage.setItem('campusId', campusId)
      localStorage.setItem('localToken', localToken)
      localStorage.setItem('mobile', mobile)
      localStorage.setItem('USERID', userId)
      localStorage.setItem('cidNo', cidNo)
      localStorage.setItem('campusName', campusName)
      localStorage.setItem('custName', custName)
    },
    toggle () {
      if (this.loginMode === '1') {
        console.log(this.cur)
        this.cur === '1' ? this.tip = '账号密码登陆' : this.tip = '手机验证码登陆'
        this.cur === '1' ? this.cur = '0' : this.cur = '1'
      }
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
    loginTo () {
      let that = this
      // 验证码登陆
      if (this.cur === '0') {
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
        let params = {'TXCODE': 'ST0001', 'mobile': this.mobilePhone, 'entryCampusId': this.campusId}
        this.ajax('get', params, function (res) {
          let fbyqCustList = res.data.fbyqCustList
          if (res.data.size === 0) {
            //  没有数据时
            alert('您的手机号暂未绑定智慧食堂,请联系管理员')
          } else if (res.data.size === 1) {
            //  只有一条数据时
            let campusId = fbyqCustList[0].campusId
            let data = {'TXCODE': 'ST0007', 'mobile': that.mobilePhone, 'SMScode': that.checkNum, 'campusId': campusId}
            that.ajax('get', data, function (res) {
              // 登陆成功保存数据
              that.saveData(res)
              localStorage.setItem('LOGINTYPE', 0)
              that.$router.push({path: '/home'})
            }, function (err) { console.log(err) }, that.testURL)
          } else {
            // 多条数据时
            localStorage.setItem('SMScode', that.checkNum)
            localStorage.setItem('mobile', that.mobilePhone)
            that.$router.push({path: '/SelectPark', query: {fbyqCustList: fbyqCustList}})
          }
        }, function (err) { console.log(err) }, this.testURL)
      } else {
        if (!this.cidNo) {
          Toast('请输入员工编号！')
          return false
        }
        if (!this.userPword) {
          Toast('请输入密码！')
          return false
        }
        // 账号密码登陆
        let params = {'TXCODE': 'ST0020', 'CIDNO': this.cidNo, 'PASSWORD': this.userPword, 'CAMPUS_ID': this.campusId, LOGINTYPE: 1}
        this.ajax('get', params, function (res) {
          if (res.data.errCode === '10000') {
            let params = {'TXCODE': 'ST0025', 'CIDNO': that.cidNo, 'PASSWORD': that.userPword, 'CAMPUS_ID': that.campusId, LOGINTYPE: 1}
            that.ajax('get', params, function (res) {
              that.saveData(res)
              let password = res.data.password
              localStorage.setItem('LOGINTYPE', 1)
              localStorage.setItem('PASSWORD', password)
              that.$router.push({path: '/home'})
            }, function (err) { console.log(err) }, that.testURL)
          } else {
            alert(res.data.errMsg)
          }
        }, function (err) { console.log(err) }, this.testURL)
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped="scoped">
.getnum{
  position: absolute;
  background-color:#F6F4F5;
  top:70px;
  right: 90px;
  color: #FF6600;
}
.img_text{
  width: 100%;
  margin: 0 auto;
  margin-top: 186px;
  margin-bottom: 124px;
}
.img_text img{
  width: 205px;
  height: 240px;
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
.mobile{
  background: url("../../../static/image/mobile.png");
  top:45px;
  background-size: 100% 100%;
}
.uesrCid{
  background: url("../../../static/image/user.png");
  top:45px;
  background-size: 100% 100%;
}
.box input{
  width: 600px;
  margin-top: 20px;
  height: 100px;
  text-indent: 100px;
  border: none;
  border-radius: 56px;
  background-color: #F6F4F5;
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
  margin-bottom: 50%;
  text-align:center;
}
.box .checkNum{
  margin-top: 42px;
  width: 600px
}
.login_page{
  background-color: #fff;
  height: 100%;
  border: 1px solid #fff
}
</style>
