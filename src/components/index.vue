<template>
  <div class="index">   
       
    <!-- hots  bests latest -->
    <div class="content_box">
        <van-tabs :active=myActive1   @change="changeActive"  swipeable sticky class="my-box-shadow" color="#F99D00" title-active-color="#F99D00">
          <van-tab  v-for=" (item,index) in homeSpecs" :key="index" :title= item.name  >
            
            <!-- home数据 -->
            <ul class="home_specs" v-if="item.name=='Home'">
              <li v-for="(item2,index2)  in item.data " :key="index2">  
                   <!-- 轮播图 -->  
                  <div class="my-slides"  v-if="index2 == 0">
                    <div class="recommend-sekgrn">
                      <div>
                          <div></div>
                          <div>recommend</div>
                      </div> 
                    </div>
                    <div>
                      <van-swipe :autoplay="8000"   :duration="800">
                        <van-swipe-item v-for="(item,index) in slides" :key="index">
                          <ul>
                            <li v-for="(pro) in item" :key="pro.id">
                              <router-link :to="{path: '/type', query: {id : pro.id,gameName:pro.name,categoryId: pro.typeId,goBack:1}}" tag="a">
                                    <div>
                                      <!-- <img v-lazy="pro.cover" alt=""> -->
                                      <img :src="pro.cover" alt="">
                                    </div>
                                    <div> 
                                        <div>{{pro.name}}</div>
                                        <div>★★★★★</div> 
                                    </div>
                                    <div>PLAY</div>
                              </router-link>  
                            </li>
                          </ul>  
                        </van-swipe-item>
                      </van-swipe>  
                    </div>
                    
                  </div>
                  <!-- 标题栏 -->
                  <!-- <van-cell :title="hots[index2]" class="sekgrn"/> -->
                  <div class="sekgrn">
                      <div></div>
                      <div>{{hots[index2]}}</div>
                      <div @click="homeMore(index2)">More</div>
                  </div>
                  <ul>
                    <li v-for="(item3,index3 )  in item2 " :key="index3+item3">
                      
                      <router-link tag="a" :to="{path: '/type', query: {id : item3.id,gameName:item3.name,categoryId: item3.typeId,goBack:1}}">
                        <dl >
                          <dt>  
                            <img v-lazy="item3.cover" alt=""> 
                            </dt>
                          <dd>{{item3.name}}</dd>
                          <dd>
                            <span v-if="item3.play_count"> {{item3.play_count  }}0K</span>
                            <span v-else> {{ item3.playCount }}K</span>
                          </dd>
                        </dl>
                      </router-link>
                    </li>
                  </ul>
                   
              </li>
            </ul>
            <!-- categories分类数据 -->
            <ul class="home_categories" v-if="item.name!='Home'">
                <!-- <li v-for=" (item2) in item.games" :key="item2.id"> -->
                <li v-for=" (item2) in classifyGames" :key="item2.id">
                  <!-- 对接别人的数据 -->
                  <a :href="item2.url" v-if="item2.hasOwnProperty('url')">
                    <dl>
                      <dt> 
                        <img v-lazy="item2.cover" alt=""> 
                        </dt>
                      <dd class="massage">
                        <p>{{item2.name}}</p> 
                        <p><span> {{parseInt(item2.play_count/10000)}}W</span></p>
                      </dd>
                      <dd class="play">play</dd>
                    </dl>
                  </a>
                  <!-- 我们的数据 -->
                  <router-link :to="{path: '/type', query: {id : item2.id,gameName:item2.name,categoryId: item2.typeId,goBack:1}}" tag="a" v-if="!item2.hasOwnProperty('url')">
                     <dl>
                      <dt> 
                        <img v-lazy="item2.cover" alt=""> 
                      </dt>
                      <dd class="massage">
                        <p>{{item2.name}}</p> 
                        <p>
                          <span v-if="item2.play_count "> {{item2.play_count}}0K</span>
                          <span v-else>{{ item2.playCount}}K</span>
                        </p>
                      </dd>
                      <dd class="play">play</dd>
                    </dl> 
                  </router-link>
              </li>
              <!-- 加载数据动画 -->
              <li class="my-loading"  v-if="myLoading && !noMoreData"> 
                  <van-loading color="#1989fa" />
              </li>

              <li class="show_more" v-if="noMoreData"> 
                  <p>
                    <span >  No More</span>
                  </p>
              </li>
            </ul> 
          </van-tab>  
      </van-tabs>
    </div>
  </div>

</template>

