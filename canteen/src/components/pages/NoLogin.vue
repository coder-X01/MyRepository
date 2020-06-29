
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
      if (!token) {
        this.ENTRY = this.$route.query.ENTRY
        this.$router.push({path: '/login', query: {'campusId': this.ENTRY}})
        // this.$router.push({path: '/login', query: {'loginMode': 1, 'campusId': this.ENTRY}})
      } else {
        this.$router.push({path: '/home'})
      }
    }
  },
  mounted () {
    this.init()
  }
}
</script>
