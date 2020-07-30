//index.js
//获取应用实例

const db=wx.cloud.database().collection('test_word')
let word=""
let meaning=""
let id=""
Page({
  data: {
    result: 'xxx',
    canAdd: true,
    canRemove: false
  },

  add_word(event)
  {
    word=event.detail.value
  },
  add_meaning(event)
  {
    meaning=event.detail.value
  },


  //添加数据
  addWord(){
      db.add({
        data:{
          word:word,
          meaning:meaning
        },
        success:function(res){
          console.log("添加成功",res)
        }
      })
  },

  //查询数据
  selectword(){
    var that = this;
    db.where({
      word:"apple"
    })

    .get({
      success:function(res){
        console.log("查询数据成功",res.data)
        id=res.data[0]._id
        that.setData({
          result:id
        })
      }
    })
  },

  //删除查询到的指定id的记录
  delword(){
    console.log("开始删除",id)
    db.doc(id).remove({
      success:function(res){
        console.log("删除数据成功",res.data)
      }
    })
  },

  renewword(){
    db.doc(id).update({
      data:{
        word:"banana"
      },
      success:function(res)
      {
        console.log("更新数据成功",res.data)
      }
    })
  }
})
