webpackJsonp([7],{ESRa:function(t,e){},qNzg:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={name:"errMessage",data:function(){return{content:""}},components:{},methods:{goback:function(){this.$router.go(-1)}},mounted:function(){this.content=this.$route.params.content,void 0===this.content||""===this.content?this.content="<p style='font-size:18px;color:#aeaeae;margin-top:30%;text-align: center'>页面掉失，请点击返回按钮，重新登录</p>":this.$nextTick(function(){document.getElementsByClassName("errbtn")[0].setAttribute("style","display:none;")})}},s={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"errDiv",domProps:{innerHTML:t._s(t.content)}}),t._v(" "),n("div",{staticClass:"errpageBtn",on:{click:function(e){return t.goback()}}},[t._v("返回")])])},staticRenderFns:[]};var i=n("VU/8")(o,s,!1,function(t){n("ESRa")},"data-v-0c0f11ea",null);e.default=i.exports}});
//# sourceMappingURL=7.25f62e06971d400c303c.js.map