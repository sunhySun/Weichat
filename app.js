//app.js
App({
  onLaunch: function () {
    wx.cloud.init({
      env:'shen-xazev'
    })
  },
  globalData: {
    userInfo: null
  }
})