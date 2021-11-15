<template>
  <!-- 动画 8 -->
  <view class="conffia">
    <view class="hex-border">
      <view class="hexagons">
        <view class="hexagon"></view>
        <view class="hexagon"></view>
        <view class="hexagon"></view>
        <view class="hexagon"></view>
        <view class="hexagon"></view>
        <view class="hexagon"></view>
        <view class="hexagon"></view>
      </view>
    </view>
  </view>

</template>

<script>
  export default {
    name: 'loading8',
    data() {
      return {

      };
    }
  }
</script>

<style>
  .conffia {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }

  /* 动画 8 样式 */
  .hex-border {
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    width: 170rpx;
    height: 170rpx;
    border: 2rpx solid #ebedf1;
    border-radius: 100%;
  }

  .hex-border::before {
    content: "";
    position: absolute;
    width: 174rpx;
    height: 174rpx;
    border: 2rpx solid #8c97ac;
    border-radius: 100%;
    box-sizing: border-box;
    clip-path: inset(0rpx 135rpx 135rpx 0rpx);
    -webkit-clip-path: inset(0rpx 135rpx 135rpx 0rpx);
    top: -2rpx;
    left: -2rpx;
    animation: rotateSmall 2s linear infinite;
    z-index: 2;
  }

  .hex-border::after {
    content: "";
    position: absolute;
    width: 174rpx;
    height: 174rpx;
    border: 2rpx solid #c5cbd5;
    border-radius: 100%;
    box-sizing: border-box;
    top: -2rpx;
    left: -2rpx;
    clip-path: inset(0rpx 30rpx 30rpx 0rpx);
    -webkit-clip-path: inset(0rpx 30rpx 30rpx 0rpx);
    animation: rotateLarge 1s linear infinite;
  }

  .hexagons {
    position: relative;
    border-radius: 100%;
    padding: 5%;
    top: 30rpx;
    left: 35rpx;
  }

  .hexagon {
    position: absolute;
    width: 40rpx;
    height: 23rpx;
    background-color: #79859e;
    transform: scale(1.02);
    transform-origin: center;
  }

  .hexagon::before {
    content: "";
    position: absolute;
    top: -11.5rpx;
    left: 0;
    width: 0;
    height: 0;
    border-left: 20rpx solid transparent;
    border-right: 20rpx solid transparent;
    border-bottom: 11.5rpx solid #79859e;
  }

  .hexagon::after {
    content: "";
    position: absolute;
    top: 23rpx;
    left: 0;
    width: 0;
    height: 0;
    border-left: 20rpx solid transparent;
    border-right: 20rpx solid transparent;
    border-top: 11.5rpx solid #79859e;
  }

  .hexagon:nth-child(1) {
    animation: animateHex 3s infinite;
  }

  .hexagon:nth-child(2) {
    left: 53rpx;
    animation: animateHex 3s 0.2s infinite;
  }

  .hexagon:nth-child(3) {
    left: -13rpx;
    top: 46rpx;
    animation: animateHex 3s 1s infinite;
  }

  .hexagon:nth-child(4) {
    left: 31rpx;
    top: 46rpx;
    animation: animateHex 3s 1.2s infinite;
  }

  .hexagon:nth-child(5) {
    left: 75rpx;
    top: 46rpx;
    animation: animateHex 3s 0.4s infinite;
  }

  .hexagon:nth-child(6) {
    top: 84rpx;
    animation: animateHex 3s 0.8s infinite;
  }

  .hexagon:nth-child(7) {
    left: 53rpx;
    top: 84rpx;
    animation: animateHex 3s 0.6s infinite;
  }

  @keyframes rotateSmall {
    100% {
      transform: rotate(1turn);
    }
  }

  @keyframes rotateLarge {
    0% {
      clip-path: inset(0rpx 30rpx 30rpx 0rpx);
      -webkit-clip-path: inset(0rpx 30rpx 30rpx 0rpx);
    }

    50% {
      clip-path: inset(0rpx 150rpx 150rpx 0rpx);
      -webkit-clip-path: inset(0rpx 150rpx 150rpx 0rpx);
    }

    100% {
      transform: rotate(1turn);
      clip-path: inset(0rpx 30rpx 30rpx 0rpx);
      -webkit-clip-path: inset(0rpx 30rpx 30rpx 0rpx);
    }
  }

  @keyframes animateHex {
    0% {
      transform: scale(1.02);
    }

    20%,
    50% {
      transform: scale(0.6);
      opacity: 0;
    }

    65% {
      transform: scale(1.02);
      opacity: 1;
    }
  }
</style>
