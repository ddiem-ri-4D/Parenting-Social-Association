<template>
  <div v-if="show" class="nav-option right">
    <div class="notification">
      <div class="title">
        <nuxt-link to="/events">{{ $t('Thông báo mới') }}</nuxt-link>
        <sup>{{ eventList.length }}</sup>
      </div>
      <a-skeleton v-if="$fetchState.pending" active title="true" />
      <div v-for="(item, index) in eventList" v-else :key="index" class="notification__list">
        <div class="notification__list-item" @click="handleShowInfo(item)">
          <div class="status"></div>
          <div class="content">{{ item.title }}</div>
        </div>
      </div>
      <p v-if="eventList.length < events.length" class="show-more" @click="showMore">{{ $t('Hiển thị thêm') }}</p>
    </div>

    <!-- modal info notification-->
    <a-modal v-model="visible" class="modal-event" :title="$t('Thông báo')" :footer="false" @cancel="handleCancel">
      <template slot="closeIcon">
        <i class="fal fa-times icon"></i>
      </template>
      <div class="top">
        <div v-if="infoEvent.image && infoEvent.image.length !== 0" class="img-event">
          <img :src="infoEvent.image" alt="image event" />
        </div>
        <div class="top-right">
          <p>{{ infoEvent.title }}</p>
          <span v-if="infoEvent.start"> {{ infoEvent.start }}</span>
          <span v-if="infoEvent.end">- {{ infoEvent.end }}</span>
        </div>
      </div>
      <p>{{ infoEvent.description }}</p>
    </a-modal>

    <!-- <div class="save">
      <div class="title">
        <nuxt-link to="">{{ $t('Đã lưu') }}</nuxt-link>
      </div>
      <div class="save__list">
        <div v-for="(item, index) in 5" :key="index" class="save__list-item">
          <div class="img">
            <img src="~/assets/img/bg.jpg" alt="" />
          </div>
          <div class="content">Hội phụ huynh A12</div>
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

  data() {
    return {
      infoEvent: {},
      visible: false,
      eventList: [],
      pageSize: 3,
      current: 1,
    }
  },

  async fetch() {
    if (this.$store.getters.getEvents.length === 0) {
      await this.$store.dispatch('setEvents')
    }
    this.showMore()
  },

  computed: {
    events() {
      return this.$store.getters.getEvents
    },
  },

  methods: {
    handleShowInfo(event) {
      this.infoEvent = event
      this.visible = true
    },

    handleCancel() {
      this.infoEvent = {}
    },

    showMore() {
      const startIndex = 0
      let endIndex = this.pageSize * this.current

      if (endIndex > this.events.length) {
        endIndex = this.events.length
      } else {
        this.current += 1
      }

      this.eventList = this.events.slice(startIndex, endIndex)
    },
  },
}
</script>
