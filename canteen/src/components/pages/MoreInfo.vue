<template>
  <div>
    <div class="MoreInfo_box">
        <div class="MoreInfo">
          <span>员工编号:</span>
          <input type="text" v-model="cidNo">
        </div>
        <div class="MoreInfo">
          <span>员工姓名:</span>
          <input type="text" v-model="custName">
        </div>
    </div>
    <div class="next_box" @click="goNext">
        <div class="next">
          下一步
        </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui'

export default{
  data () {
    return {
      cidNo: '',
      custName: ''
    }
  },
  methods: {
    init () {
      // const token = localStorage.getItem('localToken')
    },
    goNext () {
      let that = this
      if (!this.cidNo) {
        Toast('请输入员工编号！')
        return false
      }
      if (!this.custName) {
        Toast('请输入员工姓名！')
        return false
      }
      let params = {'TXCODE': 'ST0004', 'cidNo': this.cidNo}
      this.ajax('get', params, function (res) {
        let fbyqCustList = res.data.fbyqCustList
        let txcode = res.data.txcode ? res.data.txcode : ''
        //  只有一条数据时
        if (res.data.size === 1) {
          let campusId = fbyqCustList[0].campusId
          let mobile = localStorage.getItem('mobile')
          let SMScode = localStorage.getItem('SMScode')
          let data = {'TXCODE': 'ST0006', 'mobile': mobile, 'SMScode': SMScode, 'campusId': campusId, 'cidNo': that.cidNo, 'custName': that.custName}
          that.ajax('get', data, function (res) {
            // 登陆成功保存数据
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
            that.$router.push({path: '/home'})
          }, function (err) { console.log(err) }, that.testURL)
          //  多条数据时
        } else {
          localStorage.setItem('custName', this.custName)
          localStorage.setItem('cidNo', this.cidNo)
          that.$router.push({path: '/SelectPark', query: {fbyqCustList: fbyqCustList, txcode: txcode}})
        }
      }, function (err) { console.log(err) }, this.testURL)
    }
  },
  mounted () {
  }
}
</script>
<style scoped="scoped">
.MoreInfo_box{
  margin-top: 200px;
}
.MoreInfo{
  margin-bottom: 20px;
}
.MoreInfo input{
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #ffe67f;
}
.next_box{
  margin-top: 100px;
}
.next{
  margin: 0 auto;
  width: 500px;
  height: 75px;
  line-height: 75px;
  background-color: #fb7700;
  border-radius: 20px;
}
</style>
