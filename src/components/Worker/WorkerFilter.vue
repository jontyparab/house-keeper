<template>
  <div class="p-d-flex p-jc-end p-flex-wrap p-flex-xl-wrap">
    <MultiSelect
      v-model="lclselectedWorks"
      @change="updWorkerList"
      :options="jobs"
      optionLabel="label"
      filterPlaceholder="Search Work"
      placeholder="Filter By Work"
      :filter="true"
      display="chip"
      class="multiselect-custom p-m-1 p-ml-5"
    >
      <template #option="slotProps">
        <div>
          <div>{{ slotProps.option.label }}</div>
        </div>
      </template>
    </MultiSelect>
    <div class="p-m-1">
      <div class="p-field-checkbox p-m-1 p-d-inline">
        <InputText
          @input="updWorkerList"
          type="text"
          id="locality"
          class="p-text-capitalize p-inputtext-sm"
          v-model.trim="localityFilter"
          placeholder="Enter City"
          maxlength="30"
          title="Max length can be 30 characters."
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  emits: ['updWorkerList', 'isLoading'],
  data() {
    return {
      lclselectedWorks: [],
      localityFilter: '',
      availableFilter: true,
    };
  },
  watch: {},
  computed: {
    ...mapGetters('base', ['jobs', 'workersList']),
  },
  methods: {
    async updWorkerList() {
      this.$emit('isLoading', true);
      try {
        await this.$store.dispatch('base/loadWorkersList');
        const updList = this.workersList
          .filter((item) => {
            return this.availableFilter ? item.status == 'available' : true;
          })
          .filter((item) => {
            return this.localityFilter
              ? item.city
                  .toLowerCase()
                  .includes(this.localityFilter.toLowerCase())
              : true;
          })
          .filter((item) => {
            if (this.lclselectedWorks.length > 0) {
              let checker = true;
              checker = this.lclselectedWorks.every((selectedWork) => {
                let chk = false;
                for (const service of item.selectedWorks) {
                  chk = service.label == selectedWork.label ? true : false;
                  if (chk) break;
                }
                return chk;
              });
              return checker;
            } else {
              return true;
            }
          });
        this.$emit('updWorkerList', updList);
      } catch (error) {
        console.log(error.message);
      } finally {
        this.$emit('isLoading', false);
      }
    },
  },
  mounted() {
    this.$emit('isLoading', true);
    // this.$emit('updWorkerList', this.workersList);
    setTimeout(() => {
      this.updWorkerList();
      this.$emit('isLoading', false);
    }, 1000);
  },
};
</script>

<style>
.multiselect-custom {
  height: 34px;
}
.multiselect-custom .p-multiselect-label {
  padding: 0.3rem !important;
  padding-bottom: 0rem !important;
}
.multiselect-custom .p-multiselect-token {
  padding: 0rem !important;
  padding-left: 0.25rem !important;
  padding-right: 0.25rem !important;
}
</style>
