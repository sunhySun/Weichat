// pages/flashcard/flashcard.js
const Cards=wx.cloud.database().collection('Cards')
const Words=wx.cloud.database().collection('Words')
const { $Message } = require('../../dist/base/index')

let know=0
let wholenum=0
let unknowList=[]
Page({

    data: {
        total:0,
        wrongWords:[],
        knowed:0
   },
   
 
   //事件处理函数
   onLoad: function (options) {
    know=parseInt(options.knowed);
    wholenum=parseInt(options.total);
    unknowList=JSON.parse(options.unknowList)

    console.log(unknowList)
    this.setData({
      knowed:know,
      total:wholenum,
      wrongWords:unknowList
    })
   },
   
 
})
            

