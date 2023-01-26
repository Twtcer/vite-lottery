<!--
 * @Author: landwind
 * @Date: 2023-01-26 16:21:53
 * @LastEditors: landwind
 * @LastEditTime: 2023-01-26 16:29:47
-->
<template>
  <div class="home">
    <!-- S-转盘抽奖 -->
    <div class="turntable-game" id="twoMask">
      <div class="game" id="threeMask">
        <img src="@/assets/images/turntable_tip.png" class="tip" :style="`transform: rotate(${currentAngle}deg)`">
        <div class="pointer" @click="turntable()">
          <img v-show="turntableNum === 0" src="@/assets/images/turntable_disable.png" class="yuan">
          <img v-show="turntableNum !== 0" src="@/assets/images/turntable_can.png"  class="yuan">
          <p class="pointer_text">
            <span class="pointer_num">{{turntableNum}}</span>
            <span>抽奖</span>
          </p>
        </div>
      </div>
    </div>
    <!-- E-转盘抽奖 -->
  </div>
</template>

	
<script lang="ts" >
import { defineComponent, onMounted, reactive, inject, toRefs } from 'vue'
export default defineComponent({
  name: 'home',
  setup () {
    // 通过依赖注入方式获取到i18n全局对象
    const i18n:any = inject('i18n')
    const $toast:any = inject('$toast')

    const state = reactive({
      turntableNum:10, // 拥有的转盘次数
      currentAngle:0, // 转盘度数
      turnTableTime: 0, // 转盘次数的参数（为了记录上一次的位置+1）
      turnTableFlag: false, // 防止重复点击抽奖
    })
    onMounted((): void => {
    })
    // 转盘抽奖接口
    const turntable = () =>{
      console.log("转盘抽奖接口")
      if(state.turntableNum === 0){
        $toast("没有抽奖次数")
        return
      }
      if(state.turnTableFlag){
        $toast("正在抽奖...")
        return
      }
      // http请求后台接口，成功获取抽奖结果后，开始转盘
      startGame(3)
      state.turntableNum = state.turntableNum - 1
    }
    // 开始转盘
    const startGame = (award: any) => {
      state.turnTableFlag = true
      state.turnTableTime++
      // 底下的60是根据圆360度，然后demo里是均分6个奖品，所以就是360/6=60
      let max = award * 60 
      let min = (award-1) * 60
      let angle = parseInt(Math.random() * (max - min + 1) + min, 10)
      state.currentAngle = 360 * (state.turnTableTime * 7) + angle
      setTimeout(() => {
      	state.turnTableFlag = false
        console.log("转盘抽中后的行为")
        // ...
      }, 5000)
    }
    return {
      ...toRefs(state),
      startGame,
      turntable,
    }
  }
})
</script>

	
<style lang="scss" scope>
.turntable-game {
  font-size: 18px;
  line-height: 40px;
  width: 100%;
  height: 606px;
  // background: url(../assets/images/turntablegame_bg.png) no-repeat 0 0;
  background-size: cover;
  text-align: center;
  .game{
    margin: 0 auto;
    margin-top: 17px;
    position: relative;
    text-align: center;
    background: url(../assets/images/turntable_bg.png) no-repeat;
    background-size: cover;
    width: 323px;
    height: 323px;
    .pointer{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .yuan{
        width: 89px;
      }
      .pointer_text{
        // width: 89px;
        // height: 89px;
        display: inline-block;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        span{
          display: inline-block;
          font-size: 18px;
          font-weight: bold;
          color: #F7F6E8;
          line-height: 22px;
          text-shadow: 0px 1px 3px #B5730B;
        }
        .pointer_num{
          font-size: 17px;
          font-weight: bold;
          color: #FFFFFF;
          line-height: 17px;
        }
      }
    }
    .tip{
      // width: 130px;
      height: 200px;
      margin: 60px;
      display: inline-block;
      transition: transform 4s;
    }
  }
}
</style>
