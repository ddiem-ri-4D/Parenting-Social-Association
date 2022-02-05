<template>
  <main class="main-wrapper message in-chat">
    <div class="box-mess">
      <list-user :users="users" />
      <div class="message__content">
        <div v-if="user" class="message__content-head">
          <nuxt-link class="btn-back" to="/message">
            <i class="fal fa-chevron-left icon"></i>
          </nuxt-link>
          <div class="avt">
            <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
            <img v-else src="~/assets/img/avatar-default.png" alt="" />
          </div>
          <nuxt-link :to="/profile/ + user._id" class="name">{{ user.userName }}</nuxt-link>
        </div>
        <div class="message__content-main">
          <div class="contain-mess">
            <div ref="messScroll" class="contain-mess-scroll">
              <ul v-if="dataLoaded" ref="messBox" class="mess">
                <li v-for="(item, index) in messages" :key="index" class="mess__item" :class="{ to: item.from === $auth.user._id }">
                  <div class="mess__item-avt">
                    <img v-if="item.from === $auth.user._id && $auth.user.avatar" :src="$auth.user.avatar" alt="avatar" />
                    <img v-else-if="item.from === user._id && user.avatar" :src="user.avatar" alt="avatar" />
                    <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
                  </div>
                  <p class="mess__item-content">{{ item.message }}</p>
                </li>
              </ul>
              <a-skeleton v-for="index in 4" v-else :key="index" :loading="true" active avatar> </a-skeleton>
            </div>
          </div>
          <p v-if="typing" class="typing">
            {{ userTyping }} {{ $t('đang soạn tin nhắn') }}
            <span class="dot-typing"></span>
          </p>
          <div class="bar">
            <div class="bar-contain">
              <textarea ref="boxChat" v-model="newMessage" type="text" placeholder="Aa" @input="onChat" />
              <i class="fas fa-paper-plane icon" @click="onSend"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import ListUser from '@/components/Message/ListUser.vue'

export default {
  components: {
    ListUser,
  },

  data() {
    return {
      dataLoaded: false,
      user: {},
      users: [],
      messages: [],
      newMessage: null,
      message: null,
      selectedFile: [],
      body: '',
      userId: this.$auth.user._id,
      friendId: this.$route.params.id,
      typing: false,
      userTyping: '',
    }
  },

  async fetch() {
    if (this.$store.getters.getUserGroup.length === 0) {
      await this.$store.dispatch('setUserGroup')
    }
    this.users = this.$store.getters.getUserGroup
    this.user = this.$store.getters.getUserGroup.filter((item) => item._id === this.$route.params.id)[0]

    try {
      const result = await this.$axios.$get('/message/' + this.$route.params.id)
      if (result.success) {
        this.messages = result.messages
        this.dataLoaded = true
      }
    } catch (error) {
      console.error(error)
    }
  },

  head() {
    return {
      title: this.$t('Tin nhắn') + ' | PSA   ',
    }
  },

  watch: {
    newMessage(value) {
      value
        ? this.socket.emit('typing', { userName: this.$auth.user.userName, userId: this.userId })
        : this.socket.emit('stopTyping', { userName: this.$auth.user.userName, userId: this.userId })
    },
  },

  mounted() {
    const handleScroll = setInterval(() => {
      if (this.$refs.messBox !== undefined) {
        this.$refs.messScroll.scrollTo(0, this.$refs.messBox.scrollHeight)
        clearInterval(handleScroll)
      }
    }, 500)
  },

  created() {
    this.socket.emit('joined', { user: this.userId, friend: this.friendId })
    this.socket.on('chat-message', (data) => {
      if (data.userId === this.friendId) {
        this.messages.push({
          message: data.message,
          to: data.to,
          from: data.from,
        })
      }
    })
    this.socket.on('typing', (data) => {
      if (data.userId === this.friendId) {
        this.typing = true
        this.userTyping = data.userName
      }
    })

    this.socket.on('stopTyping', (data) => {
      if (data.userId === this.friendId) {
        this.typing = false
      }
    })
  },

  methods: {
    onChat() {
      this.$refs.boxChat.style.height = 'auto'
      this.$refs.boxChat.style.height = this.$refs.boxChat.scrollHeight - 14 + 'px'
    },

    async onSend() {
      try {
        this.socket.emit('chat-message', {
          message: this.newMessage,
          to: this.$route.params.id,
          from: this.$auth.user._id,
          userId: this.userId,
          userName: this.$auth.user.userName,
        })
        const data = new FormData()
        data.append('message', this.newMessage)

        const response = await this.$axios.$post(`/message/${this.$route.params.id}`, data)

        if (response.success) {
          await this.messages.push({
            message: this.newMessage,
            to: this.$route.params.id,
            from: this.$auth.user._id,
          })
          this.$refs.messScroll.scrollTo(0, this.$refs.messBox.scrollHeight)
          this.newMessage = null
        }
      } catch (err) {
        console.error(err)
      }
    },
  },
}
</script>
