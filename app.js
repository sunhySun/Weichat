const util = require("./utils/util")


//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'shen-xazev'
    })
    let menuObject = wx.getMenuButtonBoundingClientRect()
    wx.getSystemInfo({
      success: (result) => {
        this.globalData.statusBarHeight = result.statusBarHeight
        this.globalData.menuTop = menuObject.top
        this.globalData.menuHeight = menuObject.height
        this.globalData.width = menuObject.width
        this.globalData.widthLeft = result.windowWidth - menuObject.right // 按钮到屏幕边的距离
        // navbar的高度
        this.globalData.height = result.statusBarHeight + menuObject.height + (menuObject.top - result.statusBarHeight) * 3
        this.globalData.titleWidth = result.windowWidth - 2 * (result.windowWidth - menuObject.left)
        this.globalData.windowWidth = result.windowWidth

      },
      fail: err => console.log(err)
    })
    this.getOpenid()
    console.log(this.globalData.date)
  },
  globalData: {
    userInfo: null,
    openId: "",
    date: util.formatDate(new Date)
  },
  getOpenid() {
    let that = this
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        let openid = res.result.openid
        console.log('获取openid为：',openid)
        that.globalData.openId = openid
      }
    })
  }
})
