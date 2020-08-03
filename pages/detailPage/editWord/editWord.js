// pages/detailPage/editWord/editWord.js

let cardID=""
let wordID=""
let newWord=""
let newMeaning=""
Page({
  data: {
    cardName:"",
    word:"",
    meaning:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      cardID=options.cardID
      wordID=options.wordID
      console.log(cardID,wordID)

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
      }
    })

    db=wx.cloud.database().collection('Words')
    db.where({
      _id:wordID,
      cardId:cardID
    })
    .get({
      success:function(res){
        console.log("查询单词成功",res)
        that.setData({
          word:res.data[0].word,
          meaning:res.data[0].meaning
        })
        newWord=that.data.word
        newMeaning=that.data.meaning
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
    let db=wx.cloud.database().collection('Words')

    db.doc(wordID).update({
      data:{
        word:newWord,
        meaning:newMeaning
      },
      success:function(res){
        console.log("修改单词成功")
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