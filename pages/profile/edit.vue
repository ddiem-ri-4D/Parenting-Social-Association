<template>
  <main class="profile edit-profile">
    <TopProfile />
    <section class="edit">
      <div class="container">
        <div class="contain">
          <a-form-model :model="form">
            <a-form-model-item>
              <label for=""> {{ $t('Họ tên') }}</label>
              <a-input v-model="form.userName" :placeholder="$t('Nhập họ tên')" size="large"> </a-input>
            </a-form-model-item>

            <a-form-model-item>
              <label for=""> {{ $t('Tên học sinh') }}</label>
              <a-input v-model="form.nameChild" :placeholder="$t('Nhập họ tên')" size="large"> </a-input>
            </a-form-model-item>

            <a-form-model-item>
              <label for=""> {{ $t('Mã số học sinh') }}</label>
              <a-input v-model="form.userID" :placeholder="$t('Nhập mã số học sinh')" size="large" disabled> </a-input>
            </a-form-model-item>

            <a-form-model-item>
              <label for=""> {{ $t('Ngày sinh') }}</label>
              <a-input v-model="form.dateOfBirth" placeholder="DD/MM/YYYY" size="large"> </a-input>
            </a-form-model-item>

            <a-form-model-item>
              <label for=""> {{ $t('Số điện thoại') }}</label>
              <a-input v-model="form.phone" :placeholder="$t('Nhập số điện thoại')" size="large"> </a-input>
            </a-form-model-item>

            <a-form-model-item>
              <label for=""> {{ $t('Email') }}</label>
              <a-input v-model="form.email" :placeholder="$t('Nhập email')" size="large"> </a-input>
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
    return {
      btnLoading: false,
      form: {
        userName: this.$auth.user.userName || '',
        nameChild: this.$auth.user.nameChild || '',
        userID: this.$auth.user.userID || '',
        dateOfBirth: this.$auth.user.dateOfBirth || '',
        phone: this.$auth.user.phone || '',
        email: this.$auth.user.email || '',
      },
    }
  },

  head() {
    return {
      title: this.$t('Chỉnh sửa thông tin') + ' | PSA ',
    }
  },

  methods: {
    handleSaveChange() {
      this.btnLoading = true
      this.$axios
        .$patch('/api/auth/user', {
          userName: this.form.userName,
          nameChild: this.form.nameChild,
          dateOfBirth: this.form.dateOfBirth,
          phone: this.form.phone,
          email: this.form.email,
        })
        .then((res) => {
          this.btnLoading = false
          if (res.success) {
            this.$auth.fetchUser()
            this.$notification.success({
              message: this.$t('Thông báo'),
              description: this.$t('Thay đổi thành công'),
            })
          }
        })
        .catch(() => {
          this.btnLoading = false
          this.$notification.error({
            message: this.$t('Thông báo'),
            description: this.$t('Đã có lỗi không mong muốn xảy ra'),
          })
        })
    },
  },
}
</script>
