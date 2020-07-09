
<template>
  <div></div>
</template>
<script>
export default{
  data () {
    return {
      ENTRY: ''
    }
  },
  methods: {
    init () {
      let token = localStorage.getItem('localToken')
      this.ENTRY = this.$route.query.ENTRY
      let that = this
      if (!token) {
        let params = {'TXCODE': 'ST0024', 'LOGFLAG': 0, 'ENTRYID': this.ENTRY}
        this.ajax('get', params, function (res) {
          console.log(res)
          if (res.data.loginMode === '1') {
            localStorage.setItem('loginMode', res.data.loginMode)
            that.$router.push({path: '/login', query: {'loginMode': '1', 'campusId': that.ENTRY}})
          } else {
            that.$router.push({path: '/login', query: {'loginMode': '0', 'campusId': that.ENTRY}})
          }
        }, function (err) { console.log(err) }, this.testURL)
      } else {
        let mobile = localStorage.getItem('mobile')
        let CIDNO = localStorage.getItem('CIDNO')
        let CAMPUS_ID = localStorage.getItem('CAMPUS_ID')
        let USERID = localStorage.getItem('USERID')
        let params = {'TXCODE': 'ST0024', 'MOBILE': mobile, 'CIDNO': CIDNO, 'CAMPUS_ID': CAMPUS_ID, 'LOGFLAG': 1, 'USERID': USERID}
        this.ajax('get', params, function (res) {
          console.log(res)
          if (res.data.loginMode === '2') {
            that.$router.push({path: '/home'})
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
