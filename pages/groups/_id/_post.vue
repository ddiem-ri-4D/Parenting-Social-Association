<template>
  <LoadingView v-if="$fetchState.pending" />
  <main v-else class="post-detail">
    <div class="container">
      <div class="post" :style="deck.image.length === 0 && 'grid-template-columns: 1fr'">
        <div v-if="deck.image.length > 0" class="post__img">
          <client-only>
            <Lightbox :cells="3" :items="deck.image"></Lightbox>
          </client-only>
        </div>

        <div class="post__content">
          <div class="post__content-info">
            <div class="avt">
              <img v-if="deck.owner.avatar" :src="deck.owner.avatar" alt="avatar" />
              <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
            </div>
            <div class="name-time">
              <nuxt-link v-if="deck.owner._id === $auth.user._id" to="/profile">{{ deck.owner.userName }}</nuxt-link>
              <nuxt-link v-else :to="'/profile/' + deck.owner._id">{{ deck.owner.userName }}</nuxt-link>
              <p>{{ deck.date }}</p>
            </div>
            <div class="option">
              <ThreeDot @click.native="handleMenu" />
              <div ref="menu" class="menu">
                <div v-if="deck.owner._id === $auth.user._id" class="menu__item">
                  <a-icon type="edit" />
                  {{ $t('Chỉnh sửa') }}
                </div>
                <div v-if="deck.owner._id === $auth.user._id" class="menu__item">
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

          <div class="post__content-content">
            <client-only>
              <vue-show-more-text
                :text="deck.content"
                :lines="8"
                :more-text="$t('Xem thêm')"
                :less-text="$t('Thu gọn')"
                additional-anchor-css="color: #EA4C89"
                additional-container-css="padding: initial"
              />
            </client-only>
          </div>

          <div v-if="deck.reviews.length > 0" ref="comments" class="comments">
            <div v-for="(item, index) in postComments" :key="index" class="comments__item">
              <div class="comments__item-avt">
                <img v-if="item.user.avatar" :src="item.user.avatar" alt="avatar" />
                <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
              </div>
              <div class="comments__item-content">
                <nuxt-link v-if="item.user._id === $auth.user._id" to="/profile" class="name">
                  {{ item.user.userName }}
                </nuxt-link>
                <nuxt-link v-else :to="'/profile/' + item.user._id" class="name">{{ item.user.userName }}</nuxt-link>
                <div class="body" v-html="item.body"></div>
              </div>
            </div>
            <p v-if="postComments.length < deck.reviews.length" class="comments__btn" @click="showMore">Hiển thị thêm</p>
          </div>

          <div ref="fixedBar" class="post__content-fixed">
            <div class="bar">
              <div class="bar__item" @click="handleLike()">
                <a-icon v-if="deck.like.indexOf($auth.user._id) === -1" type="heart" class="bar__item-icon" />
                <a-icon v-else type="heart" class="bar__item-icon" style="color: #d7443e" theme="filled" />
                <p>{{ deck.like.length }} {{ $t('Yêu thích') }}</p>
              </div>
              <div class="bar__item">
                <a-icon type="message" class="bar__item-icon" />
                <p>{{ deck.reviews.length }} {{ $t('Bình luận') }}</p>
              </div>
              <div class="bar__item">
                <a-icon type="save" class="bar__item-icon" />
                <p v-if="$auth.user.deckShare.map((item) => item._id).indexOf(deck._id) === -1">{{ $t('Lưu bài viết') }}</p>
                <p v-else>{{ $t('Bỏ lưu') }}</p>
              </div>
            </div>

            <div class="comment">
              <input v-model="body" type="text" class="comment__input" :placeholder="$t('Viết bình luận')" />
              <i class="fas fa-paper-plane icon" @click="onAddReview"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ThreeDot from '@/components/Icon/ThreeDot'
export default {
  components: {
    ThreeDot,
  },

  data() {
    return {
      deck: {},
      postComments: [],
      body: '',
      current: 1,
      pageSize: 3,
    }
  },

  async fetch() {
    try {
      const result = await this.$axios.$get('/groups/deck/' + this.$route.params.post)
      if (result.success) {
        this.deck = result.deck
        this.showMore()
      }
    } catch (error) {
      console.error(error)
    }
  },

  created() {
    this.socket.emit('Created', {
      user: this.$auth.user.userName,
    })

    this.socket.on('user-comment', (data) => {
      if (data.idPost === this.deck._id) {
        this.deck.reviews.push({
          body: data.bd,
          user: {
            _id: data.id,
            userName: data.user,
            avatar: data.avatar,
          },
        })
      }
    })
  },

  mounted() {
    // Kiểm tra nếu DOM đã có thì thêm padding và clear Interval
    const handlePadding = setInterval(() => {
      if (this.$refs.comments !== undefined) {
        this.$refs.comments.style.paddingBottom = `${this.$refs.fixedBar.clientHeight + 8}px`
        clearInterval(handlePadding)
      }
    }, 500)

    this.$nextTick(() => {
      document.addEventListener('click', (e) => {
        if (this.$refs.menu) {
          e.preventDefault()
          this.$refs.menu.classList.remove('active')
        }
      })
    })
  },

  methods: {
    async handleLike() {
      try {
        const data = new FormData()
        data.append('groupId', this.$route.params.id)

        const result = await this.$axios.$post('/decks/group/' + this.$route.params.post, data)
        if (result.success) {
          this.fetchLike()
        }
      } catch (error) {
        console.error(error)
      }
    },

    async fetchLike() {
      try {
        const result = await this.$axios.$get('/groups/deck/' + this.$route.params.post)
        this.deck.like = result.deck.like
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
            idPost: this.deck._id,
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

    handleMenu() {
      event.stopPropagation()
      this.$refs.menu.classList.toggle('active')
    },

    showMore() {
      const startIndex = 0
      let endIndex = this.pageSize * this.current
      if (endIndex > this.deck.reviews.length) {
        endIndex = this.deck.reviews.length
      } else {
        this.current += 1
      }
      this.postComments = this.deck.reviews.slice(startIndex, endIndex)
    },
  },
}
</script>
