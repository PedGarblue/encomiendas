<template>
  <div class="loading-container" :class="{'fixed-background flex flex-center': fixed}">
    <div class="loading-body">
      <span class="icon">
        <i class="icon-spinner6"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    fixed: {
      type: Boolean,
      default() {
        return false;
      }
    },
  },
}
</script>

<style>
.loading-body {
  background-color: var(--complementary-background);
  width: max-content;
  padding: 2rem;
  border: solid 0.13rem #d0cbcb;
  border-radius: 50%;
}
.icon {
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.28, 0.59, 0.55, 0.71);
  width: max-content;
  display: flex;
  align-content: center;
  align-items: center;
  font-size: var(--big);
}

@keyframes spin {
  from {
    transform: rotateZ(360deg);
  }
  
  to {
    transform: rotateZ(0deg);
  }
}
</style>