<template>
    <div class="type">
        <div class="navber">
            <div class="left" @click="goBack()">
                <img src="../../static/img/left.png" alt="">
            </div>
            <div class="title">
               <span @click="goHome()">Home</span> / {{gameName}} 
            </div>
            <div class="right" @click="copyLink()">
                <img src="../../static/img/copy.png" alt="">
            </div>
        </div>
        <div class="game-list">
            <div class="list-block" v-if="gameDatails.imgUrl != undefined">
                <div>
                    <img v-lazy="gameDatails.imgUrl" alt="">
                </div>
                <div>
                    <div>
                        {{gameName}}
                    </div>
                    <!-- <div>Puzzle & Logic</div> -->
                    <div><span>★★★★★</span> </div>
                     
                </div>
                <div>
                    <div @click="playGame()">PLAY</div>
                </div>
            </div> 
            <div class="line"></div>
             
            <div class="introduce" v-if="gameDatails.content != undefined">
                <div >Introduction</div>
                <div>{{gameDatails.content}}</div> 
            </div>
            <div class="line" v-if="gameDatails.content != undefined"></div>
            <ul class="may-like" v-if = 'makeLikeArr.length > 0'>
                <div>You may like it.</div>
                <li v-for="(item,index) in makeLikeArr" :key="index">
                    <div @click="anotherData(item)">
                        <div>
                            <img v-lazy="item.cover" alt="">
                        </div>
                        <div>
                            {{item.name}}
                        </div>
                        <div>
                            <div>PLAY</div>
                        </div>
                    </div>
                    
                </li>
            </ul> 
            
        </div> 
    </div> 
