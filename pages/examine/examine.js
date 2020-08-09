// pages/examine/examine.js
const Cards=wx.cloud.database().collection('Cards')
const Words=wx.cloud.database().collection('Words')
let total = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 正确个数
    rightAns: 0,
    // 总数
    total: 0,
    // 单词
    words: [],
    // 错误单词
    wrongAns: [],
    // 序列号
    serial: 1
  },
  // 获取数据
  getData(cardId){
    Words.where({
      cardId: cardId
    }).get({
      success: res => {
        this.data.total = res.data.length
        this.data.words = res.data.map(item => {
          return {
            word: item.word,
            meaning: item.meaning
          }
        })
        this.setData({
          'total': this.data.total,
          'words': this.data.words
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取卡片集序列号
    let cardId = options.cardID
    // console.log('test for cardId:'+cardId)
    this.setData({
      cardId: cardId
    })
    // 从数据库中得到当前卡片集的名称，单词组，初始化序列
    this.getData(cardId)
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

  },
  onSelect(event) {
    if(event.detail.res == true){
      let right = this.data.rightAns
      this.setData({
        'rightAns': right + 1
      })
    } else { // 错题集
      console.log(this.data.wrongAns)
      console.log(typeof(this.data.wrongAns))
      this.data.wrongAns.push(this.data.words[this.data.serial - 1])
      this.setData({
        'wrongAns': this.data.wrongAns
      })
      console.log(this.data.wrongAns)
    }
    let curSerial = this.data.serial
    if(curSerial < this.data.total) {
      this.setData({
        'serial': curSerial + 1
      })
    }
  },
  onFinish() {
    let total = this.data.total
    let rightAns = this.data.rightAns
    let wrongAns = JSON.stringify(this.data.wrongAns)
    let cardId = this.data.cardId
    wx.navigateTo({
      url: '../result/result?ans='+rightAns+'&total='+total+'&words='+wrongAns+'&cardid='+cardId
    })
  }
  
})