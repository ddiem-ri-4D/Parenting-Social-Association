import vi from './translations/vi.json'
import en from './translations/en.json'

export default {
  target: 'server',
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'PSA',
    htmlAttrs: {
      lang: 'vi-VI',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'PSA - Cộng đồng mạng xã hội phụ huynh của trường học',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // server
  server: {
    port: 4000,
    host: '127.0.0.1',
  },

  // router
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'edit-profile',
        path: '/edit-profile',
        component: resolve(__dirname, 'pages/profile/edit.vue'),
      })
      routes.push({
        name: 'change-password',
        path: '/change-password',
        component: resolve(__dirname, 'pages/profile/change-password.vue'),
      })
      routes.push({
        name: 'login-admin',
        path: '/admin',
        component: resolve(__dirname, 'pages/admin/login.vue'),
      })
      routes.push({
        name: 'dashboard',
        path: '/admin/dashboard',
        component: resolve(__dirname, 'pages/admin/dashboard.vue'),
      })
      routes.push({
        name: 'parents',
        path: '/admin/parents',
        component: resolve(__dirname, 'pages/admin/users/parents.vue'),
      })
      routes.push({
        name: 'teachers',
        path: '/admin/teachers',
        component: resolve(__dirname, 'pages/admin/users/teachers.vue'),
      })
    },
  },

  css: ['@/assets/font/font.css', '@/assets/icon/css/all.min.css', '@/assets/less/all.less'],

  // loading custom
  loading: '~/components/loading.vue',

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    {
      src: '~/plugins/Icon.js',
    },
    {
      src: '~/plugins/vue-cookie.js',
    },
    {
      src: '~/plugins/VueFlickity.js',
      ssr: false,
    },
    {
      src: '~/plugins/emoji.js',
      ssr: false,
    },
    {
      src: '~/plugins/show-more.js',
      ssr: false,
    },
    {
      src: '~/plugins/lightbox/lightbox.js',
      ssr: false,
    },
    {
      src: '~/plugins/loading/loading.js',
      ssr: false,
    },
    {
      src: '~/plugins/scroll-loader.js',
      ssr: false,
    },
    {
      src: '~/plugins/socket.js',
      ssr: false,
    },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/eslint-module'],

  modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'nuxt-socket-io', 'nuxt-i18n'],

  //modules: ['@nuxtjs/axios', '@nuxtjs/auth-next', 'nuxt-socket-io', 'svg-to-vue-component/nuxt', 'nuxt-i18n'],

  // devModules: [
  //   'svg-to-vue-component/nuxt'
  // ],
  
  // nuxt socket io
  io: {
    // module options
    warnings: false,
    sockets: [
      {
        url: 'https://thepsa.herokuapp.com',
      },
    ],
  },

  // translation
  i18n: {
    locales: [
      {
        code: 'vi',
      },
      {
        code: 'en',
      },
    ],
    strategy: 'no_prefix',
    defaultLocale: 'vi',
    detectBrowserLanguage: {
      useCookie: true,
      onlyOnRoot: true,
    },
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        vi,
        en,
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: true,
    extractCSS: true,
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },

  // authentication
  auth: {
    rewriteRedirects: true,
    redirect: false,
    strategies: {
      local: {
        token: {
          property: 'token',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: {
            url: '/api/auth/login',
            method: 'post',
          },
          logout: true,
          user: {
            url: '/api/auth/user',
            method: 'get',
          },
        },
      },

      admin: {
        scheme: 'local',
        token: {
          property: 'token',
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: {
            url: '/admin/login',
            method: 'post',
          },
          logout: true,
          user: {
            url: '/api/auth/user',
            method: 'get',
          },
        },
      },
    },
  },
}
