// pages/detailPage/main.js

let cardId="0001"
let id=""

Page({
  /**
   * 页面的初始数据
   */
  data: {
    scrollTop:0,
    cardName:"",
    cardTime:"",
    wholeNum:0,
    array:[],
    delCardVisible:false,
    delCardAction:[
      {
        name:"取消"
      },
      {
        name:"删除",
        color:"#ed3f14",
        loading:false
      }
    ]
  },
  onChange(event){
    console.log(event.detail)
  },
  onPageScroll(event){
    this.setData({
      scrollTop:event.scrollTop
    })
  },
  
  dateToString:function(myDate){
    console.log(myDate)
    let fullYear = (myDate.getFullYear()).toString();
    let month = (myDate.getMonth()+1).toString();
    let day = (myDate.getDate()).toString();
    let res=fullYear+"-"+month+"-"+day
    return res
      },

  //获取该卡片集的所有单词
  getWord:function(){
    console.log("查询单词")
    let db=wx.cloud.database().collection('Words')
    var that=this
    console.log(cardId)
    db.where({
      cardId:cardId
    })
    .get({
      success:function(res){
        console.log("查询卡片集的单词成功",res)
        var newArray=new Array()
        for(var i=0;i<res.data.length;i++)
        {
          newArray[i]=res.data[i]
        }
        console.log(newArray)
        that.setData({
          array:newArray
        })
      }
    })
  },

  onLoad: function (options) {
    cardId=options.cardId
    console.log(cardId)
    //cardId="5"
    let db=wx.cloud.database().collection('Cards')
    let that=this
    db.where({
      cardId:cardId
    })
    .get({
      success:function(res){
        console.log("查询卡片集名称成功",res)
        
        id=res.data[0]._id;
        let date=res.data[0].cretime;
        console.log(res.data[0])
        //let datestring=that.dateToString(date);
       
        that.setData({
          cardName:res.data[0].cardName,
          cardTime:res.data[0].cretime,
          wholeNum:res.data[0].wholenum
        })
        that.getWord()
      }
    })
  },

  LoadData:function(){
    let db=wx.cloud.database().collection('Cards')
    let that=this
    db.where({
      cardId:cardId
    })
    .get({
      success:function(res){
        console.log("查询卡片集名称成功",res)
        
        id=res.data[0]._id;
        let date=res.data[0].cretime;
        console.log(res.data[0])
        //let datestring=that.dateToString(date);
       
        that.setData({
          cardName:res.data[0].cardName,
          cardTime:res.data[0].cretime,
          wholeNum:res.data[0].wholenum
        })
        that.getWord()
      }
    })
  },

  //修改卡片，页面跳转
  editCard(event){
    wx.navigateTo({
      url: '/pages/detailPage/editCardSet/editCardSet?id='+cardId,
    })
  },

  //删除卡片集，显示对话框
  delCardOpen(event){
    var that=this;
    that.setData({
      delCardVisible:true
    });
  },

  //删除卡片集的确定按钮
  delCardConfirm()
  {
    var that=this;
    let db=wx.cloud.database().collection('Cards')
    db.doc(id).remove({
      success:function(res){
        console.log("删除数据成功")
        that.setData({
      delCardVisible:false
    });
      wx.navigateBack({
        delta: 1,
      })
      }
    })    
  },

  //删除卡片集的取消按钮
  delCardCancel(){
    var that=this;
    that.setData({
      delCardVisible:false
    });
  },

  //复习按钮，页面跳转
  review(event){
    wx.navigateTo({
      url: '/pages/selectmode/selectmode?cardID='+cardId
    })
  },

  returnLastPage(event){
    wx.navigateBack({
      delta: 1,
    })
  }
})