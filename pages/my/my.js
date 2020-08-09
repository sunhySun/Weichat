// pages/my/my.js
let util = require('../../utils/util')
const app = getApp()
import * as echarts from '../../utils/ec-canvas/echarts'
let studyInfo = wx.cloud.database().collection('Studyinfo')
// const date = app.globalData.date
const open_id = app.globalData.openId

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {       
      lazyLoad: true // 延迟加载
    },
    id: '',
    dates: [],
    totalArr: () => new Array(7),
    learnedArr: () => new Array(7)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取echart
    this.echartsComponent = this.selectComponent('#my-echart')
    // 获取用户信息
    this.getUserInfo()
    // 获取日期
    this.getDates()

  },

  // 获取用户数据
  getUserInfo() {
    this.setData({
      'id': app.globalData.openId
    })
    console.log('my:',this.data.id)
  },

  // 获取本周日期并且转换格式
  getDates() {
    const date = new Date()
    const day = date.getDay()
    const time_stamp = date.getTime()
    let one_day_time = 24 * 60 * 60 * 1000
    let dates = []
    console.log('today',day)
    for(let i=0;i<=6;i++) {
      let before_time_stamp = time_stamp + (i - day) * one_day_time
      // console.log(util.formatDate(new Date(before_time_stamp)))
      dates.push(util.formatDate(new Date(before_time_stamp)))
    }
    this.setData({
      'dates': dates
    })
    console.log(this.data.dates)
  },

  // 获取图表数据
  getInfo(){
    console.log('get info:')
    var that = this
    var totalArr = []
    var learnedArr = []
    this.data.dates.forEach((date, index) => {
      console.log(date,index)
      studyInfo.where({
        _openid: open_id,
        date_time: date
      }).get({
        success: res => {
        console.log(res)
        let total = 0
        let learned = 0
        if(res.data.length != 0){
          total = parseInt(res.data.reduce((pre, item) => pre + parseInt(item.totalNum), 0))
          learned = parseInt(res.data.reduce((pre, item) => pre + parseInt(item.learnednum), 0))
        }
        totalArr[index] = total
        learnedArr[index] = learned
        that.setData({
          'totalArr': totalArr,
          'learnedArr': learnedArr
        })
        that.initChart()
        console.log(totalArr)
        console.log(learnedArr)
        }
      })
    })
  },
  // 初始化图表
  initChart() {
    console.log('init chart')
    let learned = this.data.learnedArr
    let total = this.data.totalArr
    var that = this
    this.echartsComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      })
      canvas.setChart(chart)
      chart.setOption(that.getOptions(learned, total))
      return chart
    })
  },
  getOptions(learned, total) {
    let option = {
      color: ['#ff6347','#515a6e'],
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thir', 'Fri', 'Sat' ],
        axisLabel: {
          show: true,
          textStyle: {
            color: '#808695',
            fonstSize: '14'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: ['#e8eaec']
          }
        },
        // x轴的颜色和宽度
        axisLine: {
          lineStyle: {
            color: '#dcdee2',
          }
        } 
      },
      yAxis: {
        x: 'center',
        type: 'value',
        //网格线
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: '#808695',
            fonstSize: '14'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#dcdee2',
          }
        } 
      },
      series: [{
        name: '掌握单词数',
        type: 'line',
        smooth: true,
        // data: [15, 2, 30, 16, 10, 0, 0]
        data: learned
      },
      {
        name: '学习单词数',
        type: 'line',
        smooth: true,
        // data: [15, 2, 30, 16, 10, 0, 0]
        data: total
      }
    ]
    }
    return option
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
    // 获取数据
    this.getInfo()
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