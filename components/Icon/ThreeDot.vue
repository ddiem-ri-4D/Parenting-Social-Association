<template>
  <div class="three-dot">
    <span></span>
  </div>
</template>
<style lang="less">
@import '/assets/less/core/variables.less';
@import '/assets/less/core/mixins.less';

.three-dot {
  --h-dot: 6px;
  width: 40px;
  height: 40px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  span,
  &::before,
  &::after {
    content: '';
    flex-shrink: 0;
    height: var(--h-dot);
    width: var(--h-dot);
    border-radius: 50%;
    background: @color-default;
    display: block;
  }
}
</style>
