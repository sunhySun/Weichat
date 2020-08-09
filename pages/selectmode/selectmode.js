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
        wx.navigateTo({
            url: '/pages/detailPage/main/main?cardId='+cardId//返回卡片集页面
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
        // wx.redirectTo({
        //     // 测试页
        //     url: '../examine/examine'
        // })
        wx.navigateTo({
          url: '../examine/examine?cardID='+cardId
        })
    },
    onLoad:function(options){
      
        cardId=options.cardID
        console.log("selectmode",cardId)
    }
})