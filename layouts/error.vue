<template>
  <div class="page-error">
    <div class="contain">
      <div class="contain__img">
        <img src="~/assets/img/404.jpg" alt="Page not found" />
      </div>
      <div class="contain__text">
        <span class="contain__text-color">Oopps!</span>
        <span>Page not found...</span>
      </div>
      <div class="contain__btn">
        <a-button type="primary" @click="backToHome"> Trở về trang chủ </a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',

  methods: {
    backToHome() {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="less" scoped>
@import '/assets/less/core/variables.less';
@import '/assets/less/core/mixins.less';
.page-error {
  height: 100vh;
  width: 100%;
  background: @bg-white;

  .contain {
    padding: 0 15px;
    max-width: 800px;
    width: 100%;
    .mid();

    &__img {
      padding: 0;

      img {
        height: auto;
      }
    }

    &__text {
      font-size: 32px;
      text-align: center;
      margin: 16px 0;

      &-color {
        color: @color-default;
      }
    }

    &__btn {
      display: flex;
      justify-content: center;
    }
  }
}

.mobile({

.page-error {
  .contain {
    &__text {
      font-size: 24px;
    }
  }
}
});
</style>
