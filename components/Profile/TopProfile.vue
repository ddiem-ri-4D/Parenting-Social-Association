<template>
  <section class="profile__main">
    <div class="container">
      <div class="profile__main-bg">
        <img src="~/assets/img/bg.jpg" alt="PSA" />
      </div>
      <div class="profile__main-user">
        <div class="contain">
          <div class="avatar">
            <img v-if="$auth.user.avatar" :src="$auth.user.avatar" alt="avatar" />
            <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
          </div>
        </div>
        <div class="info">
          <div class="info__name">{{ $auth.user.userName }}</div>
        </div>
        <div class="edit">
          <nuxt-link to="/profile">
            <span class="edit__text"> {{ $t('Trở về trang cá nhân') }}</span>
            <span class="edit__icon"><a-icon type="rollback" /></span>
          </nuxt-link>
        </div>
      </div>
      <div class="nav-edit">
        <nuxt-link to="/edit-profile">
          {{ $t('Chỉnh sửa thông tin') }}
        </nuxt-link>
        <nuxt-link to="/change-password">
          {{ $t('Đổi mật khẩu') }}
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
