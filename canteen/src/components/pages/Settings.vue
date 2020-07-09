<template>
  <div class="settingsPage">
    <div class="head_box">
      <mt-header title="个人设置">
        <router-link to="/home" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
    <div class="content_box">
      <div class="content">
        <span class="title">内部编号</span>
        <span class="data">{{cidNo}}</span>
      </div>
      <div class="content">
        <span class="title">姓名</span>
        <span class="data">{{custName}}</span>
      </div>
      <div class="content">
        <span class="title">我的园区</span>
        <span class="data">{{campusName}}</span>
      </div>
      <div class="content">
        <span class="title">手机号</span>
        <span class="data">{{mobile}}</span>
      </div>
    </div>
    <div class="back_box">
      <div class="back_buttom">
        <div @click="updataMobile">更改手机号</div>
      </div>
    </div>
    <div class="back_box">
      <div class="back_buttom">
        <div @click="GoSubsidy" :link='link'>更改密码</div>
      </div>
    </div>
    <div class="back_box">
      <div class="back_buttom">
        <div @click="signOut">退出登陆</div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default{
  data () {
    return {
      cidNo: '',
      mobile: '',
      campusName: '',
      custName: '',
      link: ''
    }
  },
  methods: {
    init () {
      let cidNo = localStorage.getItem('cidNo')
      let mobile = localStorage.getItem('mobile')
      let campusName = localStorage.getItem('campusName')
      let custName = localStorage.getItem('custName')
      this.link = localStorage.getItem('xgmmUrl')
      this.cidNo = cidNo
      this.mobile = mobile
      this.campusName = campusName
      this.custName = custName
    },
    GoSubsidy (e) {
      let target = e.currentTarget.getAttribute('link')
      this.$router.push({path: '/myiframe', query: {target: target}})
      console.log(target)
    },
    signOut () {
      MessageBox.confirm('确定退出?').then(action => {
        let campusId = localStorage.getItem('campusId')
        let loginMode = localStorage.getItem('loginMode')
        localStorage.clear()
        this.$router.push({path: '/login', query: { 'campusId': campusId, 'loginMode': loginMode }})
      })
    },
    updataMobile () {
      this.$router.push({path: '/udDataMobile'})
    }
  },
  mounted () {
    this.init()
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
.content_box{
  background-color: #feffff;
  border-bottom: 1px solid #f6f7f8
}
.content{
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  margin: 0px 30px 0px 30px;
  height: 110px;
  line-height: 110px;
  font-size: 34px;
  border-bottom: 1px solid #f6f7f8
}
.title{
  font-weight: 900
}
.data{
  color: rgb(128, 128, 128)
}
.content:last-child{
  border: none
}
.back_box{
  margin-top: 20px;
}
.back_buttom{
  background-color: #feffff;
  height: 110px;
  line-height: 110px;
  font-size: 34px;
  font-weight: 900;
  color: rgb(255, 102, 0)
}

</style>
