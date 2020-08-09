// component_zyy/navbar/index.js
// import app from '../../app.js'

const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageName: String,
    showBack: {
      type: Boolean,
      value: true
    },
    showHome: {
      type: Boolean,
      value: true
    },
    cardId: {
      type: String,
      observer(val) {
        this.setData({
          cardId: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: app.globalData.statusBarHeight,
    menuTop: app.globalData.menuTop,
    menuHeight: app.globalData.menuHeight,
    width: app.globalData.width,
    widthLeft: app.globalData.widthLeft,
    height: app.globalData.height,
    titleWidth: app.globalData.titleWidth
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 返回上一级页面
    goBack() {
      wx.navigateBack({
        delta: 1
      })
    },
    // 返回主页面
    goHome() {
      // let id = this.data.cardId
      // wx.navigateTo({
      //   url: '../../pages/detailPage/main/main?cardId='+id,
      // })
      wx.switchTab({
        url: '../../pages/index/index',
      })
    }
  },
})
