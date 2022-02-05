<template>
  <div class="login">
    <div class="login-contain container">
      <div class="banner">
        <div class="banner__top">
          <div class="banner__top-logo">
            <img src="~/assets/img/logo.png" alt="PSA" />
          </div>
          <div class="banner__top-title">Parenting Social Association</div>
        </div>
        <div class="banner__bottom">
          <img src="~/assets/img/banner-login.png" alt="PSA login banner" />
        </div>
      </div>

      <div class="form-contain">
        <h1 class="title">{{ $t('Quên mật khẩu') }}</h1>
        <a-form-model ref="ruleForm" :model="form" class="form" :rules="rules">
          <a-form-model-item ref="email" :label="$t('Email')" prop="email" class="form__item">
            <a-input v-model="form.email" @keypress.enter="handleSubmit()"> </a-input>
          </a-form-model-item>

          <a-form-model-item class="back-login">
            <nuxt-link to="/login" style="font-size: 16px">
              <a-icon type="arrow-left" />
              {{ $t('Trở về đăng nhập') }}
            </nuxt-link>
          </a-form-model-item>

          <a-form-model-item>
            <a-button class="form-btn" type="primary" :loading="btnLoading" @click="handleSubmit()">
              {{ $t('Gửi') }}
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'auth',

  data() {
    return {
      btnLoading: false,
      form: {
        email: '',
      },
      rules: {
        email: [
          {
            type: 'email',
            message: this.$t('Vui lòng nhập đúng định dạng email'),
          },
          {
            required: true,
            message: this.$t('Vui lòng nhập email'),
          },
        ],
      },
    }
  },

  head() {
    return {
      title: this.$t('Quên mật khẩu') + ' | PSA ',
    }
  },

  beforeCreate() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const uri = window.location.protocol + '//' + window.location.host + '/reset'
          this.$axios
            .$post('api/auth/lostPassword', {
              email: this.form.email,
              uri,
            })
            .then((res) => {
              this.btnLoading = false
              if (res.success) {
                this.form.email = ''
                this.$notification.success({
                  message: this.$t('Thông báo'),
                  description: this.$t('Mật khẩu mới đã được gửi về email của bạn, Vui lòng kiểm tra email'),
                })
              }
            })
            .catch((error) => {
              this.btnLoading = false
              if (error.response.status === 404) {
                this.$notification.error({
                  message: this.$t('Thông báo'),
                  description: this.$t('Email không chính xác'),
                })
              } else {
                this.$notification.error({
                  message: this.$t('Thông báo'),
                  description: this.$t('Đã có lỗi không mong muốn xảy ra'),
                })
              }
            })
        }
      })
    },
  },
}
</script>
