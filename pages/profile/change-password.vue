<template>
  <main class="profile edit-profile">
    <TopProfile />
    <section class="edit">
      <div class="container">
        <div class="contain">
          <a-form-model
            ref="ruleForm"
            :rules="rules"
            :model="form"
            label-align="left"
            :label-col="{ md: { span: 8 } }"
            :wrapper-col="{ md: { span: 16 } }"
          >
            <a-form-model-item ref="password" prop="password" :label="$t('Mật khẩu cũ')">
              <a-input-password v-model="form.password" :placeholder="$t('Nhập mật khẩu cũ')" size="large"> </a-input-password>
            </a-form-model-item>

            <a-form-model-item ref="newPassword" prop="newPassword" :label="$t('Mật khẩu mới')">
              <a-input-password v-model="form.newPassword" :placeholder="$t('Nhập mật khẩu mới')" size="large"> </a-input-password>
            </a-form-model-item>

            <a-form-model-item ref="confirm" prop="confirm" has-feedback :label="$t('Xác nhận mật khẩu mới')">
              <a-input-password v-model="form.confirm" name="confim" :placeholder="$t('Nhập lại mật khẩu mới')" size="large"> </a-input-password>
            </a-form-model-item>

            <a-form-model-item :wrapper-col="{ span: 24 }">
              <a-space direction="vertical" align="end" style="width: 100%">
                <a-button type="primary" :loading="btnLoading" size="large" @click="handleSaveChange">
                  {{ $t('Lưu thay đổi') }}
                </a-button>
              </a-space>
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
import TopProfile from '@/components/Profile/TopProfile'
export default {
  components: {
    TopProfile,
  },

  data() {
    const validateConfirm = (rule, value, callback) => {
      if (value !== this.form.newPassword) {
        callback(new Error(this.$t('Mật khẩu không trùng khớp!')))
      } else {
        callback()
      }
    }

    return {
      btnLoading: false,
      form: {
        password: '',
        newPassword: '',
        confirm: '',
      },

      rules: {
        password: {
          required: true,
          message: this.$t('Vui lòng nhập mật khẩu cũ!'),
        },
        newPassword: {
          required: true,
          message: this.$t('Vui lòng nhập mật khẩu'),
        },
        confirm: [
          { validator: validateConfirm, trigger: 'change' },
          { required: true, message: this.$t('Vui lòng nhập lại mật khẩu!') },
        ],
      },
    }
  },

  head() {
    return {
      title: this.$t('Đổi mật khẩu') + ' | PSA ',
    }
  },

  methods: {
    handleSaveChange() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.$axios
            .$patch('/api/auth/user', {
              password: this.form.password,
              newPassword: this.form.newPassword,
            })
            .then((res) => {
              this.btnLoading = false
              if (res.success) {
                this.form = {
                  password: null,
                  newPassword: null,
                  confirm: null,
                }
                this.$notification.success({
                  message: this.$t('Thông báo'),
                  description: this.$t('Thay đổi thành công'),
                })
              }
            })
            .catch((response) => {
              this.btnLoading = false
              this.$notification.error({
                message: this.$t('Thông báo'),
                description: this.$t('Mật khẩu cũ bị sai, vui lòng kiểm tra lại'),
              })
            })
        }
      })
    },
  },
}
</script>
