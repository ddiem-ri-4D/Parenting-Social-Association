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
        <h1 class="title">{{ $t('Đặt lại mật khẩu') }}</h1>
        <a-form-model ref="ruleForm" :model="form" class="form" :rules="rules">
          <a-form-model-item ref="password" :label="$t('Mật khẩu mới')" prop="password" class="form__item">
            <a-input-password v-model="form.password" :placeholder="$t('Nhập mật khẩu mới')" @keypress.enter="handleSubmit()"> </a-input-password>
          </a-form-model-item>

          <a-form-model-item ref="confirmPassword" prop="confirmPassword" has-feedback class="form__item" :label="$t('Xác nhận mật khẩu mới')">
            <a-input-password
              v-model="form.confirmPassword"
              name="confim"
              :placeholder="$t('Nhập lại mật khẩu mới')"
              @keypress.enter="handleSubmit()"
            >
            </a-input-password>
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
    const validateConfirm = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error(this.$t('Mật khẩu không trùng khớp!')))
      } else {
        callback()
      }
    }

    return {
      btnLoading: false,
      form: {
        password: '',
        confirmPassword: '',
      },
      rules: {
        password: {
          required: true,
          message: this.$t('Vui lòng nhập mật khẩu'),
        },
        confirmPassword: [
          { validator: validateConfirm, trigger: 'change' },
          { required: true, message: this.$t('Vui lòng nhập lại mật khẩu!') },
        ],
      },
    }
  },

  head() {
    return {
      title: this.$t('Đặt lại mật khẩu') + ' | PSA ',
    }
  },

  beforeCreate() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            this.btnLoading = true
            const result = await this.$axios.$post('api/auth/resetPassword/' + this.$route.params.token, {
              password: this.form.password,
              confirmPassword: this.form.confirmPassword,
            })
            if (result.success) {
              this.$notification.success({
                message: this.$t('Thông báo'),
                description: this.$t('Thay đổi thành công'),
              })
              setTimeout(() => {
                this.$router.push('/login')
              }, 500)
            }
            this.btnLoading = false
          } catch (error) {
            this.btnLoading = false
            this.$notification.error({
              message: this.$t('Thông báo'),
              description: this.$t('Đã có lỗi không mong muốn xảy ra'),
            })
          }
        }
      })
    },
  },
}
</script>
