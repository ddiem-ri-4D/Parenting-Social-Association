<template>
  <main class="main-wrapper notification">
    <div class="container">
      <h1>{{ $t('Thông báo của bạn') }}</h1>
      <ul class="notifications">
        <li v-for="(item, index) in notis" :key="index" class="notifications__item">
          <nuxt-link v-if="item.type === 'post' && item.groupId" :to="`/groups/${item.groupId._id}/${item.postId}`">
            <i class="fal fa-users icon"></i>
            <p>
              <b>{{ item.creator }}</b> {{ $t('vừa đăng bài viết mới vào') }} <b>{{ item.groupName }}</b>
            </p>
          </nuxt-link>
          <nuxt-link v-else-if="item.type === 'post' && !item.groupId" :to="`/post/${item.postId}`">
            <i class="fal fa-users icon"></i>
            <p>
              <b>{{ item.creator }}</b> {{ $t('vừa đăng bài viết mới vào') }} <b>{{ item.groupName }}</b>
            </p>
          </nuxt-link>
          <nuxt-link v-else-if="item.type === 'like' && item.groupId" :to="`/groups/${item.groupId._id}/${item.postId}`">
            <i class="fas fa-heart-circle icon"></i>
            <p>
              <b>{{ item.creator }}</b> {{ $t('và người khác đã thích bài viết của bạn', { count: item.userLike.length - 1 }) }}
            </p>
          </nuxt-link>
          <nuxt-link v-else-if="item.type === 'like' && !item.groupId" :to="`/post/${item.postId}`">
            <i class="fas fa-heart-circle icon"></i>
            <p>
              <b>{{ item.creator }}</b> {{ $t('và người khác đã thích bài viết của bạn', { count: item.userLike.length - 1 }) }}
            </p>
          </nuxt-link>
          <nuxt-link v-else-if="item.type === 'comment' && item.groupId" :to="`/groups/${item.groupId._id}/${item.postId}`">
            <i class="fal fa-comment-alt icon"></i>
            <p>
              <b>{{ item.creator }}</b> {{ $t('đã bình luận trong bài viết của bạn') }}
            </p>
          </nuxt-link>
          <nuxt-link v-else-if="item.type === 'comment' && !item.groupId" :to="`/post/${item.postId}`">
            <i class="fal fa-comment-alt icon"></i>
            <p>
              <b>{{ item.creator }}</b> {{ $t('đã bình luận trong bài viết của bạn') }}
            </p>
          </nuxt-link>
        </li>
      </ul>
      <p v-if="notis.length < noti.length" class="show-more" @click="showMore">{{ $t('Hiển thị thêm') }}</p>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pageSize: 10,
      current: 1,
      loadMore: false,
      notis: [],
    }
  },

  head() {
    return {
      title: this.$t('Thông báo của bạn') + ' | PSA ',
    }
  },

  computed: {
    noti() {
      return this.$auth.user.userNotification.slice().reverse()
    },
  },

  mounted() {
    this.showMore()
  },

  methods: {
    showMore() {
      const startIndex = 0
      let endIndex = this.pageSize * this.current

      if (endIndex > this.noti.length) {
        endIndex = this.noti.length
        this.loadMore = true
      } else {
        this.current += 1
      }

      this.notis = this.noti.slice(startIndex, endIndex)
    },
  },
}
</script>
