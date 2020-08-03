// pages/detailPage/addWord/addWord.js

let cardID=""
let wordID=""
let cardID_id=""
let wholenum=0
let newWord=""
let newMeaning=""
Page({
  data: {
    cardName:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    cardID=options.cardID
    console.log(cardID)

    let db=wx.cloud.database().collection('Cards')
    var that=this
    db.where({
      cardId:cardID
    })
    .get({
      success:function(res){
        console.log("查询卡片集名称成功",res)
        that.setData({
          cardName:res.data[0].cardName
        });
        cardID_id=res.data[0]._id
        wholenum=res.data[0].wholenum
      }
    })
  },

  return(event){
    wx.navigateBack({
      delta: 1
    })
  },

  editWord(event){
      newWord=event.detail.value
  },

  editMeaning(event){
      newMeaning=event.detail.value
  },

  submitEditWord(event){
    console.log(newWord,newMeaning)
    const {$Toast}=require('../../../dist/base/index')
    if(newWord=="")
    {
      $Toast({
        content:"单词不能为空",
        type:"error"
      })
      return
    }
    else if(newMeaning=="")
    {
      $Toast({
        content:"释义不能为空",
        type:"error"
      })
      return
    }

    let db=wx.cloud.database().collection('Cards')
    wholenum=wholenum+1
    db.doc(cardID_id).update({
      data:{
        wholenum:wholenum
      },
      success:function(res){
        console.log("更新卡片集单词总数成功",res)
      }
    })
    db=wx.cloud.database().collection('Words')
    db.add({
      data:{
        word:newWord,
        meaning:newMeaning,
        cardId:cardID
      },
      success:function(res){
        console.log("添加单词成功")
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000,
          complete:function(){
            setTimeout(function(){
              var pages = getCurrentPages();
              var beforePage = pages[pages.length - 2];
              beforePage.LoadData();
              wx.navigateBack({
                delta: 0,
              });
            },1000)
          }
        })

      }
    })    
  }
})