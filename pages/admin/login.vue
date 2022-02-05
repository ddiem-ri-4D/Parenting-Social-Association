<template>
  <div class="login-admin">
    <div class="contain">
      <a-form-model ref="ruleForm" :model="form" :rules="rules">
        <a-form-model-item>
          <h1>Admin</h1>
        </a-form-model-item>
        <a-form-model-item ref="email" prop="email">
          <a-input v-model="form.email" placeholder="Username" @keypress.enter="handleSubmit">
            <a-icon slot="prefix" type="user" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item ref="password" prop="password">
          <a-input v-model="form.password" type="password" placeholder="Password" @keypress.enter="handleSubmit">
            <a-icon slot="prefix" type="lock" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" block @click.prevent="handleSubmit"> Đăng nhập </a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'auth',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },

      rules: {
        email: {
          required: true,
          message: 'Please enter username!',
        },
        password: {
          required: true,
          message: 'Please enter password!',
        },
      },
    }
  },

  beforeCreate() {
    if (this.$auth.loggedIn) {
      this.$router.push('/admin/dashboard')
    }
  },

  methods: {
    handleSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          try {
            this.$nuxt.$loading.start()

            const result = await this.$auth.loginWith('admin', {
              data: this.form,
            })
            if (result.data.success) {
              this.$nuxt.$loading.finish()
              this.$router.push({ path: '/admin/dashboard' })
            } else {
              this.$nuxt.$loading.finish()
            }
          } catch (error) {
            this.$nuxt.$loading.finish()

            this.$message.error('Incorred username or password')
          }
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '/assets/less/core/variables.less';
.login-admin {
  .contain {
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    background: #fff;
    border-radius: 6px;
    box-shadow: @shadow-1;

    h1 {
      font-size: 32px;
      color: #000;
      text-align: center;
      text-transform: uppercase;
      font-family: pdb;
    }
  }
}
</style>
