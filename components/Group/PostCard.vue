<template>
  <div class="post-card">
    <div class="actor">
      <div class="actor__avt">
        <img v-if="post.owner.avatar" :src="post.owner.avatar" alt="Avatar" />
        <img v-else src="~/assets/img/avatar-default.png" alt="" />
      </div>
      <div class="actor__name">
        <div class="actor__name-text">
          <nuxt-link v-if="post.owner._id === $auth.user._id" to="/profile">{{ post.owner.userName }}</nuxt-link>
          <nuxt-link v-else :to="'/profile/' + post.owner._id">{{ post.owner.userName }}</nuxt-link>
        </div>
        <div class="actor__name-time">{{ post.date }}</div>
      </div>
      <div class="actor__action">
        <ThreeDot @click.native="handleMenu" />
        <div ref="menu" class="menu">
          <div v-if="deck.owner._id === $auth.user._id" class="menu__item">
            <a-icon type="edit" />
            {{ $t('Chỉnh sửa') }}
          </div>
          <div v-if="deck.owner._id === $auth.user._id" class="menu__item" @click="handleDelete">
            <a-icon type="delete" />
            {{ $t('Xóa bài viết') }}
          </div>
          <div class="menu__item">
            <a-icon type="alert" />
            {{ $t('Báo cáo vi phạm') }}
          </div>
        </div>
      </div>
    </div>

    <div class="image">
      <client-only>
        <Lightbox :cells="3" :items="post.image"></Lightbox>
      </client-only>
    </div>

    <div class="content">
      <client-only>
        <vue-show-more-text
          :text="post.content"
          :lines="4"
          :more-text="$t('Xem thêm')"
          :less-text="$t('Thu gọn')"
          additional-anchor-css="color: #EA4C89"
          additional-container-css="padding: initial"
        />
      </client-only>
    </div>

    <div class="bar">
      <div class="bar__item" @click="handleLike(post._id)">
        <a-icon v-if="like.indexOf($auth.user._id) === -1" type="heart" class="bar__item-icon" />
        <a-icon v-else type="heart" class="bar__item-icon" style="color: #d7443e" theme="filled" />
        <p>{{ like.length }} {{ $t('Yêu thích') }}</p>
      </div>
      <nuxt-link :to="`/groups/${$route.params.id}/${post._id}`" class="bar__item">
        <a-icon type="message" class="bar__item-icon" />
        <p>{{ post.reviews.length }} {{ $t('Bình luận') }}</p>
      </nuxt-link>
      <div class="bar__item">
        <a-icon type="save" class="bar__item-icon" />
        <p>{{ $t('Lưu bài viết') }}</p>
      </div>
    </div>

    <div v-if="post.reviews.length > 0" class="comments">
      <div v-for="(item, index) in postComments" :key="index" class="comments__item">
        <div class="comments__item-avt">
          <img v-if="item.user.avatar" :src="item.user.avatar" alt="avatar" />
          <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
        </div>
        <div class="comments__item-content">
          <nuxt-link v-if="item.user._id === $auth.user._id" to="/profile" class="name">{{ item.user.userName }}</nuxt-link>
          <nuxt-link v-else :to="'/profile/' + item.user._id" class="name">{{ item.user.userName }}</nuxt-link>
          <div class="body" v-html="item.body"></div>
        </div>
      </div>
      <p v-if="postComments.length < post.reviews.length" class="comments__btn" @click="showMore">{{ $t('Hiển thị thêm') }}</p>
    </div>

    <div class="comment">
      <input v-model="body" type="text" class="comment__input" :placeholder="$t('Viết bình luận')" />
      <i class="fas fa-paper-plane icon" @click="onAddReview"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    deck: {
      type: Object,
      default() {
        return {}
      },
    },
  },

  data() {
    return {
      post: this.deck,
      like: this.deck.like,
      body: '',
      postComments: [],
      current: 1,
      pageSize: 3,
    }
  },

  watch: {
    deck(value) {
      this.post = value
    },
  },

  created() {
    this.socket.emit('Created', {
      user: this.$auth.user.userName,
    })

    this.socket.on('user-comment', (data) => {
      if (data.idPost === this.post._id) {
        this.post.reviews.push({
          body: data.bd,
          user: {
            _id: data.id,
            userName: data.user,
            avatar: data.avatar,
          },
        })
      }
    })

    this.showMore()
  },

  methods: {
    handleMenu() {
      event.stopPropagation()
      this.$refs.menu.classList.toggle('active')
    },

    handleDelete() {},

    async handleLike(id) {
      try {
        const data = new FormData()
        data.append('groupId', this.$route.params.id)

        const result = await this.$axios.$post('/decks/group/' + id, data)
        if (result.success) {
          this.fetchLike(id)
        }
      } catch (error) {
        console.error(error)
      }
    },

    async fetchLike(id) {
      try {
        const result = await this.$axios.$get('/groups/deck/' + id)
        this.like = result.deck.like
      } catch (error) {
        console.error(error)
      }
    },

    async onAddReview() {
      if (this.body) {
        try {
          this.socket.emit('user-comment', {
            bd: this.body,
            user: this.$auth.user.userName,
            avatar: this.$auth.user.avatar,
            id: this.$auth.user._id,
            idPost: this.post._id,
          })

          const data = new FormData()
          data.append('body', this.body)
          data.append('groupId', this.$route.params.id)

          const response = await this.$axios.$post(`/reviews/group/${this.deck._id}`, data)

          if (response.success) {
            this.body = null
          }
        } catch (err) {
          console.error(err)
        }
      }
    },

    showMore() {
      const startIndex = 0
      let endIndex = this.pageSize * this.current

      if (endIndex > this.post.reviews.length) {
        endIndex = this.post.reviews.length
      } else {
        this.current += 1
      }

      this.postComments = this.post.reviews.slice(startIndex, endIndex)
    },
  },
}
</script>
