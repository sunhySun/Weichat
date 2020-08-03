// pages/login_test/login_test.js
Page({
  getopenid(){
    wx.cloud.callFunction({
      name:"getopenid",
      success:function(res){
        console.log("获取openid",res.result.openid)
      }
    })
  }
})