<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org" target="_blank">
          Core Docs
        </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org" target="_blank">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org" target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs" target="_blank">
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/" target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/" target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/" target="_blank">
          vuex
        </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/" target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue" target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
    <form action="">
      <input type="password" v-model="userPword" id="password" @input="test($event)">
      <div @click='login'>提交</div>
    </form>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      a: '',
      b: [],
      cidNo: '123',
      userPword: '',
      CCB_PWD_MAP_GIGEST: '',
      keyjiami: 0,
      keyjiamiName: '0',
      ifUseYinshe: 1
    }
  },
  methods: {
    keyJiami (jiamiObject) {
      console.log(jiamiObject)
      let keyjiamiName = this.keyjiamiName
      var jiamiObjectname = jiamiObject.id
      var jiamiObjectnameBefore = jiamiObjectname + ','
      var jiamiObjectnameAll = ',' + jiamiObjectname + ','
      if (keyjiamiName === '0') { keyjiamiName = jiamiObjectname + ','; return }
      if (keyjiamiName.indexOf(jiamiObjectnameBefore) === 0) { return }
      if (keyjiamiName.indexOf(jiamiObjectnameAll) !== -1) { return }
      keyjiamiName = keyjiamiName + jiamiObjectname + ','
      console.log(this.keyjiamiName)
    },
    jiamiMimas (mimaName) {
      let keyjiamiName = this.keyjiamiName
      let ifUseYinshe = this.ifUseYinshe
      keyjiamiName = ',' + keyjiamiName
      var everyMimaName = mimaName.split(',')
      for (var j = 0; j < everyMimaName.length; j++) {
        if (keyjiamiName.indexOf(',' + everyMimaName[j] + ',') !== -1) { this.jiamiEveryMimas(everyMimaName[j]) }
      }
      if (ifUseYinshe === 1) {
        var ccbPwbMapGigest = document.getElementById('CCB_PWD_MAP_GIGEST')
        var jimaPass = ''
        for (var n = 0; n < everyMimaName.length; n++) {
          jimaPass = document.getElementById(everyMimaName[n])
          if (n === 0) {
            ccbPwbMapGigest.value = this.a + '|' + jimaPass.name
          } else { ccbPwbMapGigest.value = ccbPwbMapGigest.value + ',' + jimaPass.name }
        }
      }
      keyjiamiName = '0'
    },
    jiamiEveryMimas (mimaName) {
      var jimaPass = document.getElementById(mimaName)
      var newValue = jimaPass.value
      var specialChar = 0
      let b = this.b
      let ifUseYinshe = this.ifUseYinshe
      if (ifUseYinshe === 1) {
        var everyone = ''; var afterPass = ''
        for (var i = 0; i < newValue.length; i++) {
          if (specialChar === 1) { break }
          everyone = newValue.charAt(i)
          for (var j = 0; j < ((b.length) / 2); j++) {
            if (everyone === b[2 * j]) { afterPass = afterPass + b[2 * j + 1]; break }
            if (j === (b.length) / 2 - 1) { if (everyone !== b[2 * j]) { specialChar = 1; break } }
          }
        }
        if (specialChar === 0) { jimaPass.value = afterPass } else {
          var ret = ''; afterPass = ''
          for (i = 0; i < newValue.length; i++) {
            var c = newValue.substr(i, 1)
            var ts = escape(c)
            if (ts.substring(0, 2) === '%u') { ret = ret + ts.replace('%u', '(^?)') } else { ret = ret + c }
          }
          jimaPass.value = ret
          for (var n = 0; n < ret.length; n++) {
            everyone = ret.charAt(n)
            for (var w = 0; w < ((b.length) / 2); w++) {
              if (everyone === b[2 * w]) {
                afterPass = afterPass + b[ 2 * w + 1 ]
                break
              }
            }
          }
          jimaPass.value = afterPass
        }
        this.keyjiami = 1
      }
    },
    login () {
      console.log(this.userPword)
      console.log('=========')
      this.keyJiami()
      console.log(this.userPword)
      let params = {'TXCODE': 'ST0024', 'CIDNO': this.cidNo, 'PASSWORD': this.userPword, 'CCB_PWD_MAP_GIGEST': this.CCB_PWD_MAP_GIGEST}
      this.ajax('get', params, function (res) {
      }, function (err) { console.log(err) }, this.testURL)
    },
    init () {
      let that = this
      let params = {'TXCODE': 'ST0041'}
      this.ajax('get', params, function (res) {
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
    },
    test (obj) {
      console.log(obj)
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
