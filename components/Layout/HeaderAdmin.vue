<template>
  <a-layout-header>
    <div class="toggle-menu" @click.prevent="handleToggleMenu">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </div>

    <a-dropdown placement="bottomRight" :trigger="['click']">
      <div class="avatar">
        <div class="avatar__contain">
          <img src="~/assets/img/avatar-default.png" alt="avt" />
        </div>
        <p v-if="$auth.user">{{ $auth.user.email }}</p>
      </div>

      <a-menu slot="overlay">
        <a-menu-item key="profile">
          <a-icon type="user" />
          <span>{{ $t('Trang cá nhân') }}</span>
        </a-menu-item>
        <a-menu-item key="settings">
          <a-icon type="setting" />
          <span>{{ $t('Cài đặt') }}</span>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="logout" @click="logout">
          <a-icon type="logout" />
          <span>{{ $t('Đăng xuất') }}</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>

    <a-dropdown placement="bottomRight" :trigger="['click']">
      <div class="lang">
        <a-icon type="global" />
      </div>

      <a-menu slot="overlay" :selected-keys="[$cookies.get('i18n_redirected')]">
        <a-menu-item key="vi">
          <span @click="changeLang('vi')">{{ $t('Tiếng việt') }}</span>
        </a-menu-item>
        <a-menu-item key="en">
          <span @click="changeLang('en')">{{ $t('Tiếng anh') }}</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </a-layout-header>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleToggleMenu() {
      this.$emit('handleMenu')
    },

    changeLang(lang) {
      this.$i18n.setLocale(lang)
    },

    async logout() {
      await this.$auth.logout()
      this.$router.push('/admin')
    },
  },
}
</script>

<style lang="less" scoped>
@import '/assets/less/core/variables.less';
@import '/assets/less/core/mixins.less';

header {
  height: @h-header-admin;
  position: initial;
  padding-right: 15px;
  padding-left: initial;
  background: @bg-white;
  display: flex;
  align-items: center;

  .toggle-menu {
    font-size: 24px;
    cursor: pointer;
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 15px;
    .hover-bg();
  }

  .avatar {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: auto;
    cursor: pointer;
    padding: 0 10px;
    .hover-bg();

    &__contain {
      .contain-avt(24px);
    }

    p {
      font-size: 16px;
      margin-left: 10px;
    }
  }

  .lang {
    cursor: pointer;
    font-size: 16px;
    height: 100%;
    padding: 0 8px;
    .hover-bg();
  }
}
</style>
