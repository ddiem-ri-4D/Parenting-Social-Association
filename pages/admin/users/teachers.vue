<template>
  <LoadingView v-if="$fetchState.pending" />
  <div v-else class="admin-content">
    <div class="options">
      <div class="left">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <nuxt-link to="/admin/dashboard">{{ $t('Trang chủ') }}</nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ $t('Giáo viên') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
      <div class="right">
        <a-button type="primary" @click="handleOpenModalAdd"><a-icon type="plus" /> {{ $t('Thêm giáo viên') }} </a-button>

        <!-- Modal add user -->
        <a-modal v-model="visibleAdd" :footer="false" :title="$t('Thêm giáo viên')" class="modal-admin" @cancel="handleCloseModalAdd">
          <template slot="closeIcon">
            <i class="fal fa-times icon"></i>
          </template>
          <a-tabs default-active-key="1">
            <!-- Tab thêm 1 user -->
            <a-tab-pane key="1" :tab="$t('Thêm 1 giáo viên')">
              <!-- <a-form-model ref="ruleFormAdd" :model="formAdd" :rules="rules">
                <a-form-model-item ref="studenID" prop="studenID">
                  <a-input v-model="formAdd.studenID" placeholder="Username" type="text"> </a-input>
                </a-form-model-item>

                <a-form-model-item ref="nameChild" prop="nameChild">
                  <a-input v-model="formAdd.nameChild" type="text" placeholder="Name child"> </a-input>
                </a-form-model-item>

                <a-form-model-item ref="dob" prop="dob">
                  <a-input v-model="formAdd.dob" type="text" placeholder="Date of birth"> </a-input>
                </a-form-model-item>

                <a-form-model-item ref="email" prop="email">
                  <a-input v-model="formAdd.email" type="email" placeholder="Email"> </a-input>
                </a-form-model-item>

                <a-form-model-item ref="phone" prop="phone">
                  <a-input v-model="formAdd.phone" type="text" placeholder="Chone"> </a-input>
                </a-form-model-item>

                <a-form-model-item ref="class" prop="class">
                  <a-input v-model="formAdd.class" type="text" placeholder="Class"> </a-input>
                </a-form-model-item>

                <a-form-model-item>
                  <a-button type="primary" block @click.prevent="handleAddUser"> Thêm </a-button>
                </a-form-model-item>
              </a-form-model> -->
            </a-tab-pane>

            <!-- Tab thêm bằng file -->
            <a-tab-pane key="2" :tab="$t('Thêm bằng file exel')" force-render>
              <div>
                <a-upload-dragger
                  :show-upload-list="false"
                  :custom-request="dummyRequest"
                  accept=".csv"
                  name="file"
                  :multiple="false"
                  @change="handleChangeFile"
                >
                  <p class="ant-upload-drag-icon">
                    <a-icon type="upload" />
                  </p>
                  <p class="ant-upload-text">{{ $t('Bấm để chọn file hoặc kéo thả file vào') }}</p>
                </a-upload-dragger>
                <div v-if="fileUser" class="review-file" style="margin-top: 16px">
                  {{ fileUser.name }}
                </div>
                <div v-if="userDuplicate.length > 0" class="user-duplicate">
                  <p>{{ $t('Danh sách các mã tài khoản đã tồn tại') }}</p>
                  <div class="list">
                    <span v-for="(item, index) in userDuplicate" :key="index">{{ item }}</span>
                  </div>
                </div>
                <a-button type="primary" :disabled="activeButtonAdd" block style="margin-top: 16px" :loading="btnLoading" @click="handleAddFileUser">
                  {{ $t('Thêm') }}
                </a-button>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-modal>
      </div>
    </div>

    <!-- Table main -->
    <a-table
      bordered
      :row-selection="{ onChange: onSelectChange }"
      :scroll="{ x: 1300 }"
      :columns="columns"
      :data-source="users"
      :pagination="pagination"
    >
      <!-- Custom render data -->
      <template slot="dean" slot-scope="text">
        <span v-if="text === 'TRUE'">
          <a-icon style="color: green" type="check" />
        </span>
      </template>

      <template slot="action">
        <span class="action">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span> {{ $t('Sửa') }}</span>
            </template>
            <a-icon type="edit" />
          </a-tooltip>
        </span>
        <span class="action">
          <a-tooltip placement="bottom">
            <template slot="title">
              <span> {{ $t('Xóa') }}</span>
            </template>
            <a-icon type="delete" />
          </a-tooltip>
        </span>
      </template>

      <!-- Custom filter -->
      <div slot="filter" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class="contain-filter">
        <a-input
          placeholder="Search name"
          :value="selectedKeys[0]"
          class="input-search"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        />
        <a-button type="primary" icon="search" size="small" @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)">
          {{ $t('Tìm') }}
        </a-button>
        <a-button size="small" @click="handleReset(clearFilters)"> {{ $t('Hủy') }} </a-button>
      </div>

      <!-- Custom icon search -->
      <a-icon slot="filterIcon" slot-scope="filtered" type="search" :style="{ color: filtered ? '#EA4C89' : undefined }" />
    </a-table>
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      visibleAdd: false,
      activeButtonAdd: true,
      fileUser: '',
      btnLoading: false,
      userDuplicate: [],
      pagination: {
        pageSize: 20,
      },
      formAdd: {
        studenID: '',
        nameChild: '',
        dob: '',
        email: '',
        phone: '',
        class: '',
      },
      rules: {
        studenID: {
          required: true,
          message: 'Please enter studenID!',
        },
        nameChild: {
          required: true,
          message: 'Please enter name child!',
        },
        dob: {
          required: true,
          message: 'Please enter date of birth!',
        },
        email: {
          required: true,
          message: 'Please enter username!',
        },
        phone: {
          required: true,
          message: 'Please enter phone!',
        },
        class: {
          required: true,
          message: 'Please enter class!',
        },
      },
    }
  },

  async fetch() {
    if (this.$store.getters.getUsers.length === 0) {
      await this.$store.dispatch('setUsers')
    }
  },

  head() {
    return {
      title: `${this.$t('Giáo viên')} | Admin`,
    }
  },

  computed: {
    columns() {
      const columns = [
        {
          title: this.$t('Mã giáo viên'),
          dataIndex: 'userID',
          key: 'userID',
          width: '150px',
          scopedSlots: {
            filterDropdown: 'filter',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => record.userID.toString().toLowerCase().includes(value.toLowerCase()),
          sorter: (a, b) => a.userID.toString().localeCompare(b.userID.toString()),
        },
        {
          title: this.$t('Họ tên'),
          dataIndex: 'userName',
          key: 'userName',
          scopedSlots: {
            filterDropdown: 'filter',
            filterIcon: 'filterIcon',
          },
          onFilter: (value, record) => record.userName.toString().toLowerCase().includes(value.toLowerCase()),
          sorter: (a, b) => a.userName.toString().localeCompare(b.userName.toString()),
        },
        {
          title: this.$t('Ngày sinh'),
          dataIndex: 'dateOfBirth',
          key: 'dateOfBirth',
        },
        {
          title: this.$t('Email'),
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: this.$t('SDT'),
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: this.$t('Lớp'),
          dataIndex: 'formTeacher',
          key: 'formTeacher',
          align: 'center',
          sorter: (a, b) => a.formTeacher.toString().localeCompare(b.formTeacher.toString()),
        },
        {
          title: this.$t('Môn'),
          dataIndex: 'tag',
          key: 'tag',
        },
        {
          title: this.$t('Trưởng khoa'),
          dataIndex: 'dean',
          key: 'dean',
          align: 'center',
          scopedSlots: { customRender: 'dean' },
        },
        {
          title: this.$t('Quyền'),
          dataIndex: 'role',
          key: 'role',
        },
        {
          title: this.$t('Thao tác'),
          key: 'action',
          align: 'center',
          scopedSlots: { customRender: 'action' },
        },
      ]
      return columns
    },

    users() {
      return this.$store.getters.getUsers
        .filter((item) => item.role === 'teacher')
        .slice()
        .reverse()
    },
  },

  methods: {
    handleOpenModalAdd() {
      this.visibleAdd = true
    },

    handleCloseModalAdd() {
      this.visibleAdd = false
      this.userDuplicate.length = 0
      this.fileUser = ''

      this.activeButtonAdd = true
    },

    onSelectChange(selectedRowKeys, selectedRows) {
      // console.log(selectedRows)
    },

    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm()
    },

    handleReset(clearFilters) {
      clearFilters()
    },

    dummyRequest(file) {
      setTimeout(() => {
        file.onSuccess('ok')
      }, 0)
    },

    handleChangeFile(info) {
      const status = info.file.status
      if (status === 'done') {
        if (info.file.originFileObj.type === 'application/vnd.ms-excel') {
          this.fileUser = info.file.originFileObj
          this.activeButtonAdd = false
        } else {
          this.$notification.open({
            message: this.$t('Sai định dạng'),
            description: this.$t('File không đúng định dạng vui lòng kiểm tra lại'),
          })
        }
      }
    },

    async handleAddFileUser() {
      try {
        this.btnLoading = true

        const formData = new FormData()
        formData.append('file', this.fileUser)

        const result = await this.$axios.$post('/admin/addTeachers', formData)

        if (result) {
          this.btnLoading = false
          this.handleCloseModalAdd()
          this.$store.dispatch('setUsers')
          this.$notification.success({
            message: this.$t('Thêm thành công!'),
          })
        }
      } catch (res) {
        this.$notification.error({
          message: this.$t('Thêm thất bại!'),
          description: this.$t('Một hoặc một vài mã tài khoản đã tồn tại, Vui lòng kiểm tra lại'),
        })
        this.userDuplicate = res.response.data.userError
        this.btnLoading = false
      }
    },

    handleAddUser() {
      this.$refs.ruleFormAdd.validate((valid) => {
        if (valid) {
          this.$notification.open({
            message: this.$t('Chức năng đang phát triển'),
          })
        }
      })
    },
  },
}
</script>
