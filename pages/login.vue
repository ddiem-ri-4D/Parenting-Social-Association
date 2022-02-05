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
        <h1 class="title">{{ $t('Đăng nhập PSA') }}</h1>
        <a-form-model ref="ruleForm" :model="form" class="form" :rules="rules">
          <a-form-model-item ref="userID" :label="$t('Mã số học sinh')" prop="userID" class="form__item">
            <a-input v-model="form.userID" @keypress.enter="handleSubmit()"> </a-input>
          </a-form-model-item>

          <a-form-model-item ref="password" :label="$t('Mật khẩu')" prop="password" class="form__item">
            <a-input-password v-model="form.password" @keypress.enter="handleSubmit()"> </a-input-password>
          </a-form-model-item>

          <a-form-model-item class="form-forgot">
            <nuxt-link to="/forgot-password">
              {{ $t('Quên mật khẩu') }}
            </nuxt-link>
          </a-form-model-item>

          <a-form-model-item>
            <a-button class="form-btn" type="primary" @click="handleSubmit()">
              {{ $t('Đăng nhập') }}
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
      form: {
        userID: '',
        password: '',
      },
      rules: {
        userID: {
          required: true,
          message: this.$t('Vui lòng nhập mã số học sinh'),
        },
        password: {
          required: true,
          message: this.$t('Vui lòng nhập mật khẩu'),
        },
      },
    }
  },

  head() {
    return {
      title: this.$t('Đăng nhập PSA') + ' | PSA ',
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
            this.$nuxt.$loading.start()

            const result = await this.$auth.loginWith('local', {
              data: {
                userID: this.form.userID,
                password: this.form.password,
              },
            })
            if (result.data.success) {
              this.$nuxt.$loading.finish()
              this.$router.push('/')
            } else {
              this.$nuxt.$loading.finish()
            }
          } catch (error) {
            this.$nuxt.$loading.finish()

            this.$message.error('Incorred ID or password')
          }
        }
      })
    },
  },
}
</script>
