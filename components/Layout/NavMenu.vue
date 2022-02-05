<template>
  <nav>
    <ul class="menu">
      <li class="menu__item home" :title="$t('Trang chủ')">
        <nuxt-link to="/">
          <i class="fas fa-home-lg icon"></i>
        </nuxt-link>
      </li>
      <li class="menu__item group" :title="$t('Nhóm')">
        <nuxt-link to="/groups">
          <i class="fas fa-users icon"></i>
        </nuxt-link>
      </li>
      <li class="menu__item calendar" :title="$t('Thời khóa biểu')">
        <nuxt-link to="/calendar">
          <i class="fas fa-calendar-alt icon"></i>
        </nuxt-link>
      </li>
      <li class="menu__item message" :title="$t('Tin nhắn')">
        <nuxt-link to="/message">
          <i class="fas fa-paper-plane icon"></i>
        </nuxt-link>
      </li>
      <li class="menu__item camera" :title="$t('Camera')">
        <nuxt-link to="/camera">
          <i class="fas fa-video icon"></i>
        </nuxt-link>
      </li>
      <li class="menu__item notification" :title="$t('Thông báo mới')">
        <nuxt-link to="/events">
          <i class="fas fa-bell icon"></i>
        </nuxt-link>
      </li>
    </ul>
    <div class="logout" :title="$t('Đăng xuất')">
      <i class="fal fa-sign-out icon" @click="logout"></i>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
