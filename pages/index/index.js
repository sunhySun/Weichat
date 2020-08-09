//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database().collection("Cards")
const user = wx.cloud.database().collection("User")
const { $Message } = require('../../dist/base/index')
var util=require('../../utils/util.js')
let cardname = ''
let date = ''
let cardId = 0
let openid = ''


// const db=wx.cloud.database().collection('test_word')
let word=""
let meaning=""
let id=""

Page({
  data:{
    item:[],
    visible1: false,
    value5: '',
    cardname:'',
    // getInput:'',
  },
  handleOpen1 () {
    this.setData({
        visible1: true
    });

},

  getInput:function(e){
  cardname = e.detail.value
  // e.detail.value = ''
  },
  handleClose1 () {
    this.setData({
      visible1:false
    })

},
  


  onLoad: function () {
    var that = this
    that.getOpenid()
    console.log("hahaha",openid)
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    
setTimeout(function () {
  db.where({
    _openid:openid
  })
  .get({
    success:function(res){
      that.setData({
        item:res.data,
      })    
    }
  })
  db.get({
    success:function(res){
      cardId = res.data.length
      // console.log(cardId)
    }
  })
 }, 2000) 

  },
  add (){
    var that = this
    var time = util.formatTime(new Date())
    db.add({
     data:{
      cardName:cardname,
      cretime:time,
      knownum:0,
      wholenum:0,
      cardId:(cardId+1).toString(),
     },
      success:function(res){
      // console.log("添加成功",res)
    }
    })
    this.setData({
      visible1:false
    })
    this.onLoad()
  },

  getOpenid:function(){
    // wx.cloud.callFunction({
    //   name:"getOpenid",
    //   success:function(res){
    //     openid = res.result.openid
    //     console.log("获取openid",res.result.openid)
    //   }
    // })
    openid = app.globalData.openId
  },

  enter:function(e){
    var cardnum=''
    console.log(e)
    // console.log(cardnum)
    // wx.navigateTo({
    //   url: '/pages?id='+cardnum,
    // })
  },

  gotoNextPage(event){
    const id=event.currentTarget.dataset.index;
    console.log("页面跳转",id,this.data.item[id].cardId)
    wx.navigateTo({
      url: '/pages/detailPage/main/main?cardId='+this.data.item[id].cardId,
    })
  }

})
