<template>
  <header>
    <div class="container-fluid">
      <div class="logo">
        <nuxt-link to="/">
          <img src="~/assets/img/logo.png" alt="PSA" />
        </nuxt-link>
      </div>

      <!-- <div class="search">
        <div class="search__contain">
          <input type="text" class="search__contain-input" :placeholder="$t('Tìm kiếm')" />
          <i class="fal fa-search icon-search"></i>
        </div>
      </div> -->

      <div class="right">
        <div class="search">
          <i class="fal fa-search icon-search"></i>
        </div>

        <a-dropdown placement="bottomRight" :trigger="['click']">
          <div class="lang">
            <a-icon type="global" />
          </div>
          <a-menu slot="overlay" :selected-keys="[$cookies.get('i18n_redirected')]">
            <a-menu-item key="vi">
              <span @click="changeLang('vi')">{{ $t('Tiếng việt') }}</span>
            </a-menu-item>
            <a-menu-item key="en">
              <span @click="changeLang('en')">{{ $t('Tiếng anh') }}</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>

        <a-dropdown placement="bottomRight" :trigger="['click']">
          <div class="noti" @click="(e) => e.preventDefault()">
            <i class="fal fa-bell icon"></i>
          </div>
          <div slot="overlay" class="drop-noti">
            <p class="title">Thông báo của bạn</p>
            <ul class="notis">
              <li v-for="(item, index) in noti" :key="index" class="notis__item">
                <nuxt-link v-if="item.type === 'post' && item.groupId" :to="`/groups/${item.groupId._id}/${item.postId}`">
                  <i class="fal fa-users icon"></i>
                  <p>
                    <b>{{ item.creator }}</b> {{ $t('vừa đăng bài viết mới vào') }} <b>{{ item.groupName }}</b>
                  </p>
                </nuxt-link>
                <nuxt-link v-else-if="item.type === 'post' && !item.groupId" :to="`/post/${item.postId}`">
                  <i class="fal fa-users icon"></i>
                  <p>
                    <b>{{ item.creator }}</b> {{ $t('vừa đăng bài viết mới vào') }} <b>{{ item.groupName }}</b>
                  </p>
                </nuxt-link>
                <nuxt-link v-else-if="item.type === 'like' && item.groupId" :to="`/groups/${item.groupId._id}/${item.postId}`">
                  <i class="fas fa-heart-circle icon"></i>
                  <p>
                    <b>{{ item.creator }}</b> {{ $t('và người khác đã thích bài viết của bạn', { count: item.userLike.length - 1 }) }}
                  </p>
                </nuxt-link>
                <nuxt-link v-else-if="item.type === 'like' && !item.groupId" :to="`/post/${item.postId}`">
                  <i class="fas fa-heart-circle icon"></i>
                  <p>
                    <b>{{ item.creator }}</b> {{ $t('và người khác đã thích bài viết của bạn', { count: item.userLike.length - 1 }) }}
                  </p>
                </nuxt-link>
                <nuxt-link v-else-if="item.type === 'comment' && item.groupId" :to="`/groups/${item.groupId._id}/${item.postId}`">
                  <i class="fal fa-comment-alt icon"></i>
                  <p>
                    <b>{{ item.creator }}</b> {{ $t('đã bình luận trong bài viết của bạn') }}
                  </p>
                </nuxt-link>
                <nuxt-link v-else-if="item.type === 'comment' && !item.groupId" :to="`post/${item.postId}`">
                  <i class="fal fa-comment-alt icon"></i>
                  <p>
                    <b>{{ item.creator }}</b> {{ $t('đã bình luận trong bài viết của bạn') }}
                  </p>
                </nuxt-link>
              </li>
            </ul>
            <nuxt-link class="see-all" to="/notifications">{{ $t('Xem tất cả') }}<i class="fas fa-caret-down icon"></i></nuxt-link>
          </div>
        </a-dropdown>

        <a-dropdown :trigger="['click']" placement="bottomRight">
          <div class="right__item user" @click="(e) => e.preventDefault()">
            <img v-if="$auth.user.avatar" :src="$auth.user.avatar" alt="avatar" />
            <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
          </div>

          <a-menu slot="overlay" class="drop-user">
            <a-menu-item key="0">
              <nuxt-link to="/profile" class="drop-user-item">
                <i class="fas fa-user icon"></i>
                <span>{{ $t('Trang cá nhân') }}</span>
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="1">
              <nuxt-link to="/edit-profile" class="drop-user-item">
                <i class="fas fa-user-cog icon"></i>
                <span>{{ $t('Cài đặt') }}</span>
              </nuxt-link>
            </a-menu-item>
            <a-menu-item key="3" @click="logout">
              <a class="drop-user-item">
                <i class="fal fa-sign-out icon"></i>
                <span>{{ $t('Đăng xuất') }}</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      noti: this.$auth.user.userNotification.slice().reverse().slice(0, 5),
    }
  },

  methods: {
    changeLang(lang) {
      this.$i18n.setLocale(lang)
    },

    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
  },
}
</script>
