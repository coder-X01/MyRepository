<template>
  <div class="accept-container">
    <vue-drag-resize
      :parentLimitation="true"
      :isResizable="false"
      axis="y"
      :y="200"
      @clicked="startMove"
      @dragstop="endMove"
    >
      <div class="back_box">返回</div>
    </vue-drag-resize>

    <!-- <span class="go-back" v-show="goBackState">返回</span> -->
    <iframe
      v-show="iframeState"
      style="position: absolute; left: 0"
      id="show-iframe"
      height="100%"
      width="100%"
      frameborder="0"
      name="showHere"
      scrolling="auto"
      :src="URL"
    ></iframe>
  </div>
</template>

<script>
import VueDragResize from "vue-drag-resize";
import { MessageBox } from "mint-ui";
export default {
  name: "myframe",
  components: {
    VueDragResize
  },
  data() {
    return {
      URL: "",
      iframeState: true,
      goBackState: true,
      sTime: null,
      eTime: null
    };
  },
  methods: {
    test() {
      console.log("父盒子内容");
    },
    goBack() {
      this.$router.go(-1);
    },
    init() {
      let that = this;
      that.myModal.downLoad(that, true);
      let oIframe = document.getElementById("show-iframe");
      let deviceWidth = document.documentElement.clientWidth;
      let deviceHeight = document.documentElement.clientHeight;
      oIframe.style.width = deviceWidth + "px";
      oIframe.style.height = deviceHeight + "px";
      // console.log(this.$route.query)
      // let url = this.$route.query.target
      let url = "http://www.baidu.com";
      console.log(url);
      if (!url) {
        MessageBox.alert("链接出错", "提示");
        this.$router.push({ path: "/home" });
      } else {
        this.URL = url;
        const iframe = document.querySelector("#show-iframe");
        iframe.onload = () => {
          console.log("加载完成"); // 这样每次都会触发
          that.myModal.downLoad(that, false);
        };
      }
    },
    startMove(evt) {
      //   debugger;
      this.sp = evt.currentTarget.offsetTop;
      // this.sTime=null
      this.eTime = null;
      this.sTime = new Date();
    },
    endMove() {
      if (this.sTime != null && this.eTime == null) {
        this.eTime = new Date();
        var diffTime = this.eTime - this.sTime;
        // debugger;
        if (diffTime < 2000) {
          this.sTime = null;
          this.eTime = null;
          this.goBack();
        }
      }
    }
  },
  mounted() {
    this.init();
  }
};
</script>
<style scoped>
.back_box {
  position: fixed;
  right: 0;
  width: 150px;
  height: 70px;
  line-height: 70px;
  background-color: rgba(120, 120, 120, 0.3);
  border-radius: 40px 0 0 40px;
  z-index: 1;
}
.go-back {
  position: fixed;
  top: 80px;
  right: 40px;
  z-index: 10;
}

.accept-container {
  width: 100%;
  height: 100%;
}
</style>
