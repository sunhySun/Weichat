// pages/selectmode/selectmode.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    back(){
        wx.redirectTo({
            url: ''//返回卡片集页面
        })
    },
    flashcard(){
        wx.redirectTo({
            url: '../flashcard/flashcard?know=0&&count=0'
        })
    },
    test(){
        wx.redirectTo({
            url: ''//跳转至测试页
        })
    }
})