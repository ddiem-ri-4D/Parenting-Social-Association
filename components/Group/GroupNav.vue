<template>
  <div class="nav-group">
    <div class="title">
      <nuxt-link to="/groups" class="title__name">{{ $t('Nhóm của bạn') }}</nuxt-link>
      <sup>{{ $auth.user.groups.length }}</sup>
    </div>
    <div class="groups">
      <nuxt-link v-for="(item, index) in $auth.user.groups" :key="index" :to="'/groups/' + item._id" class="groups__item">
        <div class="groups__item-avt">
          <img v-if="item.image" :src="item.image" alt="avatar group" />
          <img v-else src="~/assets/img/group-avt.jpg" alt="avatar group" />
        </div>
        <div class="groups__item-detail">
          <p class="name">{{ item.name }}</p>
          <div class="detail">
            <p class="detail-item">{{ item.users.length }} {{ $t('thành viên') }}</p>
            <p class="detail-item">{{ item.decks.length }} {{ $t('bài viết') }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '/assets/less/core/variables.less';
@import '/assets/less/core/mixins.less';

.nav-group {
  width: 25%;
  padding: 20px;
  background: @bg-default;
  flex-shrink: 0;
  position: sticky;
  top: 60px;
  height: calc(100vh - 60px);
  overflow: auto;

  .custom-scrollbar-3(4px, @cl-scroll);

  .title {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    position: relative;

    &__name {
      font-family: pdb;
      font-size: 22px;
      color: @text-gray-2;
    }

    sup {
      font-size: 22px;
      color: @color-default;
    }

    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      background: @cl-line;
      bottom: 0;
      left: 0;
    }
  }

  .groups {
    margin-top: 10px;

    &__item {
      display: flex;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid @bg-group;
      color: @text-black;
      margin-bottom: 16px;
      transition: @t @cubic;

      &-avt {
        .contain-avt(60px);
      }

      &-detail {
        margin-left: 10px;

        .name {
          font-size: 18px;
          font-family: qsb;
          text-transform: uppercase;
        }

        .detail {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 10px;

          &-item {
            font-size: 14px;
          }
        }
      }

      &:hover {
        color: @text-white !important;
        background: @bg-group;
        transition: @t @cubic;
      }

      &.nuxt-link-active {
        background: @bg-group;
        color: @text-white;
      }
    }
  }
}

.desktop({
  .nav-group {
    width: 30%;
    padding: 16px;

  .title {
    &__name {
      font-size: 18px;
    }

    sup {
      font-size: 18px;
    }

  }

  .groups {
    &__item {
      &-avt {
        .contain-avt(48px);
      }

      &-detail {
        margin-left: 10px;

        .name {
          font-size: 16px;
        }

        .detail {

          &-item {
            font-size: 12px;
          }
        }
      }
    }
  }
}
});

.tablet({
  .nav-group {
    width: 100%;
    overflow: initial;
    position: initial;
    height: initial;

    .groups {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 16px;
      margin-top: 24px;

      &__item{
        margin-bottom: initial;
      }
    }
  }
});

.mobile-xxs({
  .nav-group{
    .groups{
      grid-template-columns: 1fr;
    }
  }
});
</style>
