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
      <div>
        <button @click="loginTo" class="loginButton" onclick="return false;">登&nbsp;&nbsp;&nbsp;录</button>
      </div>
      <div class="change_box" style="position: relative" @click = 'toggle' v-show="loginMode=='1'">
        <p>{{tip}}</p>
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
        <input type="password" v-model="userPword" class="checkNum" placeholder="密码" @change='jiamiMima'/>
      </div>
      <div>
        <button @click="loginTo" class="loginButton" onclick="return false;">登&nbsp;&nbsp;&nbsp;录</button>
      </div>
      <div class="change_box" style="position: relative" >
        <p @click = 'toggle'>{{tip}}</p>
      </div>
    </form>

  </div>
</template>

<script>

import { MessageBox } from 'mint-ui'

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
      loginMode: '1',
      a: '',
      b: [],
      CCB_PWD_MAP_GIGEST: '',
      keyjiami: 0
    }
  },
  methods: {
    init () {
      console.log(this.$route)
      this.loginMode = localStorage.getItem('loginMode')
      this.campusId = localStorage.getItem('campusId')
      let that = this
      if (this.loginMode === '1' && this.campusId === '110000001') {
        this.cur = '1'
        this.tip = '手机验证码登陆'
        let mapdata = {'TXCODE': 'ST0041'}
        this.ajax('get', mapdata, function (res) {
          that.a = res.data.key
          let keymap = new Array(res.data.mapString.length)
          console.log(keymap.length)
          for (let index = 0; index < keymap.length; index++) {
            keymap[index] = res.data.mapString.charAt(index)
          }
          that.b = keymap
          console.log(that.a)
          console.log('======')
          console.log(that.b)
          // res.data
        }, function (err) { console.log(err) }, this.testURL)
      }
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
        MessageBox.alert('请输入手机号！', '提示')
        return false
      }
      if (!TEL_REGEXP.test(this.mobilePhone)) {
        MessageBox.alert('请输入正确的手机号！', '提示')
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
          MessageBox.alert('请输入手机号！', '提示')
          return false
        }
        if (!TEL_REGEXP.test(this.mobilePhone)) {
          MessageBox.alert('请输入正确的手机号！', '提示')
          return false
        }
        if (!this.checkNum) {
          MessageBox.alert('请输入验证码！', '提示')
          return false
        }
        let params = {'TXCODE': 'ST0001', 'mobile': this.mobilePhone, 'entryCampusId': this.campusId, 'SMScode': this.checkNum}
        this.ajax('get', params, function (res) {
          if (res.data.errCode === '10000') {
            that.saveData(res)
            that.$router.push({path: '/home'})
          } else {
            if (!res.data.errMsg) {
              that.myModal.errorHtml(that, res.data)
            } else {
              alert(res.data.errMsg)
            }
          }
        }, function (err) { console.log(err) }, this.testURL)
      } else {
        // 账号密码登陆
        if (!this.cidNo) {
          MessageBox.alert('请输入员工编号！', '提示')
          return false
        }
        if (!this.userPword) {
          MessageBox.alert('请输入密码！', '提示')
          return false
        }
        if (this.userPword.length < 6) {
          MessageBox.alert('密码最低为6位', '提示')
          return false
        }
        let params = {'TXCODE': 'ST0025', 'CIDNO': this.cidNo, 'CAMPUS_ID': this.campusId, 'LOGPASS': this.userPword, 'CCB_PWD_MAP_GIGEST': this.CCB_PWD_MAP_GIGEST}
        this.ajax('get', params, function (res) {
          if (res.data.errCode === '10000') {
            that.saveData(res)
            that.$router.push({path: '/home'})
          } else {
            if (!res.data.errMsg) {
              that.myModal.errorHtml(that, res.data)
            } else {
              alert(res.data.errMsg)
            }
          }
        }, function (err) { console.log(err) }, this.testURL)
      }
    },
    // 加密
    jiamiMima () {
      console.log(this.userPword)
      let a = this.a
      let b = this.b
      let jiami = 0
      let keyjiami = this.keyjiami
      let ifUseYinshe = 1
      let CCBPWDMAPGIGESTVALUE = ''
      for (let n = 0; n < a.length; n++) {
        CCBPWDMAPGIGESTVALUE = CCBPWDMAPGIGESTVALUE + a[n]
      }
      let newValue = this.userPword
      let specialChar = 0
      if (keyjiami === 0 && jiami === 0 && ifUseYinshe === 1) {
        let everyone = ''
        let afterPass = ''
        for (let i = 0; i < newValue.length; i++) {
          if (specialChar === 1) {
            break
          }
          everyone = newValue.charAt(i)
          for (let j = 0; j < ((b.length) / 2); j++) {
            if (everyone === b[2 * j]) {
              afterPass = afterPass + b[2 * j + 1]
              break
            }
            if (j === (b.length) / 2 - 1) {
              if (everyone !== b[2 * j]) {
                specialChar = 1
                break
              }
            }
          }
        }
        if (specialChar === 0) {
          this.userPword = afterPass
        } else {
          let ret = ''
          afterPass = ''
          for (let i = 0; i < newValue.length; i++) {
            let c = newValue.substr(i, 1)
            let ts = escape(c)
            if (ts.substring(0, 2) === '%u') {
              ret = ret + ts.replace('%u', '(^?)')
            } else {
              ret = ret + c
            }
          }
          this.userPword = ret
          for (let n = 0; n < ret.length; n++) {
            everyone = ret.charAt(n)
            for (let w = 0; w < ((b.length) / 2); w++) {
              if (everyone === b[2 * w]) {
                afterPass = afterPass + b[2 * w + 1]
                break
              }
            }
          }
          this.userPword = afterPass
        }
        this.keyjiami = 1
        console.log(this.userPword)
      }
      if (ifUseYinshe === 1) {
        this.CCB_PWD_MAP_GIGEST = CCBPWDMAPGIGESTVALUE + '|LOGPASS'
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
  top:80px;
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
  outline: none;
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
  outline: none;
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
  /* text-decoration: underline; */
  font-size: 36px;
  color: rgb(140,140,140);
  display: inline-block;
  margin-right: 300px;
  /* font-weight: 900 */
}
.box{
  font-family: PingFangSC-Regular;
  text-align:center;
}
.box .checkNum{
  margin-top: 42px;
  width: 600px
}
.login_page{
  background-color: #fff;
  height: 100%;
  border: 1px solid #fff;
  padding-bottom: 33%
}
</style>
