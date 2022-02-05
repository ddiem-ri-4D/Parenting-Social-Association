<template>
  <div class="app">
    <Header />
    <NavMenu />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Layout/Header'
import Footer from '@/components/Layout/Footer'
import NavMenu from '@/components/Layout/NavMenu'

export default {
  components: {
    Header,
    Footer,
    NavMenu,
  },

  middleware: 'auth-user',
}
</script>
