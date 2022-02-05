<template>
  <LoadingView v-if="$fetchState.pending" />
  <main v-else class="profile">
    <section class="profile__main">
      <div class="container">
        <div class="profile__main-bg">
          <img src="~/assets/img/bg.jpg" alt="PSA" />
        </div>

        <div class="profile__main-user">
          <div class="contain">
            <div class="avatar">
              <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
              <img v-else src="~/assets/img/avatar-default.png" alt="avatar default" />
            </div>
          </div>

          <div class="info">
            <h1 class="info__name">{{ user.userName }}</h1>
          </div>
        </div>

        <div class="profile__main-more">
          <div v-if="user.role === 'teacher'" class="short-info">
            <div class="short-info__item">{{ $t('Giáo viên môn') }}: {{ user.tag }}</div>
            <div class="short-info__item">{{ user.phone }}</div>
            <div v-if="user.formTeacher" class="short-info__item">{{ $t('Chủ nhiệm lớp') }}: {{ user.formTeacher }}</div>
          </div>

          <div v-if="user.role === 'parent'" class="short-info">
            <div class="short-info__item">{{ $t('Phụ huynh em') }}: {{ user.nameChild }}</div>
            <div class="short-info__item">{{ $t('Lớp') }}: {{ user.class }}</div>
          </div>
          <div class="social">
            <p class="social__contain">
              <span> {{ user.decks.length }} </span>
              {{ $t('Bài viết') }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- Nếu không có bài viết thì hiện hình mẫu -->
    <ListCardPostProfile v-if="user.decks.length !== 0" :decks="user.decks.slice().reverse()" />
    <div v-else class="no-post">
      <div class="container">
        <div class="img">
          <img src="~/assets/img/no-post.png" alt="no post image" />
        </div>
        <p class="text">{{ $t('Bạn chưa có bài viết nào, hãy cùng chia sẻ các hoạt động của mình với mọi người nhé!') }}</p>
      </div>
    </div>
  </main>
</template>

<script>
import ListCardPostProfile from '@/components/List/ListCardPostProfile'

export default {
  components: {
    ListCardPostProfile,
  },

  data() {
    return {
      user: {},
    }
  },

  async fetch() {
    try {
      const result = await this.$axios.$get('/api/auth/' + this.$route.params.id)
      this.user = result.user
    } catch (error) {
      console.error(error)
    }
  },
}
</script>