<script> 
import {getExternalTypeList,getExternalListData} from '@/common/api/api.js'
export default {
  name: 'index',
  data () {
    return { 
      hots:["hots","best","latest"],
      homeSpecs: [
        {
          id: 10000,
          name: "Home",
          data: [[],[],[]]
        }
      ], // 首页数据
      classifyGames: [], // 不是首页的数据
      queryID : 1, // 查询ID
      slides:[
        [],
        [],
        []
      ],  
      pageNumber : 1 , // 记录页码
      myLoading : false,  //数据加载
      noMoreData : false, // 没有数据的时候显示
      myActive1 : 0,  // 选中的分类
      sortArr: [], // 存储分类数组  
    }
  },
  created() {  
    var title = document.querySelector("title")
    title.innerHTML = "51Games - Free Online Games"
   // 轮播图  
    this.getSlides()  
   // 首页数据
    this.getHome()
    // 分类数据
    this.getUsData()  
    
    // 当页面宽度超过1000时, 设置body的宽度为20rem 
    if(window.innerWidth>=1000){
      var Odom=document.getElementsByTagName("body")[0]
      Odom.style.margin="0 auto"
      Odom.style.width="20rem"
      Odom.style.left="25%"
    }
  },
  
  destroyed(){
      window.removeEventListener('scroll', this.MyScroll, false);
  },
   methods: {
    // 滑动监听  
     MyScroll () {  
        var that = this
        var scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - 80; // body html的底部距离
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight; // body html的屏幕高度
        if(document.querySelector(".my-loading") != undefined) {
            var a = document.documentElement.clientHeight || document.body.clientHeight;
            var clientHeight = a + document.querySelector(".my-loading").clientHeight;
        }  
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // 滑动的距离
        var daodi = scrollTop + clientHeight  
        if(daodi >=  scrollHeight ) {  
                window.removeEventListener('scroll', this.MyScroll, false);  
                that.myLoading = true 
                if(this.noMoreData) {
                  window.addEventListener("scroll", this.MyScroll, false)
                  that.myLoading = false
                  return
                } 
                that.timer = setTimeout((res)=> { 
                    that.getUsClassifyGames("nofirst") 
                },1200)  
        }
        else {
            that.myLoading = false 
        } 
    },
      
    // 轮播数据
    getSlides() {  
      var number = parseInt( (Math.random() * (24 - 1 + 1)) + 1)   
      let data = {
          begin : number,
          end : 9,
          typeId : 1
      }
      getExternalListData(data)
      .then(res=> {     
          this.slides = [[],[],[]] 
          var a = -3
          var b = 0;
          for(var i= 0; i < this.slides.length; i++) {
            a = a + 3
            b = b + 3 
            for(var j = a; j < b; j++) {
              this.slides[i].push(res.data[j])
            }
          }  
      })
      .catch( err => {
        console.log(err)
      })
    },
    // 首页数据 
    getHome() {   

        for(let i =0; i < 3; i++) {
            let data = {
              begin : 1,
              end : 10,
              typeId : i+ 1
          }
          getExternalListData(data)
          .then(res=> { 
            this.homeSpecs[0].data[i].push(...res.data)  
          })
          .catch( err => {
            console.log(err)
          }) 
        }
    },
    // 自己的数据 
    getUsData(){   
        getExternalTypeList()
        .then(res=> { 
          this.homeSpecs.push(...res.data)   
          this.sortArr = res.data  
        })
        .catch( err => {
          console.log(err)
        })   
    }, 
    // 某一分类数据(我们的自己的数据)
    getUsClassifyGames(str) { 
        if(str == "first") {
           this.classifyGames = []
        }
        else {
          this.pageNumber++
        }  
        var number = parseInt( (Math.random() * (24 - 1 + 1)) + 1)   
        let data = {
            begin : this.pageNumber,
            end : 15,
            typeId : this.queryID
        }
        getExternalListData(data)
        .then(res=> {     
            this.myLoading = false
            if(res.data.length <= 0 ) {
                this.noMoreData = true 
            }
            else {
              // 第一次
              if(str == "first") {
                this.classifyGames = res.data
              }
              else {
                this.classifyGames.push(...res.data)
              }
            }
            window.addEventListener("scroll", this.MyScroll, false)
        })
        .catch( err => {
          console.log(err)
        }) 
    },
     changeActive(index,title){ 
      this.myActive1 = index  
      // 每次切换时都让 没有数据隐藏
      this.noMoreData = false
      // 切换分类的时候将页码设置为初始值
      this.pageNumber = 1 
      this.queryID = this.homeSpecs[index].id   
      if(title != "Home") {
        window.addEventListener("scroll", this.MyScroll, false)
        this.getUsClassifyGames("first")   
      } 
      else {
       
        // 轮播图
        this.getSlides() 
      }
    },  
    // 首页里点击的更多
    homeMore(index) {
      this.myActive1 = index + 1 
      this.noMoreData = false
      // 切换分类的时候将页码设置为初始值
      this.pageNumber = 1 
      this.queryID = this.homeSpecs[this.myActive1].id    
      window.addEventListener("scroll", this.MyScroll, false)
      this.getUsClassifyGames("first")   
    }
  }
}
</script>



