<template>
  <div class="pay-main">
    <div class="pay-header">
      <i class="el-icon-back"></i>
      <span class="pay-title">充值中心</span>
      <img src="@/../static/image/recharge-banner.png" class="pay-banner" />
    </div>
    <div class="pay-content">
      <div class="pay-account">
        <table>
          <tr>
            <td>
              <img src="@/../static/image/wo.png" />
            </td>
            <td>
              <span>18218222614</span>
            </td>
          </tr>
        </table>
      </div>
      <div class="pay-recharge">
        <div>
          <span>当前账号余额：</span>
          <span style="color:red">0.00￥</span>
        </div>
        <div class="recharge-list">
          <span>选择充值金额:</span>
          <br />
          <table class="comment-table">
            <tr>
              <td>
                <mt-button type="default">充值30元</mt-button>
              </td>
              <td>
                <mt-button type="default">充值50元</mt-button>
              </td>
            </tr>
            <tr>
              <td>
                <mt-button type="default">充值100元</mt-button>
              </td>
              <td>
                <mt-button type="default">充值200元</mt-button>
              </td>
            </tr>
          </table>
        </div>
        <div class="content-table">
          <mt-field label="其他金额" placeholder="请输入金额" v-model="username"></mt-field>
          <mt-radio title="请选择支付方式" v-model="payValue" :options="['龙支付']"></mt-radio>
        </div>
      </div>
    </div>
    <div class="pay-footer">
      <div class="pay-submit">
        <span>支付</span>
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
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
      buttonEvent()
    }
  }
}
function buttonEvent () {
  var buttonList = $('.mint-button--normal')
  for (var i = 0; i < buttonList.length; i++) {
    buttonList[i].onclick = function () {
      $('.mint-button--normal:not(this)').css('background-color', 'white')
      $(this).css('background-color', '#FF6600')
    }
  }
}
</script>
<style scoped>
.pay-main {
  background-color: #ff6600;
  height: 100%;
}

.pay-title {
  color: aliceblue;
  font-size: 35px;
  float: left;
  margin-left: 17px;
  padding-top: 7px;
}

.pay-banner {
  width: 100%;
  padding-top: 10px;
}

.el-icon-back {
  color: aliceblue;
  font-size: 37px;
  float: left;
  margin-left: 7px;
  padding-top: 14px;
}

.pay-content {
  height: 57%;
  width: 90%;
}

.pay-account {
  width: 80px;
  height: 120px;
}

.pay-account table {
  margin-left: 20px;
}

.pay-account img {
  margin-top: 20px;
  float: left;
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.pay-account td {
  text-align: right;
  vertical-align: bottom;
  font-size: 70px;
  color: white;
}

.pay-recharge {
  background-color: white;
  border-radius: 30px;
  height: 100%;
  width: 105%;
  margin-left: 20px;
}

.pay-recharge div {
  line-height: 60px;
  border-bottom: 1px solid #f6f7f8;
}

.recharge-list span {
  float: left;
  margin-left: 20px;
}

.recharge-list table {
  margin-left: 10px;
}

.comment-table {
  height: 360px;
  width: 90%;
  padding: 0px;
}

.comment-table span {
  border: #ff6600 solid;
  border-radius: 10cm;
  width: 300px;
  height: 100px;
  text-align: center;
  vertical-align: bottom;
  font-size: 35px;
}

.content-table {
  margin-left: 10px;
  text-align: left;
  height: 190px;
  width: 90%;
}

.content-table td {
  text-align: left;
  height: 85px;
}

.other-recharge {
  margin-left: 20px;
  width: 90%;
  height: 70px;
}

.other-recharge span {
  float: left;
}

.pay-way {
  margin-left: 20px;
  height: 120px;
  width: 90%;
}

.pay-way span {
  float: left;
}

.pay-submit {
  margin-top: 150px;
  margin-left: 120px;
  width: 550px;
  height: 100px;
  background-color: black;
  border-radius: 40px;
}

.pay-submit span {
  vertical-align: middle;
  color: yellow;
  margin-top: 50px;
}

.mint-button--normal {
  border: 1px #ff6600 solid;
  border-radius: 10cm;
  width: 270px;
  height: 120px;
  font-size: 35px;
}
.mint-radiolist {
  text-align: left;
}

>>> .mint-cell-title {
  width: 160px;
  font-size: 25px;
  text-align: left;
  vertical-align: top;
  padding-top: 15px;
}

>>> .mint-field-core {
  font-size: 30px;
  text-align: left;
  padding-top: 20px;
}

>>> .mint-cell-wrapper {
  height: 70px;
  border-bottom: 1px solid #f6f7f8;
}

>>> .mint-radiolist-title {
  text-align: left;
  height: 30px;
  font-size: 25px;
  line-height: 35px;
}
</style>
