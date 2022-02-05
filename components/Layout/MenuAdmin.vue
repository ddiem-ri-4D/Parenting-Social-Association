<template>
  <a-layout-sider v-model="collap" class="admin-menu" :trigger="null" collapsible width="256px">
    <div class="logo">
      <nuxt-link to="/admin/dashboard">
        <img src="~/assets/img/logo.png" alt="PSA Admin" />
        <span v-if="!collap">PSA</span>
      </nuxt-link>
    </div>
    <a-menu :selected-keys="[$route.path]" mode="inline" theme="dark" :inline-collapsed="collap">
      <a-menu-item key="/admin/dashboard" @click="$router.push('/admin/dashboard')">
        <a-icon type="pie-chart" />
        <span> Dashboard </span>
      </a-menu-item>

      <a-menu-item key="/admin/posts" @click="$router.push('/admin/posts')">
        <a-icon type="container" />
        <span> {{ $t('Bài viết') }} </span>
      </a-menu-item>

      <a-sub-menu key="sub1">
        <span slot="title">
          <a-icon type="user" />
          <span> {{ $t('Người dùng') }} </span>
        </span>
        <a-menu-item key="/admin/parents" @click="$router.push('/admin/parents')"> {{ $t('Phụ huynh') }} </a-menu-item>
        <a-menu-item key="/admin/teachers" @click="$router.push('/admin/teachers')"> {{ $t('Giáo viên') }} </a-menu-item>
      </a-sub-menu>

      <a-menu-item key="/admin/groups" @click="$router.push('/admin/groups')">
        <a-icon type="usergroup-add" />
        <span>{{ $t('Nhóm') }}</span>
      </a-menu-item>

      <a-menu-item key="/admin/events" @click="$router.push('/admin/events')">
        <a-icon type="bell" />
        <span>{{ $t('Thông báo') }}</span>
      </a-menu-item>

      <!-- <a-sub-menu key="sub2">
        <span slot="title">
          <a-icon type="bell" />
          <span>{{ $t('Thông báo') }}</span>
        </span>
        <a-menu-item key="/admin/events" @click="$router.push('/admin/events')"> {{ $t('Sự kiện') }} </a-menu-item>
        <a-menu-item key="6"> {{ $t('Thường') }} </a-menu-item>
      </a-sub-menu> -->
    </a-menu>
  </a-layout-sider>
</template>

<script>
export default {
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {}
  },

  computed: {
    collap() {
      return this.collapsed
    },
  },
}
</script>

<style lang="less" scoped>
@import '/assets/less/core/variables.less';
.admin-menu {
  height: 100vh;

  .logo {
    height: @h-header-admin;
    display: flex;
    align-items: center;
    padding-left: 24px;

    a {
      height: 40px;
      display: flex;
      align-items: center;

      img {
        width: auto;
      }

      span {
        font-size: 24px;
        margin-left: 16px;
      }
    }
  }

  a {
    display: inline;
    &:hover {
      color: @text-white !important;
    }
  }
}
</style>
