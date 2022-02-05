<template>
  <LoadingView v-if="$fetchState.pending" />
  <div v-else class="admin-content">
    <div class="options">
      <div class="left">
        <a-breadcrumb>
          <a-breadcrumb-item>
            <nuxt-link to="/admin/dashboard">{{ $t('Trang chủ') }}</nuxt-link>
          </a-breadcrumb-item>
          <a-breadcrumb-item>{{ $t('Bài viết') }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>
    </div>

    <a-table
      bordered
      :row-selection="{ onChange: onSelectChange }"
      :columns="columns"
      :data-source="decks"
      :pagination="pagination"
      @change="handleTableChange"
    >
      <!-- Custom render data -->
      <template slot="content" slot-scope="content">
        <div v-html="content"></div>
      </template>

      <template slot="image" slot-scope="image">
        <div class="contain-img">
          <img v-for="(item, index) in image" :key="index" class="show-img" :src="item" alt="image post" />
        </div>
      </template>

      <template slot="action">
        <span class="action">
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
      decks: [],
      pagination: {
        pageSize: 10,
        current: 1,
        total: '',
      },
    }
  },
  async fetch() {
    const result = await this.$axios.$get(`/decks?pageSize=${this.pagination.pageSize}&pageNumber=${this.pagination.current}`)

    if (result.success) {
      this.decks = result.decks
      this.pagination.total = result.meta.total
    }
  },

  head() {
    return {
      title: `${this.$t('Bài viết')} | Admin`,
    }
  },

  computed: {
    columns() {
      const columns = [
        {
          title: this.$t('Người đăng'),
          dataIndex: 'owner.userName',
          key: 'owner.userName',
          sorter: (a, b) => a.owner.userName.toString().localeCompare(b.owner.userName.toString()),
        },
        {
          title: this.$t('Nội dung'),
          dataIndex: 'content',
          key: 'content',
          scopedSlots: { customRender: 'content' },
        },
        {
          title: this.$t('Hình ảnh'),
          dataIndex: 'image',
          key: 'image',
          width: '300px',
          scopedSlots: { customRender: 'image' },
        },
        {
          title: this.$t('Ngày đăng'),
          dataIndex: 'date',
          key: 'date',
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
  },

  methods: {
    onSelectChange(selectedRowKeys, selectedRows) {
      // console.log(selectedRows)
    },

    async fetcDataPost(pageNumber) {
      const result = await this.$axios.$get(`/decks?pageSize=${this.pagination.pageSize}&pageNumber=${pageNumber}`)
      if (result.success) {
        this.decks = result.decks
        this.pagination.current = result.meta.pageNumber
      }
    },

    handleTableChange(pagination) {
      this.fetcDataPost(pagination.current)
    },
  },
}
</script>

<style lang="less" scoped>
table {
  .contain-img {
    display: flex;
    gap: 16px;

    .show-img {
      height: 40px;
      width: auto;
    }
  }
}
</style>
