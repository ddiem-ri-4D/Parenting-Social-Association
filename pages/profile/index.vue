<template>
  <main class="profile">
    <section class="profile__main">
      <div class="container">
        <div class="profile__main-bg">
          <img src="~/assets/img/bg.jpg" alt="PSA" />
          <i class="fas fa-camera-alt icon" @click="handleOpenModalBg"></i>

          <!-- Modal change background -->
          <a-modal v-model="visibleModalChangeBg" :title="$t('Thay đổi ảnh bìa')" class="modal-avatar" @cancel="handleCloseModal">
            <template slot="closeIcon">
              <i class="fal fa-times icon"></i>
            </template>
            <template slot="footer">
              <a-button key="submit" block size="large" type="primary" :disabled="disableBtnBg" @click="handleSubmitBg">
                {{ $t('Lưu thay đổi') }}
              </a-button>
            </template>
            <a-upload
              class="avt-upload avatar-uploader"
              name="file"
              accept=".png, .jpg, .jpeg"
              :multiple="false"
              :custom-request="dummyRequest"
              :show-upload-list="false"
              :before-upload="beforeUpload"
              @change="handleChooseBg"
            >
              <img v-if="imageUrl" class="view-img" :src="imageUrl" alt="background img" />
              <a-button block size="large">
                <a-icon type="upload" />
                {{ $t('Tải ảnh lên') }}
              </a-button>
            </a-upload>
          </a-modal>
        </div>

        <div class="profile__main-user">
          <div class="contain">
            <div class="avatar">
              <img v-if="user.avatar" :src="user.avatar" alt="avatar" />
              <img v-else src="~/assets/img/avatar-default.png" alt="avatar default" />
            </div>

            <div class="contain__icon">
              <i class="fas fa-camera-alt icon" @click="handleOpenModalAvt"></i>
            </div>

            <!-- Modal change avt -->
            <a-modal v-model="visibleModalChangeAvt" :title="$t('Thay đổi ảnh đại diện')" class="modal-avatar" @cancel="handleCloseModal">
              <template slot="closeIcon">
                <i class="fal fa-times icon"></i>
              </template>
              <template slot="footer">
                <a-button key="submit" block size="large" type="primary" :loading="btnLoading" :disabled="disableBtnAvt" @click="handleSubmitAvt">
                  {{ $t('Lưu thay đổi') }}
                </a-button>
              </template>
              <a-upload
                class="avt-upload avatar-uploader"
                name="file"
                accept=".png, .jpg, .jpeg"
                :multiple="false"
                :custom-request="dummyRequest"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChooseAvt"
              >
                <img v-if="imageUrl" class="view-img" :src="imageUrl" alt="avatar" />
                <a-button block size="large">
                  <a-icon type="upload" />
                  {{ $t('Tải ảnh lên') }}
                </a-button>
              </a-upload>
            </a-modal>
          </div>

          <div class="info">
            <h1 class="info__name">{{ user.userName }}</h1>
          </div>
          <div class="edit">
            <nuxt-link to="/edit-profile">
              <span class="edit__text">{{ $t('Chỉnh sửa thông tin') }}</span>
            </nuxt-link>
          </div>
        </div>

        <div class="profile__main-more">
          <div v-if="user.role === 'teacher'" class="short-info">
            <div class="short-info__item">{{ $t('Giáo viên môn') }}: {{ user.tag }}</div>
            <div class="short-info__item">{{ user.phone }}</div>
            <div v-if="user.formTeacher" class="short-info__item">{{ $t('Chủ nhiệm lớp') }}: {{ user.formTeacher }}</div>
          </div>

          <div v-if="user.role === 'parent'" class="short-info">
            <div class="short-info__item">{{ $t('Phụ huynh em') }}: {{ user.nameChild }}</div>
            <div class="short-info__item">{{ $t('Lớp') }}: {{ user.class }}</div>
          </div>
        </div>
      </div>
    </section>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" :tab="user.decks.length + ' ' + $t('Bài viết')">
        <!-- Nếu không có bài viết thì hiện hình mẫu -->
        <ListCardPostProfile v-if="$auth.user.decks.length !== 0" :decks="$auth.user.decks.slice().reverse()" />
        <div v-else class="no-post">
          <div class="container">
            <div class="img">
              <img src="~/assets/img/no-post.png" alt="no post image" />
            </div>
            <p class="text">{{ $t('Bạn chưa có bài viết nào, hãy cùng chia sẻ các hoạt động của mình với mọi người nhé!') }}</p>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="user.deckShare.length + ' ' + $t('Đã lưu')" force-render>
        <ListCardPostProfile v-if="$auth.user.deckShare.length !== 0" :decks="$auth.user.deckShare.slice().reverse()" />
        <div v-else class="no-post">
          <div class="container">
            <div class="img">
              <img src="~/assets/img/no-post.png" alt="no post image" />
            </div>
            <p class="text">{{ $t('Bạn chưa có bài viết đã lưu nào') }}</p>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
  </main>
</template>

<script>
import ListCardPostProfile from '@/components/List/ListCardPostProfile'

export default {
  components: {
    ListCardPostProfile,
  },

  data() {
    return {
      visibleModalChangeAvt: false,
      visibleModalChangeBg: false,
      disableBtnAvt: true,
      disableBtnBg: true,
      imageUrl: '',
      imageUrlBg: '',
      seclectedFile: null,
      fileName: '',
      btnLoading: false,
    }
  },

  head() {
    return {
      title: this.user.userName,
    }
  },

  computed: {
    user() {
      return this.$auth.user
    },
  },

  methods: {
    handleOpenModalAvt() {
      this.visibleModalChangeAvt = true
    },

    handleOpenModalBg() {
      this.visibleModalChangeBg = true
    },

    handleCloseModal() {
      setTimeout(() => {
        this.imageUrl = ''
      }, 200)

      this.visibleModalChangeAvt = false
      this.visibleModalChangeBg = false
      this.disableBtnAvt = true
      this.disableBtnBg = true
    },

    dummyRequest(file) {
      setTimeout(() => {
        file.onSuccess('ok')
      }, 0)
    },

    beforeUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Ảnh phải bé hơn 2MB!')
      }
      return isLt2M
    },

    handleChooseAvt(file) {
      if (file.file.status === 'done') {
        this.disableBtnAvt = false

        this.seclectedFile = file.file.originFileObj
        this.fileName = file.file.originFileObj.name

        this.imageUrl = URL.createObjectURL(file.file.originFileObj)
      }
    },

    handleChooseBg(file) {
      if (file.file.status === 'done') {
        this.disableBtnBg = false

        this.seclectedFile = file.file.originFileObj
        this.fileName = file.file.originFileObj.name

        this.imageUrl = URL.createObjectURL(file.file.originFileObj)
      }
    },

    handleSubmitAvt() {
      this.btnLoading = true

      const formData = new FormData()
      formData.append('image', this.seclectedFile, this.fileName)

      this.$axios
        .$patch('/api/auth/user', formData)
        .then(async (res) => {
          if (res.success) {
            await this.$auth.fetchUser()
            this.btnLoading = false
            this.handleCloseModal()
          }
        })
        .catch((e) => {
          this.btnLoading = false
          console.error(e)
        })
    },

    handleSubmitBg() {
      // will call api
    },
  },
}
</script>
