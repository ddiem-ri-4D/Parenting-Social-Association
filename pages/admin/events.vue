<template>
  <LoadingView v-if="$fetchState.pending" />
  <div v-else class="admin-content">
    <div class="options">
      <div class="left">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <nuxt-link to="/admin/dashboard">{{ $t('Trang chủ') }}</nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ $t('Thông báo') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <div class="right">
        <a-button type="primary" @click="handleOpenAddModal('add')"><a-icon type="plus" /> {{ $t('Thêm thông báo') }} </a-button>
        <!-- Modal add user -->
        <a-modal
          v-model="visibleAdd"
          :footer="false"
          :title="nameModal === 'add' ? $t('Thêm thông báo') : $t('Sửa thông báo')"
          class="modal-admin"
          @cancel="handleCancelModal"
        >
          <template slot="closeIcon">
            <i class="fal fa-times icon"></i>
          </template>
          <a-form-model ref="ruleForm" :model="form" :rules="rules">
            <a-form-model-item ref="title" prop="title" :label="$t('Tiêu đề')">
              <a-input v-model="form.title" type="text" size="large"> </a-input>
            </a-form-model-item>

            <a-form-model-item ref="description" prop="description" :label="$t('Nội dung')">
              <a-textarea v-model="form.description" type="text" :auto-size="{ minRows: 5 }"></a-textarea>
            </a-form-model-item>

            <a-form-model-item :label="$t('Ngày bắt đầu')">
              <a-input v-model="form.start" type="text" size="large" placeholder="30/01/2020"> </a-input>
            </a-form-model-item>

            <a-form-model-item :label="$t('Ngày kết thúc')">
              <a-input v-model="form.end" type="text" size="large" placeholder="30/02/2020"> </a-input>
            </a-form-model-item>

            <a-form-model-item :label="$t('Hình ảnh')">
              <a-upload
                class="img-event"
                name="file"
                accept=".png, .jpg, .jpeg"
                :multiple="false"
                :custom-request="dummyRequest"
                :show-upload-list="false"
                :before-upload="beforeUpload"
                @change="handleChooseImg"
              >
                <a-button block size="large">
                  <a-icon type="upload" />
                  {{ $t('Tải ảnh lên') }}
                </a-button>
              </a-upload>
            </a-form-model-item>
            <a-form-model-item>
              <div class="view-img">
                <img v-if="imageUrl" :src="imageUrl" alt="img events" />
              </div>
            </a-form-model-item>

            <a-form-model-item>
              <a-button type="primary" :loading="btnLoading" block size="large" @click.prevent="handleAdd"> {{ $t('Thêm') }} </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-modal>
      </div>
    </div>

    <a-table bordered :columns="columns" :data-source="events" :scroll="{ x: 1300 }" :pagination="pagination">
      <!-- Custom render data -->
      <template slot="description" slot-scope="description">
        <p class="description">
          {{ description }}
        </p>
      </template>

      <template slot="image" slot-scope="image">
        <div v-if="image.length !== 0" class="contain-img">
          <img class="show-img" :src="image" alt="image events" />
        </div>
      </template>

      <template slot="time" slot-scope="item">
        <span v-if="item.start"> {{ item.start }}</span>
        <span v-if="item.end">- {{ item.end }}</span>
      </template>

      <template slot="action" slot-scope="item">
        <span class="action" @click="handleShowInfo(item)">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{ $t('Xem') }}</span>
            </template>
            <a-icon type="eye" />
          </a-tooltip>
        </span>
        <span class="action" @click="handleOpenAddModal('edit')">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{ $t('Sửa') }}</span>
            </template>
            <a-icon type="edit" />
          </a-tooltip>
        </span>
        <span class="action">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{ $t('Xóa') }}</span>
            </template>
            <a-icon type="delete" />
          </a-tooltip>
        </span>
      </template>
    </a-table>

    <!-- modal info notification-->
    <a-modal v-model="visible" class="modal-event" :title="$t('Thông báo')" :footer="false" @cancel="handleCancel">
      <template slot="closeIcon">
        <i class="fal fa-times icon"></i>
      </template>
      <div class="top">
        <div v-if="infoEvent.image" class="img-event">
          <img :src="infoEvent.image" alt="image event" />
        </div>
        <div class="top-right">
          <p>{{ infoEvent.title }}</p>
          <span v-if="infoEvent.start"> {{ infoEvent.start }}</span>
          <span v-if="infoEvent.end">- {{ infoEvent.end }}</span>
        </div>
      </div>
      <p>{{ infoEvent.description }}</p>
    </a-modal>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      infoEvent: {},
      visible: false,
      visibleAdd: false,
      nameModal: '',
      imageUrl: '',
      seclectedFile: null,
      fileName: '',
      btnLoading: false,
      pagination: {
        pageSize: 10,
        current: 1,
        total: this.$store.getters.getEvents.length,
      },
      form: {
        title: '',
        description: '',
        start: '',
        end: '',
      },
      rules: {
        title: {
          required: true,
          message: this.$t('Mục không được để trống'),
        },
        description: {
          required: true,
          message: this.$t('Mục không được để trống'),
        },
      },
    }
  },

  fetch() {
    if (this.$store.getters.getEvents.length === 0) {
      this.$store.dispatch('setEvents')
    }
  },

  computed: {
    events() {
      return this.$store.getters.getEvents
    },

    columns() {
      const columns = [
        {
          title: this.$t('Tiêu đề'),
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: this.$t('Nội dung'),
          dataIndex: 'description',
          key: 'description',
          scopedSlots: { customRender: 'description' },
        },
        {
          title: this.$t('Hình ảnh'),
          dataIndex: 'image',
          key: 'image',
          width: '110px',
          align: 'center',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: this.$t('Thời gian'),
          key: 'time',
          align: 'center',
          width: '200px',
          scopedSlots: { customRender: 'time' },
        },
        {
          title: this.$t('Ngày đăng'),
          dataIndex: 'date',
          key: 'date',
          width: '140px',
          align: 'center',
        },
        {
          title: this.$t('Thao tác'),
          key: 'action',
          align: 'center',
          width: '90px',
          scopedSlots: { customRender: 'action' },
        },
      ]
      return columns
    },
  },

  methods: {
    handleOpenAddModal(name) {
      this.nameModal = name
      this.visibleAdd = true
    },

    handleShowInfo(event) {
      this.infoEvent = event
      this.visible = true
    },

    handleCancel() {
      this.infoEvent = {}
    },

    handleCancelModal() {
      this.form = {
        title: '',
        description: '',
        start: '',
        end: '',
      }
      this.imageUrl = ''
      this.seclectedFile = null
      this.fileName = ''
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

    handleChooseImg(file) {
      if (file.file.status === 'done') {
        this.seclectedFile = file.file.originFileObj
        this.fileName = file.file.originFileObj.name

        this.imageUrl = URL.createObjectURL(file.file.originFileObj)
      }
    },

    handleAdd() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true

          const formData = new FormData()

          if (this.seclectedFile) formData.append('image', this.seclectedFile, this.fileName)
          formData.append('title', this.form.title)
          formData.append('description', this.form.description)
          if (this.form.start) formData.append('start', this.form.start)
          if (this.form.end) formData.append('end', this.form.end)

          this.$axios
            .$post('/admin/event', formData)
            .then((res) => {
              this.btnLoading = false
              if (res.success) {
                this.$notification.success({
                  message: this.$t('Thông báo'),
                  description: this.$t('Thêm thành công!'),
                })
                this.handleCancelModal()
                this.visibleAdd = false
                this.$store.dispatch('setEvents')
              }
            })
            .catch(() => {
              this.btnLoading = false
              this.$notification.error({
                message: this.$t('Thông báo'),
                description: this.$t('Đã có lỗi không mong muốn xảy ra'),
              })
            })
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
@import '/assets/less/core/variables.less';
@import '/assets/less/core/mixins.less';

table {
  .contain-img {
    width: 80px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    img {
      height: auto;
    }
  }

  .description {
    .dot-para-text(3);
  }
}
</style>
