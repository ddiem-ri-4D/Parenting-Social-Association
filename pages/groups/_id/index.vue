<template>
  <LoadingView v-if="$fetchState.pending" />
  <main v-else class="group detail">
    <div class="contain-define">
      <GroupNav />
      <div class="group-content">
        <div class="container">
          <GroupTop :group="group" />
          <div class="width-post">
            <WritePost :api="'/groups/decks/' + group._id" @fetchData="fetchPost" />
            <div class="list-post">
              <PostCard v-for="(item, index) in deckGroup" :key="index" :deck="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GroupNav from '@/components/Group/GroupNav.vue'
import GroupTop from '@/components/Group/GroupTop.vue'
import PostCard from '@/components/Group/PostCard.vue'
import WritePost from '@/components/Post/WritePost.vue'

export default {
  components: {
    GroupNav,
    GroupTop,
    PostCard,
    WritePost,
  },

  data() {
    return {
      group: {},
      deckGroup: [],
    }
  },

  async fetch() {
    if (this.$store.getters.getGroup._id !== this.$route.params.id) {
      await this.$store.dispatch('setGroup', this.$route.params.id)
    }
    this.group = this.groupStore
    this.deckGroup = this.groupStore.decks.slice().reverse()
  },

  head() {
    return {
      title: this.$store.getters.getGroup.name + ' | PSA ',
    }
  },

  computed: {
    groupStore() {
      return this.$store.getters.getGroup
    },
  },

  methods: {
    async fetchPost() {
      await this.$store.dispatch('setGroup', this.$route.params.id)
      this.deckGroup = this.groupStore.decks.slice().reverse()
    },
  },
}
</script>
