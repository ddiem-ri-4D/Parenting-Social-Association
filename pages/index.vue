<template>
  <LoadingView v-if="$fetchState.pending" />
  <main v-else class="main-wrapper home">
    <NavOptionLeft :show="showLeft" />
    <NavOptionRight :show="showRight" />
    <div class="container">
      <div class="width-post">
        <WritePost @fetchData="$fetch" />
        <div class="list-post">
          <PostCard v-for="(item, index) in decks" :key="index" :deck="item" @fetchDelete="fetchDelete" />
          <scroll-loader :loader-method="fetchDeck" :loader-disable="loadMore"> <div class="spinner"></div> </scroll-loader>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import WritePost from '@/components/Post/WritePost'
import PostCard from '@/components/Post/PostCard'
import NavOptionLeft from '@/components/Layout/NavOptionLeft'
import NavOptionRight from '@/components/Layout/NavOptionRight'

export default {
  components: {
    WritePost,
    PostCard,
    NavOptionLeft,
    NavOptionRight,
  },

  data() {
    return {
      showRight: true,
      showLeft: true,
      decks: [],
      loadMore: false,
      pageSize: 5,
      pageNumber: 1,
    }
  },

  async fetch() {
    try {
      this.loadMore = false

      const result = await this.$axios.$get(`/decks?pageSize=${this.pageSize}&pageNumber=1`)
      if (result.success) {
        this.decks = result.decks

        result.decks.length < this.pageSize && (this.loadMore = true)
        this.pageNumber = result.meta.pageNumber
      }
    } catch (error) {
      console.error(error)
    }
  },

  head() {
    return {
      title: this.$t('Trang chủ') + ' | PSA',
    }
  },

  mounted() {
    const _this = this

    // Sau khi DOM được load kiểm tra nếu nhỏ hơn 1200px thì ẩn đi
    this.$nextTick(() => {
      if (document.body.clientWidth < 1200) {
        _this.showLeft = false
      }

      if (document.body.clientWidth < 992) {
        _this.showRight = false
      }

      window.onresize = function () {
        if (document.body.clientWidth < 1200) {
          _this.showLeft = false
        } else {
          _this.showLeft = true
        }

        if (document.body.clientWidth < 992) {
          _this.showRight = false
        } else {
          _this.showRight = true
        }
      }
    })
  },

  methods: {
    async fetchDeck() {
      try {
        const result = await this.$axios.$get(`/decks?pageSize=${this.pageSize}&pageNumber=${this.pageNumber + 1}`)
        if (result.success) {
          this.decks = this.decks.concat(result.decks)

          this.pageNumber = result.meta.pageNumber

          result.decks.length < this.pageSize && (this.loadMore = true)
        }
      } catch (error) {
        console.error(error)
      }
    },

    fetchDelete(id) {
      this.decks = this.decks.filter((item) => item._id !== id)
    },
  },
}
</script>

<style lang="less" scoped>
.loader {
  padding: initial;
}

.spinner {
  width: 50px;
  height: 50px;
  --c: radial-gradient(farthest-side, #ea4c89 92%, #0000);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%, var(--c) 0 50%;
  background-size: 14px 14px;
  background-repeat: no-repeat;
  animation: spinner 1s infinite;
}
@keyframes spinner {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
