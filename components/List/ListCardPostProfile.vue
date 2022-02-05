<template>
  <section class="list-card">
    <div class="container">
      <nuxt-link v-for="(item, index) in decks" :key="index" :to="'/post/' + item._id" class="card">
        <div v-if="item.image.length != 0" class="card__img">
          <img :src="item.image[0]" alt="image post" />
        </div>
        <div v-else class="card__content">
          {{ item.content }}
        </div>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    decks: {
      type: Array,
      default() {
        return []
      },
    },
  },
}
</script>
