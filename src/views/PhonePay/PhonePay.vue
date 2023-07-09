<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPayStateRequest, completePayRequest } from '@/api';
import { myMessage } from '@/tools/message';

const route = useRoute();

if (typeof route.query.orderIds === 'string') route.query.orderIds = [route.query.orderIds];

const isPayed = ref(false);
const isFinish = ref(false);
const isPaying = ref(false);

async function init() {
  try {
    isPayed.value = (await getPayStateRequest(route.query.orderIds as Array<string>)).data;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
}

init();

async function pay() {
  isPaying.value = true;
  try {
    const res = (await completePayRequest(route.query.orderIds as Array<string>)).data;
    myMessage(res, 'success');
    isFinish.value = true;
  } catch (err: any) {
    myMessage(err.response?.data?.errorMessage || '请重新登录', 'error');
  }
  isPaying.value = false;
}
</script>

<template>
  <div class="phone-pay" v-if="!isPayed">
    <div v-if="!isFinish">
      <p class="pay-text">这只是模拟支付，并不会真的扣钱</p>
      <p class="pay-text" style="font-weight: bold">￥{{ Number($route.query.price)?.toFixed(2) }}</p>
      <el-button class="pay-btn" color="green" round :loading="isPaying" @click="pay">
        <template #default>
          <span class="el-btn-text">{{ !isPaying ? '支付' : '请稍等' }}</span>
        </template>
      </el-button>
    </div>
    <div v-else>
      <p class="pay-text" style="font-weight: bold">支付成功！</p>
    </div>
  </div>

  <div class="phone-pay" v-else style="font-weight: bold">该订单已支付，请勿重复支付</div>
</template>

<style lang="less" scoped>
.phone-pay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  font-size: 5vw;

  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .pay-text {
    margin-bottom: 5vw;
    width: 90vw;
    text-align: center;
    font-size: 6vw;
  }

  .pay-btn {
    width: 80vw;
    height: 15vw;

    .el-btn-text {
      font-size: 5vw;
      color: #fff;
    }
  }
}
</style>
