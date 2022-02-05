<template>
  <main class="main-wrapper message">
    <div class="box-mess">
      <list-user ref="users" :users="users" />
      <div class="message__content">
        <div class="message__content-box">
          <div class="skeleton">
            <p class="skeleton-title">{{ $t('Tin nhắn của bạn') }}</p>
            <p class="skeleton-text">{{ $t('Gửi ảnh và tin nhắn riêng tư cho bạn bè') }}</p>
            <button @click="handleOpenModal">{{ $t('Gửi tin nhắn') }}</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import ListUser from '@/components/Message/ListUser.vue'

export default {
  components: {
    ListUser,
  },

  data() {
    return {
      users: [],
    }
  },

  async fetch() {
    if (this.$store.getters.getUserGroup.length === 0) {
      await this.$store.dispatch('setUserGroup')
    }
    this.users = this.$store.getters.getUserGroup
  },

  head() {
    return {
      title: this.$t('Tin nhắn') + ' | PSA   ',
    }
  },

  methods: {
    handleOpenModal() {
      this.$refs.users.handleOpenModal()
    },
  },
}
</script>
