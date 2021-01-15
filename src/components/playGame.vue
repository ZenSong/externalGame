<template>
    <div class="paly-game">
        <div class="navber">
            <div class="left" @click="goBack()">
                <img src="../../static/img/left.png" alt="">
            </div>
            <div class="title">
                
            </div>
            <div class="right" @click="goHome()">
                <img src="../../static/img/home.png" alt="">
            </div>
        </div>  
        <div class="game-box"> 
            <iframe id="iframe" :src="gameUrl"   frameborder="0"></iframe>
        </div> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            gameUrl : "" , // 游戏路径
        }
    },
    created () { 
        this.gameUrl = this.$route.query.url 
    },
    mounted () {
        var iframe = document.querySelector("iframe") 
        var gameBox = document.querySelector(".game-box")
        var a = document.documentElement.clientHeight    
        iframe.style.width = document.documentElement.clientWidth + "px"
        iframe.style.height = document.documentElement.clientHeight - 50 + "px" 
        var evt = "onorientationchange" in window ? "orientationchange" : "resize";
         
        // 当浏览器大小变化更新
        window.addEventListener('resize', function () {
            resetFontSize()
        }, false)
        resetFontSize()
		function resetFontSize(fals) { 
            iframe.style.width = document.documentElement.clientWidth + "px"
            iframe.style.height = document.documentElement.clientHeight - 50 + "px"  
		}  
    },
    methods : {
         
        // 返回上一页
        goBack() {
            this.$router.go(-1);
        },
        // 回主页 
        goHome() {
            // window.location.href = "https://51game.info";
            this.$router.push({
                path : '/'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.paly-game{
    width: 100%;
    .navber{
        height: 50px;
        width: 100%;
        position: fixed; 
        top: 0;
        left: 0;
        z-index: 2019;
        padding: 7px 13px; 
        background-color: #7d7e80 !important;
        opacity: 0.8;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            height:27px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            >img{
            height: 80%;
            }
        } 
        .title{
            height: 27px;
            color: white; 
            line-height:27px;
            font-size: 0.9rem;
            text-align: center;
        }
        .right{
            height:27px;
            padding:0 .5rem;
            display: flex;
            align-items: center;
            img{
                width: 22px;
                height: 22px;
            }
        }
    }
    .game-box{
        width: 100%; 
        margin-top: 50px;
        iframe{
            width: 100%;
            height: 11rem; 
        }
    }
}
</style>
