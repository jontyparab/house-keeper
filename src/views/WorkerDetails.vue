<template>
  <base-card>
    <div class="p-fluid p-formgrid p-grid">
      <div class="worker-list-item p-text-center p-col-12">
        <img
          :src="require(`../assets/images/${worker.image}`)"
          :alt="fullName"
        />
      </div>
      <div class="p-mb-2 p-flex-column-reverse">
        <div class="p-mb-2 p-mb-1">
          <u
            ><h1>{{ fullName }}</h1></u
          >
        </div>
        <base-badge :status="worker.status" :active="false"></base-badge>
        <div class="p-mb-2 p-mt-1">
          <span class="p-text-bold">Description: </span>{{ worker.description }}
        </div>
        <div class="p-mb-2">
          <span class="p-text-bold">City: </span> {{ worker.city }}
        </div>
        <div class="p-mb-2" :style="strTruncate">
          <span class="p-text-bold">Services Provided:</span>
          {{ selectedWork.join(', ') }}
        </div>
        <div class="p-mb-2">
          <span class="p-text-bold">Pay:</span>
          {{ pay }}
        </div>
        <div class="p-mb-2">
          <span class="p-text-bold">Availability:</span>
          {{ availability }}
        </div>
      </div>

      <div class="p-col-12">
        <router-link :to="{ name: 'HireForm' }" :class="{ disabled: status }">
          <Button
            type="submit"
            label="Hire Me"
            :disabled="status"
            class="p-button-raised p-button-rounded p-button-success p-mb-3"
          />
        </router-link>
      </div>
    </div>
  </base-card>
</template>

<script>
import { fmtTime } from '../assets/js/myFunctions.js';
export default {
  props: ['id'],

  computed: {
    worker() {
      const worker = this.$store.getters['base/workersList'].find(
        (worker) => worker.id === this.id
      );
      return worker;
    },
    strTruncate() {
      return {
        'text-overflow': 'wrap',
      };
    },
    status() {
      return this.worker.status === 'unavailable';
    },
    fullName() {
      return this.worker.firstName + ' ' + this.worker.lastName;
    },
    availability() {
      return (
        fmtTime(this.worker.fromTime) + ' ~ ' + fmtTime(this.worker.toTime)
      );
    },
    pay() {
      const strPay = '₹' + this.worker.basePay.join(' - ₹');
      return strPay;
    },
    selectedWork() {
      const providedServices = [];
      this.worker.selectedWorks?.forEach((work) => {
        providedServices.push(work.label);
      });
      return providedServices;
    },
  },
};
</script>

<style lang="scss" scoped>
.mycard {
  width: 50vw;
}
.worker-list-item {
  img {
    width: 8rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}
.worker-list-item {
  img {
    margin: 1rem 0;
  }
}
.disabled {
  pointer-events: none;
}
</style>
