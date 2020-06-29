<template>
  <div class="select_box">
    <div class="select" v-for="(item,index) in fbyqCustList" :key="index" @click='toHome($event)' :campusId = "item.campusId">
      <span>{{item.campusName}}</span>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      fbyqCustList: [],
      txcode: ''
    }
  },
  methods: {
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
    toHome (e) {
      let that = this
      let campusId = e.currentTarget.getAttribute('campusId')
      let mobile = localStorage.getItem('mobile')
      let cidNo = localStorage.getItem('cidNo')
      if (this.txcode === 'ST0025') {
        let PASSWORD = localStorage.getItem('PASSWORD')
        let params = {'TXCODE': 'ST0025', 'CIDNO': cidNo, 'PASSWORD': PASSWORD, 'CAMPUS_ID': campusId}
        this.ajax('get', params, function (res) {
          // 登陆成功保存数据
          that.saveData(res)
          localStorage.setItem('LOGINTYPE', 1)
          that.$router.push({path: '/home'})
        }, function (err) { console.log(err) }, this.testURL)
      } else {
        let SMScode = localStorage.getItem('SMScode')
        let params = {'TXCODE': 'ST0007', 'mobile': mobile, 'campusId': campusId, 'SMScode': SMScode}
        this.ajax('get', params, function (res) {
          // 登陆成功保存数据
          that.saveData(res)
          that.$router.push({path: '/home'})
        }, function (err) { console.log(err) }, this.testURL)
      }
    },
    init () {
      this.fbyqCustList = this.$route.query.fbyqCustList
      this.txcode = this.$route.query.txcode
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style scoped="scoped">
.select_box{
  box-sizing: border-box;
  margin-top: 200px;
}
.select{
  margin: 0 auto;
  height: 75px;
  line-height: 75px;
  width: 500px;
  border: 2px solid #ffe67f;
  margin-bottom: 20px;
  border-radius: 25px;
}
</style>
