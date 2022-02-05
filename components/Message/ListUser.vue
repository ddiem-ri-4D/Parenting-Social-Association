<template>
  <div class="list-user">
    <div class="top">
      <i class="fal fa-edit icon" @click="handleOpenModal"></i>
    </div>
    <div class="users">
      <nuxt-link v-for="(item, index) in $auth.user.userChat" :key="index" :to="/message/ + item._id" class="users__item">
        <div class="users__item-avt">
          <img v-if="item.avatar" :src="item.avatar" alt="avatar" />
          <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
        </div>
        <div class="users__item-info">
          <p class="name">{{ item.userName }}</p>
          <p class="last-mess"></p>
        </div>
      </nuxt-link>

      <a-modal v-model="visible" centered class="modal-new-message" :title="$t('Tin nhắn mới')" :footer="false" @cancek="handleCancel">
        <template slot="closeIcon">
          <i class="fal fa-times icon"></i>
        </template>
        <div class="search">
          <p>{{ $t('Tới') }}:</p>
          <input v-model="search" type="text" class="search-input" :placeholder="$t('Tìm kiếm')" @input="onInput" />
        </div>
        <div class="suggests">
          <div v-if="searching">
            <a-skeleton v-for="index in 5" :key="index" active avatar :paragraph="{ rows: 1 }" />
          </div>
          <nuxt-link v-for="(item, index) in listSearch" v-else :key="index" :to="`/message/${item._id}`" class="suggests__item">
            <div class="suggests__item-avt">
              <img v-if="item.avatar" :src="item.avatar" alt="avatar" />
              <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
            </div>
            <p class="suggests__item-name">{{ item.userName }}</p>
          </nuxt-link>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default() {
        return []
      },
    },
  },

  data() {
    return {
      listSearch: this.users || [],
      visible: false,
      search: '',
      searching: false,
    }
  },

  watch: {
    users(value) {
      this.listSearch = value
    },
  },

  methods: {
    handleOpenModal() {
      this.visible = true
    },

    handleCancel() {},

    onInput() {
      const cache = this.search
      this.searching = true
      setTimeout(() => {
        if (cache === this.search) {
          this.searching = false
          this.listSearch = this.users.filter((item) => encodeURI(item.userName.toLowerCase()).includes(encodeURI(this.search)))
        }
      }, 500)
    },
  },
}
</script>
