// component_zyy/word_choices/wordChoices.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 单词总数
    total: {
      type: Number,
      value: 0,
      observer(total){
        this.setData({
          'totalNum': total
        })
      }
    },
    // 单词组
    words: {
      type: Array,
      value: [{word:'', meaning:''}],
      observer(words){
        this.setData({
          'wordsArr': words
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    word: '',
    meaning:'',
    choices: [{value:'',res:true,class_btn:"btn"}],
    serialNum: 1,
    totalNum: 0,
    wordsArr: [{word:'', meaning:''}],
    class_btn:"btn",
    animationData:{}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getChoices(){
      // 随机生成选项
      console.log('getChoices'+ this.data.word)
      let choice = []
      // 选项数量
      let num = this.data.totalNum>=4?4:this.data.totalNum
      console.log('num:' + num)
      // 正确选项编号
      let correct = this.getRandomNum(num)
      console.log('correct:' + correct)
      // 生成选项
      if(this.data.totalNum == 1){
        choice = [{value: this.data.meaning, res: true,class_btn:"btn"}]
      }else {
        let newArr = this.copyArr(JSON.stringify(this.data.wordsArr))
        // newArr = this.data.wordsArr
        newArr = newArr.sort((a, b) => Math.random() - 0.5)
        console.log(newArr)
        let j=0,i=0
        while(i < num){
          if(i == correct - 1) {
            choice.push({
              value: this.data.meaning,
              res: true,
              class_btn:"btn"
            })
            i++
          }else {
            // console.log(newArr[j]['word'])
            if(newArr[j]['word'] != this.data.word){
              choice.push({
                value: newArr[j].meaning,
                res: false,
                class_btn:"btn"
              })
              i++
            }
            j++ 
          }
        }
      }
      console.log(choice)
      // 渲染
      this.setData({
        'choices': choice,
        'class_btn':"btn"
      })
      // console.log(this.data.choices)
    },
    // 生成1-n的随机整数
    getRandomNum(n){
      return parseInt(Math.random() * n, 10) + 1
    },
    changePage:function(){
      // console.log("changepage")
      // let animation = wx.createAnimation({
      //   duration: 500,
      // });
      // animation.translateX('-150%').translateY('-150%').rotate(60).step();
      // this.setData({
      //     animationData: animation.export()
      // });
      // let that=this
      
      // setTimeout(function(){
      //     animation = wx.createAnimation({
      //     duration: 0,
      // });
      //     animation.translateX('0').translateY('0').rotate(0).step();
      //     that.setData({
      //       animationData: animation.export()
      //     });
      // },500)
    },

    btnClick(event) {
        let res = event.target.dataset.res
        let word = this.data.word
        const id=event.currentTarget.dataset.index
        console.log("id",id)
        //setTimeout(() => {}, 1000)
      console.log("res",res)
        // this.setData({
        //   'serialNum': this.data.serialNum + 1
        // })
        let class1=(res==true?'right' : 'wrong')
        let choice1=this.data.choices
        choice1[id].class_btn="btn "+class1
        for(var i=0;i<choice1.length;i++)
        {
          if(choice1[i].res==true)
          {
            choice1[i].class_btn="btn right"
            break
          }
        }
        this.setData({
          "choices":choice1
        })

        var that=this
        setTimeout(function(){
          that.setData({
            'serialNum': that.data.serialNum + 1
          })


          // 向页面发送数据
        let data = {res, word}
        that.triggerEvent('selectAns',data)
        if(that.data.serialNum > that.data.totalNum)
        that.triggerEvent('finish')
      
        },1000)
        
    },
    copyArr(oldArr) {
      let newArr = []
      newArr = JSON.parse(oldArr)
      return newArr
    },
    
  },
  observers: {
    // 监听序列的变化
    'wordsArr, serialNum': function(wordsArr, serialNum){
      if((wordsArr.length>0)&(serialNum<=this.data.totalNum)){
        console.log('get word:')
        console.log(wordsArr)
        this.setData({
          'word': wordsArr[serialNum - 1]['word'],
          'meaning': wordsArr[serialNum - 1]['meaning']
        })
      }
    },
    // 监听单词的变化
    'word': function(word){
      this.getChoices()
    }
  }
})
