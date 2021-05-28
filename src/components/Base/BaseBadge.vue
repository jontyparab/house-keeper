<template>
  <span
    @click="changeStatus"
    class="p-text-bold p-px-2 p-text-capitalize p-shadow-1"
    :class="['status-' + title, active ? '' : 'inactive']"
    ><i class="pi" :class="'pi-' + icon" style="vertical-align:-10%"></i>
    {{ title }}
  </span>
</template>

<script>
export default {
  emits: ['setLclStatus'],
  props: ['status', 'active'],
  data() {
    return {
      icon: null,
      title: null,
      mapping: {
        available: 'check-circle',
        unavailable: 'times-circle',
      },
    };
  },
  watch: {
    title() {
      this.$emit('setLclStatus', this.title);
    },
  },
  methods: {
    changeStatus() {
      if (this.title == 'available') {
        //Local status (not the prop)
        const status = 'unavailable';
        this.icon = this.mapping[status];
        this.title = status;
      } else {
        const status = 'available';
        this.icon = this.mapping[status];
        this.title = status;
      }
    },
    initialState() {
      this.icon = this.mapping[this.status];
      this.title = this.status;
    },
  },
  mounted() {
    this.initialState();
  },
};
</script>

<style scoped>
/* Badge Styling */
span {
  cursor: pointer;
  margin-top: auto;
  margin-bottom: auto;
  max-height: 1.5rem;
}
.inactive {
  pointer-events: none;
}
.status-available {
  background-color: rgb(84, 175, 84) !important;
  text-align: center !important;
  border-radius: 1rem;
}
.status-unavailable {
  background-color: rgb(252, 81, 50) !important;
  text-align: center !important;
  border-radius: 1rem;
}
</style>
