var myModal = {
  // 加载图片
  downLoad: function (that, flag) {
    if (flag === true) {
      that.$indicator.open({
        text: '',
        spinnerType: 'fading-circle'
      })
      var div = document.getElementsByClassName('mint-indicator-mask')[0]
      div.setAttribute('style', 'z-index:2000;opacity:1;background:rgba(00,00,00,.5);')
    } else {
      that.$indicator.close()
    }
  },
  // 加载失败
  messageModal: function (that) {
    var alterHtml = '网络不给力'
    var alterTitle = '提示'
    setTimeout(() => {
      var title = document.getElementsByClassName('mint-msgbox-title')[0]
      var content = document.getElementsByClassName('mint-msgbox-message')[0]
      content.setAttribute('style', 'text-align:center;')
      title.setAttribute('style', 'font-size:1.6rem;')
    }, 0)
    that.$messagebox.alert(alterHtml, alterTitle)
  },
  // 登录成功
  successModal: function (that) {
    var alterHtml = '登录成功'
    var alterTitle = '提示'
    setTimeout(() => {
      var title = document.getElementsByClassName('mint-msgbox-title')[0]
      var content = document.getElementsByClassName('mint-msgbox-message')[0]
      content.setAttribute('style', 'text-align:left;')
      title.setAttribute('style', 'font-size:.6rem;')
    }, 0)
    that.$messagebox.alert(alterHtml, alterTitle)
  },
  // 升级提示
  levelModal: function (that) {
    var alterHtml = '请升级到Android5.0以上使用'
    var alterTitle = '提示'
    setTimeout(() => {
      var title = document.getElementsByClassName('mint-msgbox-title')[0]
      var content = document.getElementsByClassName('mint-msgbox-message')[0]
      content.setAttribute('style', 'text-align:left;')
      title.setAttribute('style', 'font-size:.6rem;')
    }, 0)
    that.$messagebox.alert(alterHtml, alterTitle)
  },
  // 长时间退出登录
  timeOverModal: function (that) {
    var alterHtml = '您长时间不操作，将退出页面，如需操作，请再次进入页面'
    var alterTitle = '提示'
    setTimeout(() => {
      var title = document.getElementsByClassName('mint-msgbox-title')[0]
      var content = document.getElementsByClassName('mint-msgbox-message')[0]
      content.setAttribute('style', 'text-align:left;')
      title.setAttribute('style', 'font-size:.6rem;')
    }, 0)
    that.$messagebox.alert(alterHtml, alterTitle)
  },
  // 错误页面
  errorModal: function (that, cont) {
    var alterHtml = "<p style='color:black'>" + cont.ERRORMSG + '</p><p>参考代码：' + cont.ERRORCODE + '</p>'
    var alterTitle = '提示'
    setTimeout(() => {
      var title = document.getElementsByClassName('mint-msgbox-title')[0]
      var content = document.getElementsByClassName('mint-msgbox-message')[0]
      content.setAttribute('style', 'text-align:left;')
      content.setAttribute('style', 'line-height .6rem;')
      title.setAttribute('style', 'font-size:.6rem;')
    }, 0)
    that.$messagebox.alert(alterHtml, alterTitle)
  },

  // 错误HTML
  errorHtml: function (that, cont) {
    var urlList = ['Home', 'StudyPro', 'MenuFeatures']
    if (urlList.indexOf(that.$router.currentRoute.name) !== -1) {
      that.$router.push({name: 'ErrMessage', params: {content: cont}})
    } else {
      that.$router.replace({name: 'ErrMessage', params: {content: cont}})
    }
  }
}

export default myModal
