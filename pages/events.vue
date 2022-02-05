<template>
  <main class="main-wrapper events">
    <div class="container">
      <h1>{{ $t('Danh sách thông báo và sự kiện') }}</h1>
      <a-skeleton v-if="$fetchState.pending" active />
      <div v-for="(item, index) in eventList" v-else :key="index" class="events">
        <div class="events__item">
          <div v-if="item.image && item.image.length !== 0" class="events__item-img">
            <img :src="item.image" alt="image events" />
          </div>
          <div class="events__item-content">
            <p class="title">{{ item.title }}</p>
            <p v-if="item.start || item.end" class="time">
              <span v-if="item.start" class="time-start">{{ item.start }}</span>
              <span v-if="item.end" class="time-end">- {{ item.end }}</span>
            </p>
            <p class="content">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <p v-if="eventList.length < events.length" class="show-more" @click="showMore">{{ $t('Hiển thị thêm') }}</p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      eventList: [],
      pageSize: 10,
      current: 1,
      loadMore: false,
    }
  },

  async fetch() {
    if (this.$store.getters.getEvents.length === 0) {
      await this.$store.dispatch('setEvents')
    }
    this.showMore()
  },

  head() {
    return {
      title: this.$t('Danh sách thông báo và sự kiện') + ' | PSA ',
    }
  },

  computed: {
    events() {
      return this.$store.getters.getEvents
    },
  },

  methods: {
    showMore() {
      const startIndex = 0
      let endIndex = this.pageSize * this.current

      if (endIndex > this.events.length) {
        endIndex = this.events.length
        this.loadMore = true
      } else {
        this.current += 1
      }

      this.eventList = this.events.slice(startIndex, endIndex)
    },
  },
}
</script>
