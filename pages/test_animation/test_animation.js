// pages/test_animation/test_animation.js
Page({
  data: {
      nowPgae:1,
      startX:0,
      slider:false,
      animationData:{},
      cardInfoList: [{ name: 1}, { name: 2}, { name: 3}, { name: 4}]
  },
//   touchstart(e){
//       this.setData({
//           startX: e.changedTouches[0].clientX,
//       })
//   },
//   touchend(e) {
//       let that=this;
//       let startX = this.data.startX;
//       let endX = e.changedTouches[0].clientX;
//       if (this.data.slider)return;

//       // 下一页(左滑距离大于30)
//       if (startX - endX > 30){
//           this.setData({
//               slider: true
//           });
//           //尾页(当前页 等于 总页数)
//           if (this.data.nowPgae == this.data.cardInfoList.length){
//               this.setData({
//                   slider: false
//               });
//               wx.showToast({title: '已经是最后一张了',icon:'none'});
//               return;
//           };

//           //创建动画   5s将位置移动到-150%,-150%
//           let animation = wx.createAnimation({
//               duration: 500,
//           });
//           animation.translateX('-150%').translateY('-150%').rotate(60).step();
//           this.setData({
//               animationData: animation.export()
//           });

//           // 移动完成后
//           setTimeout(function(){
//               var cardInfoList = that.data.cardInfoList;
//               var slidethis = that.data.cardInfoList.shift(); //删除数组第一项
//               that.data.cardInfoList.push(slidethis); //将第一项放到末尾
//               //创建动画   将位置归位
//               let animation = wx.createAnimation({
//                   duration: 0,
//               });
//               animation.translateX('-53%').translateY('-50%').rotate(0).step();

//               that.setData({
//                   cardInfoList: that.data.cardInfoList,
//                   animationData: animation.export(),
//                   slider:false,
//                   nowPgae:that.data.nowPgae+1
//               });
//           },500)
//       }

//       // 上一页
//       if (endX-startX  > 30){
//           this.setData({
//               slider: true
//           })
//           //首页
//           if (this.data.nowPgae == 1) {
//               this.setData({
//                   slider: false
//               })
//               wx.showToast({title: '已经到第一张了',icon: 'none'})
//               return;
//           };

//           //创建动画  移动到-150%,-150%
//           let animation = wx.createAnimation({
//               duration: 0,
//           });
//           animation.translateX('-150%').translateY('-150%').rotate(100).step();


//           var cardInfoList = that.data.cardInfoList;
         
//           var slidethis = that.data.cardInfoList.pop(); //删除数组末尾项
//           that.data.cardInfoList.unshift(slidethis);//将删除的末尾项放到第一项
//           that.setData({
//               animationData: animation.export(),
//               cardInfoList: that.data.cardInfoList,
//           });
          
//           setTimeout(function(){
//               //创建动画   5s将位置移动到原位
//               let animation2 = wx.createAnimation({
//                   duration: 500,
//                   // timingFunction: 'cubic-bezier(.8,.1,.2,0.8)',
//               });
//               animation2.translateX('-53%').translateY('-50%').rotate(0).step();
//               that.setData({
//                   animationData: animation2.export()
//               });
//               that.setData({
//                   slider: false,
//                   nowPgae: that.data.nowPgae - 1
//               });
//           },50)
//       }
//   },
  onLoad: function() {},
  click(event){
    let animation = wx.createAnimation({
      duration: 500,
  });
  animation.translateX('-150%').translateY('-150%').rotate(60).step();
  this.setData({
      animationData: animation.export()
  });
  let that=this
  
setTimeout(function(){
    animation = wx.createAnimation({
    duration: 0,
});
    animation.translateX('0').translateY('0').rotate(0).step();
    that.setData({
        animationData: animation.export()
    });
},500)


  }
})