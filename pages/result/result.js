// pages/result/result.js
// 获取结果页面的数据
var util = require('../../utils/util')
let studyInfo = wx.cloud.database().collection('Studyinfo')
const app = getApp()
const open_id = app.globalData.openId // 用户的openid
const date = app.globalData.date // 当天日期

Page({
  /**
   * 页面的初始数据
   */
  data: {
    correct: 0,
    total: 0,
    wrongWords: [],
    cardId: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.wrongWords = JSON.parse(options.words)
    this.setData({
      'correct': parseInt(options.ans),
      'total': parseInt(options.total),
      'wrongWords': this.data.wrongWords,
      'cardId': options.cardid
    })
    this.getBasicInfo()
    this.submit()
  },
  // 获取用户信息
  getBasicInfo() {
    this.setData({
      id: app.globalData.openId,
      date: app.globalData.date
    })
  },
  // 上传用户数据
  submit() {
    var that = this
    // 当前日期
    studyInfo.where({
      _openid: open_id,
      cardId: this.data.cardId,
      date_time: date
    }).get({
      success: res => {
        console.log(res.data)
        if(res.data.length === 0){
          this.add()
        } else {
          this.update()
        }
      }
    })
  },
  // 增加记录
  add() {
    console.log('add')
    studyInfo.add({
      data: {
        date_time: date,
        learnednum: this.data.correct,
        totalNum: this.data.total,
        cardId: this.data.cardId
      }
    }).then(res => console.log(res))
  },
  // 更新记录
  update() {
    console.log('update')
    studyInfo.where({
      _openid: open_id,
      date_time: date,
      cardId: this.data.cardId
    }).update({
      data: {
        learnednum: this.data.correct,
        totalNum: this.data.total
      },
      success: res => console.log(res)
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})