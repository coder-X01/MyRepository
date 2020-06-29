var ajax = function (type, params, RES, ERR, url) {
  console.log(window.navigator.userAgent)

  var that = this

  if (window.navigator.userAgent.indexOf('Android') !== -1) {
    var levelNum = window.navigator.userAgent.split('Android ')
    console.log(parseInt(levelNum[1]))
    if (parseInt(levelNum[1]) <= 4) {
      that.myModal.levelModal(that)
    }
  }

  // 打开加图案
  that.myModal.downLoad(that, true)
  if (url !== '' && url !== undefined) {
    url = this.url
  } else {
    // 同一入口
    url = '../B2CMainPlat_13_ZHST'
  }
  if (localStorage.getItem('USERID') == null || localStorage.getItem('USERID') === 'undefined' || localStorage.getItem('USERID') === undefined) {
    localStorage.setItem('USERID', '')
  }
  if (localStorage.getItem('localToken') == null || localStorage.getItem('localToken') === 'undefined' || localStorage.getItem('localToken') === undefined) {
    localStorage.setItem('localToken', '')
  }
  // 必须传的参数
  const origin = {
    'USERID': localStorage.getItem('USERID'),
    'ITOKEN': localStorage.getItem('localToken'),
    'CCB_IBSVersion': 'V6',
    'PT_STYLE': '8',
    'PT_LANGUAGE': 'CN'
  }
  const newParams = {}
  // 合并
  Object.assign(newParams, origin, params)
  // get请求
  if (type === 'get') {
    this.$axios({
      method: type,
      url: url,
      params: newParams,
      // 超时时间
      timeout: 1000 * 10
    }).then(res => {
      console.log(res)
      // 关闭加载图案
      that.myModal.downLoad(that, false)
      console.log(typeof (res.data))
      if (typeof (res.data) === 'string') {
        // 弹出错误信息，res.data html代码
        // that.myModal.errorModal(that,res.data);
        if (res.data.indexOf('0130Z1101001') !== -1 || res.data.indexOf('0130Z1108007') !== -1 || res.data.indexOf('0130Z1101018') !== -1 || res.data.indexOf('0130Z1108009') !== -1 || res.data.indexOf('0130Z1108912') !== -1 || res.data.indexOf('AZHST') !== -1) {
          that.myModal.errorHtml(that, res.data)
        } else {
          return RES(res)
        }
      } else {
        if (res.data.SUCCESS === 'false') {
          that.myModal.errorModal(that, res.data)
        } else {
          return RES(res)
        }
      }
    }).catch(err => {
      // 关闭加载图案
      that.myModal.downLoad(that, false)
      // // 并且提示
      that.myModal.messageModal(that)
      ERR(err)
    })
  }
}
export default ajax
