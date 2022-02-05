<template>
  <LoadingView v-if="$fetchState.pending" />
  <main v-else class="group member">
    <div class="contain-define">
      <GroupNav />
      <div class="group-content">
        <div class="container">
          <GroupTop :group="group" />
          <section>
            <div class="search">
              <div class="search__contain">
                <input v-model="search" type="text" :placeholder="$t('Tìm kiếm thành viên trong nhóm')" />
                <i class="fal fa-search search-icon" @click="onSearch"></i>
              </div>
            </div>

            <div class="members">
              <div class="members__title">
                <p>{{ $t('Giáo viên') }}</p>
                <sup>{{ teachers.length }}</sup>
              </div>

              <div v-if="teachers.length !== 0" class="members__list">
                <div v-for="(item, index) in teachers" :key="index" class="members__list-item">
                  <div class="avt">
                    <img v-if="item.avatar" :src="item.avatar" alt="avatar" />
                    <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
                  </div>

                  <div class="info">
                    <nuxt-link :to="'/profile/' + item._id" class="info__name"> {{ item.userName }} </nuxt-link>
                    <div class="info__subject">{{ $t('Giáo viên môn') }} {{ item.tag }}</div>
                    <div class="info__phone">{{ item.phone }}</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="members parent">
              <div class="members__title">
                <p>{{ $t('Phụ huynh học sinh') }}</p>
                <sup>{{ parents.length }}</sup>
              </div>

              <div class="members__list">
                <div v-for="(item, index) in parents" :key="index" class="members__list-item">
                  <div class="avt">
                    <img v-if="item.avatar" :src="item.avatar" alt="avatar" />
                    <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
                  </div>

                  <div class="info">
                    <nuxt-link :to="'/profile/' + item._id" class="info__name"> {{ item.userName }} </nuxt-link>
                    <div class="info__child">{{ $t('PH em') }} {{ item.nameChild }}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import GroupNav from '@/components/Group/GroupNav.vue'
import GroupTop from '@/components/Group/GroupTop.vue'

export default {
  components: {
    GroupNav,
    GroupTop,
  },

  data() {
    return {
      search: '',
      teachers: [],
      parents: [],
    }
  },

  async fetch() {
    if (this.$store.getters.getGroup._id !== this.$route.params.id) {
      await this.$store.dispatch('setGroup', this.$route.params.id)
    }
    this.teachers = this.group.users.filter((item) => item.role === 'teacher')
    this.parents = this.group.users.filter((item) => item.role === 'parent')
  },

  head() {
    return {
      title: this.$store.getters.getGroup.name + ' | PSA ',
    }
  },

  computed: {
    group() {
      return this.$store.getters.getGroup
    },
  },

  methods: {
    onSearch() {
      this.teachers = this.group.users.filter(
        (item) => item.role === 'teacher' && encodeURI(item.userName.toLowerCase()).includes(encodeURI(this.search))
      )
      this.parents = this.group.users.filter(
        (item) => item.role === 'parent' && encodeURI(item.userName.toLowerCase()).includes(encodeURI(this.search))
      )
    },
  },
}
</script>
