<template>
  <div v-if="show" class="nav-option left">
    <div class="group">
      <div class="title">
        <p>{{ $t('Nhóm') }}</p>
        <sup>{{ $auth.user.groups.length }}</sup>
      </div>
      <div class="group__list">
        <div v-for="(item, index) in $auth.user.groups" :key="index" class="group__list-item">
          <div class="image">
            <img v-if="item.image" :src="item.image" alt="avatar group" />
            <img v-else src="~/assets/img/group-avt.jpg" alt="avatar group" />
          </div>
          <div class="name">
            <nuxt-link :to="'/groups/' + item._id">{{ item.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="friend">
      <div class="title">
        <p>{{ $t('Bạn bè') }}</p>
        <sup>5</sup>
      </div>
      <div class="friend__list">
        <div v-for="(item, index) in 16" :key="index" class="friend__list-item">
          <div class="image">
            <img src="~/assets/img/post.jpg" alt="" />
          </div>
          <div class="name">
            <nuxt-link to="user/name">Ba Tít</nuxt-link>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
