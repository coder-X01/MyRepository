<template>
  <div class="pay">
    <div class="head_box">
      <mt-header title="充值">
        <router-link to="/home" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      payValue: '',
      selected: false
    }
  },
  mounted () {
    this.initEvent()
  },
  methods: {
    initEvent () {
      // buttonEvent()
    }
  }
}
// function buttonEvent () {
//   var buttonList = $('.mint-button--normal')
//   for (var i = 0; i < buttonList.length; i++) {
//     buttonList[i].onclick = function () {
//       $('.mint-button--normal:not(this)').css('background-color', 'white')
//       $(this).css('background-color', '#FF6600')
//     }
//   }
// }
</script>
<style scoped>
.mint-header{
  background-color: #ff5b00;
  height: 90px;
  line-height: 90px;
  font-size: 34px;
}
</style>
