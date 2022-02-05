<template lang="html">
  <div class="loading-page">
    <div class="spinner"></div>
  </div>
</template>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.spinner {
  width: 50px;
  height: 50px;
  --c: radial-gradient(farthest-side, #ea4c89 92%, #0000);
  background: var(--c) 50% 0, var(--c) 50% 100%, var(--c) 100% 50%, var(--c) 0 50%;
  background-size: 14px 14px;
  background-repeat: no-repeat;
  animation: spinner 1s infinite;
}
@keyframes spinner {
  to {
    transform: rotate(0.5turn);
  }
}
</style>
