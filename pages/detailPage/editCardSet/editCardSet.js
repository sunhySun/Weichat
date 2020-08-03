// pages/detailPage/main.js

let cardId="0001"
let id=""
let wordArray=[]
let wordID=""
let cardID_id=""
let wholenum=0
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
    delWordVisible:false,
    delWordAction:[
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
    cardId=options.id
    let db=wx.cloud.database().collection('Cards')
    var that=this
    db.where({
      cardId:cardId
    })
    .get({
      success:function(res){
        console.log("查询卡片集名称成功",res)
        id=res.data[0]._id;
        // let date=res.data[0].cretime
        // let datestring=that.dateToString(date)
        that.setData({
          cardName:res.data[0].cardName,
          cardTime:res.data[0].cretime,
          wholeNum:res.data[0].wholenum
        })
        that.getWord()
      }
    })
  },

  //返回该页面时进行页面刷新
  LoadData:function(){
    let db=wx.cloud.database().collection('Cards')
    var that=this
    db.where({
      cardId:cardId
    })
    .get({
      success:function(res){
        console.log("查询卡片集名称成功",res)
        id=res.data[0]._id;
        // let date=res.data[0].cretime
        // let datestring=that.dateToString(date)
        that.setData({
          cardName:res.data[0].cardName,
          cardTime:res.data[0].cretime,
          wholeNum:res.data[0].wholenum
        })
        cardID_id=res.data[0]._id
        wholenum=res.data[0].wholenum
        that.getWord()
      }
    })
  },

  confirm(event){
    var pages = getCurrentPages();
    var beforePage = pages[pages.length - 2];
    beforePage.LoadData();
    wx.navigateBack({
      delta: 0,
    })
  },

  editWord(event)
  {
    const id = event.currentTarget.dataset.index;
    console.log(id,cardId,this.data.array[id]._id)
    wx.navigateTo({
      url: '/pages/detailPage/editWord/editWord?cardID='+cardId+"&&wordID="+this.data.array[id]._id
    })
  },

  delWord(event)
  {
    const id=event.currentTarget.dataset.index;
    console.log(id)
    wordID=this.data.array[id]._id
    var that=this
    that.setData({
      delWordVisible:true
    })
  },

  delWordClick({detail}){
    console.log(detail.index);
    let index=detail.index
    var that=this
    if(index==0){
      that.setData({
        delWordVisible:false
      })
    }
    else{
      var that=this;
      let db=wx.cloud.database().collection('Cards')
      wholenum=wholenum-1
      db.doc(cardID_id).update({
        data:{
          wholenum:wholenum
        },
        success:function(res){
          console.log("更新卡片集单词总数成功",res)
        }
      })
      db=wx.cloud.database().collection('Words')
      db.doc(wordID).remove({
        success:function(res){
          console.log("删除数据成功")
          that.setData({
            delWordVisible:false
          });
          that.LoadData()
        }
      })
    }
  },

  addWord(event){
    wx.navigateTo({
      url: '/pages/detailPage/addWord/addWord?cardID='+cardId
    })
  }
})