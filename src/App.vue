<template>
  <div id="app"> 
    <router-view/> 
     
  </div>
</template>

<script>
export default {
  name: 'App',  
}
</script>

<style>
.van-tab{
  font-size: .875rem;
}

.my-positioning{
  width: 32px;
  height: 32px;
  position: fixed;
  bottom: 2rem;;
  right: 20px;
  display: none; 
}
.my-positioning>img{
  width: 100%;
  height: 100%;
  opacity: 0.7;
}
</style>
