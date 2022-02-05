<template>
  <div>
    <section>
      <div class="info">
        <div class="info__bg">
          <img v-if="group.bg" :src="group.image" alt="background group" />
          <img v-else src="~/assets/img/group-bg.jpg" alt="background group default" />
        </div>
        <div class="info__detail">
          <p class="info__detail-name">{{ group.name }}</p>
          <div class="info__detail-detail">
            <div class="item">{{ group.decks.length }} {{ $t('bài viết') }}</div>
            <div class="item">{{ group.users.length }} {{ $t('thành viên') }}</div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="tab">
        <nuxt-link :to="'/groups/' + $route.params.id">{{ $t('Bài viết') }}</nuxt-link>
        <nuxt-link :to="'/groups/' + $route.params.id + '/member'">{{ $t('Thành viên') }}</nuxt-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      default() {
        return {}
      },
    },
  },
}
</script>