</template>
<script>
import {getExternalSingle,getExternalListData} from '@/common/api/api.js'
export default {
    data() {
        return {
            queryID: 0,       //查询id
            gameName: "",     // 游戏名
            categoryId  : 0,   //所属分类id
            gameDatails : {}, // 游戏详情数据
            makeLikeArr : [], // 你可能喜欢数据 
        }
    },
    created () {
         
        this.queryID = this.$route.query.id
        this.gameName = this.$route.query.gameName
        this.categoryId = this.$route.query.categoryId
        this.getGamesDatails()
        // 获取你喜欢列表的数据
        this.getMakeLike()
        // 更改title 标签里的值
        var title = document.querySelector("title")
        title.innerHTML = this.gameName  
    },
    mounted () {
         
    },
    // 监听路由变化
    watch: {
        '$route' (to, from) { 
            this.$router.go(0);
        }
    },
    methods : { 
        goHome() {
            this.$router.push("/") 
        },
        goBack () {
            if(this.$route.query.goBack != undefined) {
                this.$router.go(-1) 
            }
            else{
                this.$router.push("/") 
            }
             
        },
        // 复制链接
        copyLink() {
            var int = document.createElement("input");
            int.style.position = "absolute"
            int.style.top= "-10000px"
            document.body.appendChild(int)
            int.setAttribute("value", window.location.href)
            int.select()
            document.execCommand("copy")
            int.parentNode.removeChild(int)  
            this.$toast('Successful copy link');
        },
        playGame() { 
            // window.location.href = "http://playing.51game.info/playGame?url=" + this.gameDatails.gameUrl + "&id=" + this.queryID
            window.open(this.gameDatails.gameUrl)
            // this.$router.push({
            //     path : '/playgame',
            //     query : {
            //         url : this.gameDatails.gameUrl,
            //         id : this.queryID
            //     } 
            // })
            
        },
        // 获取详情数据
        getGamesDatails () {  
            let data  = {
                id : this.queryID
            }
            getExternalSingle(data)
            .then(res=> { 
                this.gameDatails = res.data
            })
            .catch( err => {
                console.log(err)
            })
            
             
        },
        // 你可能喜欢的数据
        getMakeLike () {  
            var number = parseInt(Math.random() * (15-1) + 1)
            let data  = {
                begin : number,
                end : 3,
                typeId : this.categoryId
            }
            getExternalListData(data)  
             .then(res=> {  
                this.makeLikeArr = res.data
            })
            .catch( err => {
                console.log(err)
            })   
        },
        anotherData (item) { 
            this.$router.push(
                {
                    path:'/type', 
                    query: { 
                        id: item.id,
                        gameName : item.name,
                        categoryId: item.typeId, 
                        goBack : 1
                    }
                }
            ) 
        }, 
    }
}
</script>
<style lang="scss" scoped>
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
    .type{
        width: 100%; 
        .navber{
            height: 2.2rem;
            width: 100%;
            position: fixed; 
            top: 0;
            left: 0;
            z-index: 2019;
            padding: .3125rem .625rem; 
            background-color: #7d7e80 !important;
            opacity: 0.8;
            display: flex;
            justify-content: space-between;
            .left{
                height:1.5625rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-right: 5px;
                >img{
                height: 80%;
                }
            } 
            .title{
                height: 100%;
                color: white; 
                line-height:1.5625rem;
                font-size: 0.75rem;
                text-align: center;
                text-overflow: ellipsis;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                display: -webkit-box; 
                span{
                    font-weight: 800;
                    color: rgb(3, 3, 3);
                    display: inline-block;
                    height: 100%;
                }
            }
            .right{
                height: 1.5625rem;
                padding:0 .5rem;
                display: flex;
                align-items: center;
                img{
                    width: 22px;
                    height: 22px;
                }
            }
        }
        .game-list {
            width: 100%;
            margin-top: 2.2rem;
            margin-bottom: 0.5rem;
            .list-block{ 
                padding: 0.5rem;
                display: flex;
                justify-content: flex-start;
                >div:nth-of-type(1){
                    width: 4rem;
                    height: 4rem; 
                    >img{
                        width: 100%;
                        height: 100%; 
                    }
                }
                >div:nth-of-type(2){
                    width: 50%;
                    height:  4rem;
                    padding: 0.3rem;
                    padding-left: 0.7rem;
                    >div:nth-of-type(1){
                        font-weight: 600;
                        // color: rgb(73, 73, 73);
                        height: 2.5rem;
                        font-size: 0.9rem;
                        text-overflow: ellipsis;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        display: -webkit-box;
                    }
                    // >div:nth-of-type(2){
                    //     font-size: .6rem;
                    //     color: #919191;
                    //     overflow: hidden;
                    //     white-space: nowrap; 
                    //     text-overflow: ellipsis;
                    // }
                    >div:nth-of-type(2){
                        font-size: .6rem;
                        >span:nth-of-type(1){
                            color: #f97c33; 
                        }
                        >span:nth-of-type(2){
                            color: #919191;
                            margin-left: 0.2rem;
                        }
                    }
                    >div:nth-of-type(4){
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        >div{
                            font-size: .6rem;
                            color: #919191;
                            overflow: hidden;
                            white-space: nowrap; 
                            text-overflow: ellipsis;
                            margin-left: 0.2rem;
                        }
                    }
                    >div:nth-of-type(n+2){
                        margin-top: 0.2rem;
                    }
                }
                >div:nth-of-type(3){
                    width: calc(50% - 4rem);
                    position: relative;  
                    
                    >div{
                        font-size: .6rem; 
                        min-width: 55px; 
                        // padding: 7px 8px; 
                        line-height: 30px;
                        height: 30px; 
                        text-align: center;
                        position: absolute;
                        right: 10px;
                        top: calc(50% - 15px);
                        color: white;
                        background: #ed1941;
                        border-radius: .2rem;
                        animation: scaleDraw ease-in-out infinite  3.5s; 
                    }
                }
            }
            .may-like{
                padding: 0.5rem;
                width: 100%;
                >div{
                    margin-bottom: 10px;
                    font-weight: bold;
                    color: #222;
                    font-size: 1rem;
                }
                >li{
                    width: 100%;
                    height: 2.2rem; 
                    margin-top: 0.5rem;
                    >div{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        >div{
                            height: 100%;
                        }
                        >div:nth-of-type(1){
                            width: 2.2rem;
                            height: 2.2rem;
                            >img{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                            }
                        }
                        >div:nth-of-type(2){
                            width: 55%;
                            font-weight: 600;
                            // color: rgb(73, 73, 73);
                            padding-left: 1rem;
                            line-height: 2.2rem;
                            overflow: hidden;
                            white-space: normal;
                            
                        }
                        >div:nth-of-type(3){
                            width: calc(45% - 2.2rem);
                            position: relative;
                            display: flex;
                            align-items: center;
                            >div{ 
                                position: absolute;
                                font-size: .6rem;
                                min-width: 55px;
                                // padding: 7px 8px;
                                height: 30px; 
                                line-height: 30px;
                                text-align: center; 
                                right: 10px; 
                                color: white;
                                background: #ed1941;
                                border-radius: .2rem;
                                animation: scaleDraw ease-in-out infinite  3.5s; 
                            }
                        }
                    }
                    
                }
            }
            .line{
                height: 7px;
                width: 100%;
                background: #f5f5f5;
            }
            .introduce{
                background: #fff;
                padding: 0.5rem;
                // color: #7e848c;
                font-size: 0.9rem;
                >div:nth-of-type(1){
                    margin-bottom: 0.5rem;
                }
                >div:nth-of-type(2){
                    font-size: 0.7rem;
                    text-indent: 2em;
                    // color: #7e848c;
                    line-height: 1.5;
                    margin-bottom: 3px;
                }
                >div:nth-of-type(3){
                    margin: 0.5rem 0;
                    font-size: 0.7rem;
                }
                >div:nth-of-type(n+4){
                    font-size: 0.3rem;
                }
            }
        } 
        .paly-game{
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2.5rem; 
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            >div{
                height: 85%;
                width: 95%;
                text-align: center;
                line-height: 2.2rem;
                background: #F14141;
                color: white;
                border-radius: 8px;
            }
        }
    }
</style>