<style>
.content_box{
  width: 100%;
}
.content_box .van-tab {
    flex-basis: auto !important; 
    padding:0 0.4rem;
}
.content_box .van-tab span {
    font-size: 14px;
    font-weight: 800;   
    
}
.content_box .van-tab{
  color: black;
}
 
.content_box .my-box-shadow>div:nth-of-type(1){
    box-shadow:  0px 5px 5px -5px rgba(0,0,0,.8);
} 
/* .content_box .my-box-shadow .van-sticky--fixed:nth-of-type(1){
     
} */
.googleList1{
  width: 100%; 

}
.googleList{
  width: 100%; 
  
}
.search-bar-fixed{
  position:fixed; 
  top:0;
  z-index:999;
}

@keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
      0%{
          transform: scale(1);  /*开始为原始大小*/
      }
      25%{
          transform: scale(1.1); /*放大1.1倍*/
      }
      50%{
          transform: scale(1);
      }
      75%{
          transform: scale(1.1);
      }
  } 
.home_categories .play{
    animation: scaleDraw ease-in-out infinite  3.5s; 
    /* box-shadow: 1px 1px 3px #000; */
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

.van-cell {
  font-size: .875rem;
}
.van-icon__image{
  width: 1rem;
  height: 1rem;
}
.van-swipe-item{
  img{
    width: 100%;
    height: 100%;
  }
}
.recommend-sekgrn{
    width: 100%; 
    margin-top: 0.3rem;
    >div{
      display: flex;
      align-items: center; 
      height: 2rem;
      background: rgb(255, 238, 215);
      // border-bottom: 1px solid #dedede;
      padding-left: 0.7rem;
      margin-bottom: 0.3rem;
      position: relative;
      >div:nth-of-type(1){
        width: 5px;
        height: 1rem;
        background-color: #FF9500;
      }
      >div:nth-of-type(2){
        padding-left: 1rem; 
        font-weight: 800;
        font-size: 14px;
      }
      >div:nth-of-type(3){
        position: absolute;
        right: 20px;
        font-weight: 700;
        font-size: .9rem;
      }
    } 
  }
.my-slides{
  width: 100%; 
  ul{
    width: 100%;
    >li{
      width: 100%; 
      padding: 0 0.3rem;
      >a {
        display: inline-block;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        >div:nth-of-type(1) {
          width:  4rem;
          height: 4rem;
          padding: 0.5rem;
          >img{
            width: 100%;
            height: 100%;
          }
        }
        >div:nth-of-type(2) {
          width: calc(100% - 8rem);
          >div:nth-of-type(1){
            font-weight: 800;
            height: 2rem;
            font-size: 0.7rem;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            display: -webkit-box;
          }
          >div:nth-of-type(2){
            color: #f97c33;
          }
        }
        >div:nth-of-type(3){
          width: 4rem;
          height: 1.5rem;
          text-align: center;
          color: white;
          background: #F99D00;
          line-height: 1.5rem;
          border-radius: 2px;
          box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
        }
      }
    }
  }
}

.home_specs {
  width: 100%;
  padding: 0 0.3rem;
  margin-top: 0.3rem;
    >li{
      width: 100%;
      .sekgrn{
        display: flex;
        align-items: center; 
        height: 2rem;
        background: rgb(255, 238, 215);
        // border-bottom: 1px solid #dedede;
        padding-left: 0.7rem;
        margin-bottom: 0.3rem;
        position: relative;
        >div:nth-of-type(1){
          width: 5px;
          height: 1rem;
          background-color: #FF9500;
        }
        >div:nth-of-type(2){
          padding-left: 1rem; 
          font-weight: 800;
          font-size: 14px;
        }
        >div:nth-of-type(3){
          position: absolute;
          right: 20px;
          font-weight: 800;
          font-size: 14px;
        }
      }
      >ul:nth-last-of-type(1){
        margin-bottom: 1rem;
      }
      >ul{
        width: 100%;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          padding: 0 .3rem;
        li{ 
          width: calc(50% - 0.6rem);
          margin: .5em .3rem;
          margin-top: 0.2rem;
          // box-shadow: 1px 1px 4px rgb(139, 138, 138);
          box-shadow: 0 0.02667rem 0.16rem rgba(0,0,0,.117647), 0 0.02667rem 0.10667rem rgba(0,0,0,.117647);
          border-radius: 4px;
          dl{
            dt{
              height: 6rem;
              display: flex;
              justify-content: center;
              padding: 0.2rem;
              img{ 
                width: 5.6rem;
                height: 100%;
                border-radius: .3rem;
              }
              overflow: hidden;
              border-radius: .3125rem;
            }
            dd{
              width: 100%; 
              font-size: .65rem;
              text-align: center;
              // white-space: nowrap; 
              // overflow: hidden;
              text-overflow: ellipsis;
              // color: rgba(71,74,79,.87);
              margin-bottom: 0.1rem;

              overflow: hidden;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              span{
                color: #F99D00;
                font-size: .65rem;
              }

            }
            dd:nth-of-type(1){
              height: 1.5rem;
              line-height: 1.5rem;
              font-weight: 800;
            }
          }
        }
      }
    }

}
.home_categories{ 
      background: rgba(245, 245, 245, 0.5);
      padding: .5rem 1rem;
    li{
       margin-bottom: 0.5rem;
       background-color: white;
      dl{
        display: flex;
        justify-content: space-between;
        
        align-items: center;
        dt{ 
          border-radius: 3125rem;
          width: 5rem;
          height: 5rem;
          overflow: hidden;
          border-radius: .625rem; 
          padding:  0.9rem;
          img{
            width: 100%;
            height: 100%;
            border-radius: 10px;
          }
        }
        dd{
          
          span{
            color: #F99D00;
            font-size: .75rem;
          }
          word-wrap: break-word;
          color: rgba(71,74,79,.87);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          
          p:nth-child(1){
            font-size: .75rem;  
            overflow: hidden;
            white-space: normal;
            text-overflow: ellipsis;
            font-weight: 800;
          }
          p:nth-child(2){
            font-size: .75rem;
            padding-top: 0.5rem; 
            
          }
        }
        .massage{
          width: calc(85% - 5rem);
          padding-left: .9375rem;
          font-size: .75rem; 
        }
        .play{
          width:15%;
          margin-right: 0.4rem;
          color: white; 
          background: #F99D00;  
          border-radius: 0.2rem;
          height: 1.5rem;
          text-align: center;
          line-height: 1.5rem; 
        }
      }
    } 
    .show_more{
    display: flex;
    justify-content: space-between;
    padding: 0 1.25rem;
    background-image: linear-gradient(top,rgba(245,239,241,0),rgba(	248, 249, 249,.8));
    background-image: -webkit-gradient(linear,left top,left bottom,from(rgba(245,239,241,0)),to(rgba(	248, 249, 249,.8)));
    p{
      width: 20%;
      height:1.875rem;
      text-align: center;
      width: 100%;
    
      img{
        width:  .75rem;
        height:  .75rem;
        margin-top: .625rem;
      }
      span{
        line-height:1.875rem;
        color:	#9ec8ff;
        font-size: .75rem;
      }
    }
  }
  .my-loading{
      height: 2.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      img{
          width: 29px;
          height: 28px;
          animation: myfirst 0.5s linear  infinite;
      } 
  }
}
.home_categories1{
  padding:0  0 1rem 0 ;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  >li{
    width: 50%;
    height: 10rem;
    padding: 0 0.25rem 1rem ;
    
    // padding: 0 7.5px 15px;
    div{
      width: 100%;
      height: 100%;
      position: relative;

      
     p{
       width: 100%;
       background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.618));
       border-radius: 0.5rem;
       position: absolute; 
       left: 0rem; 
       bottom: 0rem; 
      color: #fff;
      display: flex;
      flex-direction: column;
      padding: 1rem 0.3rem 0.5rem;
     } 
    }
  }
}
// .sort_list{
//   ul{
//     display: flex;
//     justify-content: space-around;
//     flex-wrap: wrap;
//     padding: 0 .3125rem;
//   }
//   li{
//     // width: 3.5rem;
//     width: 33.3333%;
//     padding: .3125rem .25rem;
//     dl{
//       dt{
//         img{
//           width: 100%;
//           height: 100%;
//         }
//         overflow: hidden;
//         border-radius: .3125rem;
//       }
//       dd{
//         font-size: .65rem;
//         text-align: center;
//         white-space: nowrap;
//         overflow: hidden;
//         text-overflow: ellipsis;
//         color: rgba(71,74,79,.87);
//         span{
//           color: #F99D00;
//           font-size: .65rem;
//         }

//       }

//     }
//   }

// }
</style>
