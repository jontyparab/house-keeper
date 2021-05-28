<template>
  <div class="mycard">
    <teleport to="body">
      <ProgressSpinner
        class="spinner"
        :class="showSpinner ? '' : 'p-d-none'"
        strokeWidth="2"
        animationDuration="1s"
      />
    </teleport>
    <slot></slot>
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';
export default {
  props: ['blockDocument', 'showSpinner'],
  components: {
    ProgressSpinner,
  },
};
</script>

<style scoped>
.mycard {
  background: white;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  border-radius: 20px;
  max-width: 100vw;
  max-height: 90vh;
  box-shadow: 0 5px 5px 1px rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
  overflow-y: auto;
}
/* Spinner */
.spinner {
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  z-index: 50;
}
@media only screen and (max-width: 768px) {
  .mycard {
    position: static;
    border-radius: 0px;
    height: 100vh !important;
    width: 100vw !important;
    max-height: 100vh;
  }
}
</style>
