<template>
  <main class="group main">
    <div class="contain-define">
      <GroupNav />
      <div class="container">
        <div class="width-post">
          <!-- <PostCard v-for="index in 5" :key="index" :images="list2" /> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GroupNav from '@/components/Group/GroupNav.vue'
// import PostCard from '@/components/Post/PostCard.vue'

export default {
  components: {
    GroupNav,
    // PostCard,
  },

  head() {
    return {
      title: this.$t('Nhóm') + ' | PSA ',
    }
  },
}
</script>
