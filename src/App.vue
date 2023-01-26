<!--
 * @Author: landwind
 * @Date: 2023-01-18 16:46:00
 * @LastEditors: landwind
 * @LastEditTime: 2023-01-26 16:27:29
-->
 
<template>
  <h1 class="test">矩形组件 </h1>
  <LotteryRectangle height="320" width="420"/>
 
  <h1 class="test">圆形指针组件 </h1>
  <LotteryCircle2 />

  <div>
    <h1 class="test">LuckyWheel组件 </h1>
  </div>
  <LuckyWheel ref="myLucky" width="300px" height="300px" :prizes="data.prizes" :blocks="data.blocks"
    :buttons="data.buttons" @start="startCallback" @end="endCallback" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import LotteryRectangle from './components/LotteryRectangle.vue'
import LotteryCircle2 from './components/LotteryCircle2.vue';

const myLucky = ref('')

const data = {
  blocks: [{ padding: '13px', background: '#617df2' }],
  prizes: [
    { fonts: [{ text: '0', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '1', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '2', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '3', top: '10%' }], background: '#b8c5f2' },
    { fonts: [{ text: '4', top: '10%' }], background: '#e9e8fe' },
    { fonts: [{ text: '5', top: '10%' }], background: '#b8c5f2' },
  ],
  buttons: [{
    radius: '35%',
    background: '#8a9bf3',
    pointer: true,
    fonts: [{ text: '开始', top: '-10px' }]
  }],
}


const startCallback = () => {
  // 调用抽奖组件的play方法开始游戏
  myLucky.play()
  // 模拟调用接口异步抽奖
  setTimeout(() => {
    // 假设后端返回的中奖索引是0
    const index = 0
    // 调用stop停止旋转并传递中奖索引
    myLucky.stop(index)
  }, 3000)
}

// 抽奖结束会触发end回调
const endCallback = (prize) => {
  console.log(prize)
}

</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
