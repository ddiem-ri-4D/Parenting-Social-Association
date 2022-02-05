<template>
  <div class="write-post" @click="handleOpenModal">
    <div class="avatar">
      <img v-if="$auth.user.avatar" :src="$auth.user.avatar" alt="avatar" />
      <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
    </div>
    <div class="placeholder">{{ $t('Hôm nay bạn ổn không') }}</div>
    <div class="emoji">
      <i class="fas fa-images icon"></i>
      <i class="fas fa-smile icon"></i>
    </div>

    <!-- Modal write post -->
    <a-modal v-model="visibleModal" :title="$t('Bài viết mới')" class="modal-post" width="670px" :footer="false" @cancel="handleCloseModal">
      <template slot="closeIcon">
        <i class="fal fa-times icon"></i>
      </template>

      <div class="user">
        <div class="user__avt">
          <img v-if="$auth.user.avatar" :src="$auth.user.avatar" alt="avatar" />
          <img v-else src="~/assets/img/avatar-default.png" alt="avatar" />
        </div>
        <div class="user__name">{{ $auth.user.userName }}</div>
      </div>
      <div class="content">
        <div ref="contentPost" class="content__text" contenteditable="true" :data-place="$t('Bạn đang nghĩ gì')" @input="changeText"></div>
        <div class="more">
          <div class="img" @click="$refs.image.click()">
            <i class="fas fa-images icon"></i>
          </div>
          <div @click="handleEmoji">
            <i class="fas fa-smile icon"></i>
          </div>
          <VEmojiPicker v-if="showEmoji" @select="selectEmoji" />
        </div>
      </div>

      <!-- upload img -->
      <a-upload
        list-type="picture-card"
        accept=".png, .jpg, .jpeg"
        :multiple="true"
        :custom-request="dummyRequest"
        :file-list="fileList"
        @preview="handlePreview"
        @change="handleChange"
      >
        <button ref="image">click</button>
      </a-upload>

      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <template slot="closeIcon">
          <i class="fal fa-times icon"></i>
        </template>
        <img alt="example" style="width: 100%" :src="previewImage" />
      </a-modal>

      <a-button key="submit" block size="large" type="primary" :loading="btnLoading" :disabled="disableBtn" @click="handleSubmit">
        {{ $t('Đăng bài') }}
      </a-button>
    </a-modal>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  props: {
    api: {
      type: String,
      default: '/decks',
    },
  },

  data() {
    return {
      visibleModal: false,
      disableBtn: true,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      showEmoji: false,
      btnLoading: false,
    }
  },

  methods: {
    handleOpenModal() {
      this.visibleModal = true
    },

    handleCloseModal() {
      this.visibleModal = false
      this.fileList = []
      this.$refs.contentPost.innerHTML = ''
      this.showEmoji = false
      this.disableBtn = true
    },

    handleEmoji() {
      this.showEmoji = !this.showEmoji
    },

    handleCancel() {
      this.previewVisible = false
    },

    changeText(e) {
      if (e.target.innerHTML !== '' || this.fileList.length !== 0) {
        this.disableBtn = false
      } else {
        this.disableBtn = true
      }
    },

    selectEmoji(emoji) {
      const emo = document.createTextNode(emoji.data)
      this.$refs.contentPost.appendChild(emo)
      this.disableBtn = false
    },

    dummyRequest(file) {
      setTimeout(() => {
        file.onSuccess('ok')
      }, 0)
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },

    // làm thêm upload ảnh thì bé hơn 9 tấm
    handleChange(file) {
      this.fileList = file.fileList
      if (file.file.status === 'done') {
        // kiểm tra xem nếu ảnh lớn hơn 2MB thì xóa bỏ và thông báo
        file.fileList.forEach((item, index) => {
          if (item.size / 1024 / 1024 > 2) {
            this.fileList.splice(index, 1)
            this.$message.error('Ảnh phải bé hơn 2MB!')
          }
        })
      }
      if (file.file.status === 'removed') {
        this.fileList = file.fileList
      }

      if (this.fileList.length !== 0 || this.$refs.contentPost.innerHTML !== '') {
        this.disableBtn = false
      } else {
        this.disableBtn = true
      }
    },

    handleSubmit() {
      this.btnLoading = true

      const formData = new FormData()
      formData.append('content', this.$refs.contentPost.innerHTML)

      this.fileList.forEach((item) => {
        formData.append('image', item.originFileObj)
      })

      this.$axios
        .$post(this.api, formData)
        .then((res) => {
          if (res.success) {
            this.$emit('fetchData')
            this.btnLoading = false
            this.handleCloseModal()
          }
        })
        .catch((e) => {
          console.error(e)
          this.btnLoading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
@import '/assets/less/core/variables.less';
@import '/assets/less/core/mixins.less';

.emoji-picker {
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% + 20px));
  z-index: 2;
}

.write-post {
  width: 100%;
  height: 50px;
  border: 1px solid #c4c4c4;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  padding: 0 20px;
  background: @bg-white;
  margin-top: 16px;

  .avatar {
    .contain-avt(30px);
  }

  .placeholder {
    margin-left: 20px;
    font-size: 14px;
  }

  .emoji {
    margin-left: auto;
    flex-shrink: 0;
    display: flex;
    gap: 20px + 16px;

    .icon {
      position: relative;
      flex-shrink: 0;
      font-size: 18px;

      &::after {
        content: '';
        height: 18px + 16px;
        width: 18px + 16px;
        border-radius: 50%;
        border: 1px solid #c4c4c4;
        .mid();
      }
    }
  }
}
//custom modal post
.modal-post {
  .user {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    &__avt {
      .contain-avt(80px);
    }

    &__name {
      font-size: 26px;
      font-family: pdb;
      color: @text-black;
      margin-left: 30px;
      .dot-para-text(2);
    }
  }

  .content {
    width: 100%;
    height: 200px;
    margin-bottom: 30px;
    position: relative;

    &__text {
      width: 100%;
      height: 100%;
      border: 1px solid #c4c4c4;
      border-radius: 6px;
      outline: none;
      padding: 16px;
      font-size: 16px;
      overflow-y: auto;
      .custom-scrollbar-2();

      &:empty::after {
        content: attr(data-place);
      }
    }

    .more {
      position: absolute;
      right: 16px + 16px;
      bottom: 16px;
      gap: 20px + 16px;
      display: flex;
      align-items: center;

      .icon {
        cursor: pointer;
        position: relative;

        &::after {
          content: '';
          height: 24px + 16px; // 24px is size of icon and 16px is space of border
          width: 24px + 16px;
          border-radius: 50%;
          border: 1px solid #c4c4c4;
          .mid();
        }
      }
    }
  }
}

// responsive
.mobile({
  .write-post {
    height: 40px;
    padding: 0 16px;

    .avatar {
      .contain-avt(30px);
    }

    .placeholder {
      margin-left: 8px;
      font-size: 12px;
    }

    .emoji {
      margin-left: auto;
      flex-shrink: 0;
      display: flex;
      gap: 8px + 14px;

      .icon {
        font-size: 14px;

        &::after {
          height: 14px + 14px;
          width: 14px + 14px;
        }
      }
    }
  }
  
  .modal-post {
    .user {
      margin-bottom: 16px;

      &__avt {
        .contain-avt(56px);
      }

      &__name {
        font-size: 18px;
        margin-left: 16px;
      }
    }

    .content {
      margin-bottom: 16px;

      &__text {
        padding: 8px;
        font-size: 14px;
      }

      .more {
        right: 8px + 14px;
        bottom: 16px;
        gap: 8px + 16px;

        .icon {
          font-size: 14px;

          &::after {
            height: 14 + 16px; // 24px is size of icon and 16px is space of border
            width: 14 + 16px;
          }
        }
      }
    }
  }
});
</style>
