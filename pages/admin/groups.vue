<template>
  <LoadingView v-if="$fetchState.pending" />
  <div v-else class="admin-content">
    <div class="options">
      <div class="left">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <nuxt-link to="/admin/dashboard">{{ $t('Trang chủ') }}</nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ $t('Nhóm') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <div class="right">
        <a-button type="primary" @click="handleOpenAddModal"><a-icon type="plus" /> {{ $t('Thêm nhóm') }} </a-button>
        <a-modal
          v-model="visibleAdd"
          :footer="false"
          :title="nameModal === 'add' ? $t('Thêm nhóm') : $t('Sửa nhóm')"
          class="modal-admin"
          @cancel="handleCancelModal"
        >
          <template slot="closeIcon">
            <i class="fal fa-times icon"></i>
          </template>

          <a-form-model ref="ruleForm" :model="form" :rules="rules">
            <a-form-model-item ref="name" prop="name" :label="$t('Tên nhóm')">
              <a-input v-model="form.name" type="text" size="large"> </a-input>
            </a-form-model-item>

            <a-form-model-item ref="description" prop="description" :label="$t('Mô tả')">
              <a-textarea v-model="form.description" type="text" :auto-size="{ minRows: 5 }"></a-textarea>
            </a-form-model-item>

            <a-form-model-item v-if="nameModal === 'add'" ref="class" prop="class" :label="$t('Lớp')">
              <a-input v-model="form.class" type="text" size="large"></a-input>
            </a-form-model-item>

            <a-form-model-item v-if="nameModal === 'add'" :label="$t('Hình ảnh')">
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
            <a-form-model-item v-if="nameModal === 'add'">
              <div>
                <img v-if="imageUrl" :src="imageUrl" alt="img group" />
              </div>
            </a-form-model-item>

            <a-form-model-item>
              <a-button v-if="nameModal === 'add'" type="primary" :loading="btnLoading" block size="large" @click.prevent="handleAdd">
                {{ $t('Thêm') }}
              </a-button>
              <a-button v-else type="primary" :loading="btnLoading" block size="large" @click.prevent="handleEdit">
                {{ $t('Lưu thay đổi') }}
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-modal>
      </div>
    </div>

    <a-table bordered :columns="columns" :data-source="groups" :scroll="{ x: 1300 }" :pagination="pagination">
      <!-- Custom render data -->

      <template slot="members" slot-scope="item">
        <p>{{ item.users.length }}</p>
      </template>

      <template slot="posts" slot-scope="item">
        <p>{{ item.decks.length }}</p>
      </template>

      <template slot="action" slot-scope="item">
        <span class="action" @click="handleModalView(item)">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>{{ $t('Xem') }}</span>
            </template>
            <a-icon type="eye" />
          </a-tooltip>
        </span>
        <span class="action" @click="handleOpenEditModal(item)">
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
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      groups: [],
      idGroup: '',
      visibleAdd: false,
      nameModal: '',
      imageUrl: '',
      seclectedFile: null,
      fileName: '',
      btnLoading: false,
      pagination: {
        pageSize: 10,
      },
      form: {
        name: '',
        description: '',
        class: '',
      },
      rules: {
        name: {
          required: true,
          message: this.$t('Mục không được để trống'),
        },
        description: {
          required: true,
          message: this.$t('Mục không được để trống'),
        },
        class: {
          required: true,
          message: this.$t('Mục không được để trống'),
        },
      },
    }
  },

  async fetch() {
    try {
      const result = await this.$axios.$get('/groups')

      if (result.success) {
        this.groups = result.groups
      }
    } catch (error) {
      console.error(error)
    }
  },

  computed: {
    columns() {
      const columns = [
        {
          title: this.$t('Tên nhóm'),
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: this.$t('Mô tả'),
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: this.$t('Thành viên'),
          key: 'members',
          align: 'center',
          scopedSlots: { customRender: 'members' },
        },
        {
          title: this.$t('Bài viết'),
          key: 'posts',
          align: 'center',
          scopedSlots: { customRender: 'posts' },
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
    handleOpenAddModal() {
      this.nameModal = 'add'
      this.visibleAdd = true
    },

    handleOpenEditModal(group) {
      this.nameModal = 'edit'
      this.visibleAdd = true

      this.idGroup = group._id

      this.form = {
        name: group.name,
        description: group.description,
      }
    },

    handleModalView(group) {
      console.log(group)
    },

    handleCancelModal() {
      this.imageUrl = ''
      this.seclectedFile = null
      this.fileName = ''

      this.idGroup = ''
      this.form = {
        name: '',
        description: '',
        class: '',
      }
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
          formData.append('name', this.form.name)
          formData.append('description', this.form.description)
          formData.append('class', this.form.class)
          formData.append('image', this.seclectedFile, this.fileName)

          this.$axios
            .$post('/groups', formData)
            .then((res) => {
              this.btnLoading = false

              if (res.success) {
                this.$notification.success({
                  message: this.$t('Thông báo'),
                  description: this.$t('Thêm thành công!'),
                })
                this.$fetch()
                this.visibleAdd = false
                this.handleCancelModal()
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

    handleEdit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          this.$axios
            .$patch('/groups/' + this.idGroup, {
              name: this.form.name,
              description: this.form.description,
            })
            .then((res) => {
              this.btnLoading = false

              if (res.success) {
                this.$notification.success({
                  message: this.$t('Thông báo'),
                  description: this.$t('Thay đổi thành công!'),
                })
                this.$fetch()
                this.visibleAdd = false
                this.handleCancelModal()
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
