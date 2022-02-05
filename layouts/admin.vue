<template>
  <div class="app admin">
    <a-layout>
      <MenuAdmin :collapsed="collapsed" />
      <a-layout style="overflow-y: auto; height: 100vh">
        <HeaderAdmin :collapsed="collapsed" @handleMenu="handleToggleMenu" />

        <Nuxt />
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import MenuAdmin from '~/components/Layout/MenuAdmin.vue'
import HeaderAdmin from '~/components/Layout/HeaderAdmin.vue'

export default {
  components: {
    MenuAdmin,
    HeaderAdmin,
  },

  middleware: 'auth-admin',

  loading: false,

  data() {
    return {
      collapsed: false,
    }
  },

  head() {
    return {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=0.3, minimum-scale=0.1, maximum-scale=1, user-scalable=1',
        },
      ],
    }
  },

  mounted() {
    this.$nextTick(() => {
      document.body.classList.add('admin-font')
    })
  },

  methods: {
    handleToggleMenu() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>
