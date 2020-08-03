// pages/selectmode/selectmode.js

let cardId
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    back(){
        // wx.redirectTo({
        //     url: '/pages/detailPage/main/main'//返回卡片集页面
        // })
        wx.navigateBack({
          delta: 1,
        })
    },
    flashcard(){
        wx.navigateTo({
            url: '../flashcard/flashcard?know=0&&count=0&&cardID='+cardId
        })
        // wx.redirectTo({
        //     url: '../flashcard/flashcard?know=0&&count=0&&cardId='+cardId
        // })
    },
    test(){
        wx.redirectTo({
            url: ''//跳转至测试页
        })
    },
    onLoad:function(options){
      
        cardId=options.cardID
        console.log("selectmode",cardId)
    }
})