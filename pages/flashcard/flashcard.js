// pages/flashcard/flashcard.js
const Cards=wx.cloud.database().collection('Cards')
const Words=wx.cloud.database().collection('Words')
const { $Message } = require('../../dist/base/index')
let id=""
let know=0
let count=0
let wholenum=0
Page({
    /**
     * 页面的初始数据
     */
    back(){
        wx.redirectTo({
            url: '../selectmode/selectmode'
        }) 
    },
    data: {
        visible2: false,
        learned:1,
        total:0,
        meaning:"xx",
        startX:0, //开始移动时距离左
        endX:0, //结束移动时距离左
        nowPage:0, //当前是第几个个页面
        xinList:[]
   },
   getwords(){
     var that = this;
     Words.where({
          cardId:"2"
     })
     .get({
          success:function(res){
             console.log("查询卡片集成功",res.data)
             var list=res.data
             for(var i = 0;i < list.length;i ++) {
                  list[i].disply=0
                  list[i].scale=''
                  list[i].slateX=''
                  list[i].zIndex=0
                  list[i].style=''
             }
             console.log(list)
             that.setData({
               xinList:list
             })
          }
     })
   },
   changepage(){
     if(this.data.nowPage >= (this.data.xinList.length - 1)) {
          this.handleOpen2();
          return false;
     }
     this.setData({
          nowPage:this.data.nowPage+1,
          learned:this.data.nowPage+2,
          meaning:""
     });
     this.checkPage(this.data.nowPage);
   },
   renew(){
     var that = this;
     Cards.where({
          cardId:"2"
     })
     .get({
          success:function(res){
          console.log("查询卡片集成功",res.data[0]._id)
          id=res.data[0]._id
          }
     })
     Cards.doc(id).update({
          data:{
          knownum:know
          },
          success:function(res)
          {
               console.log("更新knownum成功",that.knownum)
          }
   })
   },
   know(){
     count++;
     
     if(count <= wholenum){
         know+=1
         this.renew()
     }  
     console.log(count,know,wholenum);
     this.changepage();
},

 unknow(){
     count++;
     this.changepage();
   },
   //获取卡片集的单词数
   getnum(){
     var that = this;
     Cards.where({
          cardId:"2"
     })

     .get({
          success:function(res){
          console.log("查询卡片集成功",res.data[0].wholenum)
          wholenum=res.data[0].wholenum
          that.setData({
               total:wholenum
          })
          }
     })
       
   },
   //事件处理函数
   onLoad: function (options) {
        know=parseInt(options.know);
        count=parseInt(options.count);
        this.renew();
        this.checkPage(this.data.nowPage);
        this.getnum();
        this.getwords();
   },
 
   // 页面判断逻辑,传入参数为当前是第几页 
   checkPage:function(index) {
        console.log("page",index)
        var data = this.data.xinList;
        var that = this;
        var m = 1;
        for(var i = 0;i < data.length;i++) {
             //先将所有的页面隐藏
             var disp = 'xinList[' + i + '].display';
             var sca = 'xinList[' + i + '].scale';
             var slateX = 'xinList[' + i + '].slateX';
             var zIndex = 'xinList[' + i + '].zIndex';
             var style = 'xinList[' + i + '].style';
             that.setData({
                  [disp]:0,
                  [style]: "display:block",
             });
             //向左移动上一个页面
             if(i == (index - 1) ){
                  that.setData({
                       [slateX]: '-200%',
                       [disp]: 1,
                       [zIndex]: 2,
                  });
             }
             //向右移动的最右边要display:none的页面
             if (i == (index + 3)) {
                  that.setData({
                       [style]:'display:none',
                       [slateX]:'0',
                       [zIndex]: -10,
                  });
             }
             if(i == index || (i > index && (i < index + 1))) {
                  that.setData({
                       [disp]:1
                  });
                  if(m == 1){
                       this.setData({
                            [sca]: 1,
                            [slateX]: "0",
                            [zIndex]: 1,
                       });
                  }
                  m ++;
                }
        }
    },
    turnCard(){
          var data=this.data
          this.setData({
               meaning:data.xinList[data.learned-1].meaning
          })
    },
    //对话框
    handleOpen2 () {
     this.setData({
         visible2: true
     });
    },
     handleClose2 () {
        this.setData({
            visible2: false
        });
        this.back()
     
    },
    review(){
     this.setData({
          visible2: false
      });
     wx.redirectTo({
          url: '../flashcard/flashcard?count=0&&know=0'
     }) 
    }
})
            

