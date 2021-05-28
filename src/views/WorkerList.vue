<template>
  <base-card :showSpinner="showSpinner">
    <worker-filter
      @updWorkerList="setFilter"
      @isLoading="isLoading"
    ></worker-filter>
    <div v-if="!showSpinner">
      <div :key="worker.id" v-for="worker in workersList">
        <div class="worker-list-item">
          <div class="worker-list-detail">
            <div class="worker-name">
              {{ fullName(worker) }}
            </div>
            <base-badge :status="worker.status" :active="false"></base-badge>
            <div class="worker-description">
              {{ worker.description }}
            </div>
            <div class="worker-availability">
              <u>Availability</u> :
              <span class="p-text-bold">{{ availability(worker) }} </span>
            </div>
            <i class="pi pi-chevron-circle-right worker-category-icon"></i>
            <span class="worker-category">
              {{
                selectedWork(worker)
                  .slice(0, 5)
                  .join(', ')
              }}&nbsp;...
            </span>
          </div>
          <div class="worker-list-action">
            <span class="worker-price">{{ pay(worker) }}</span>
            <div class="p-text-right">
              <router-link :to="detailsLink(worker.id)">
                <Button
                  class="p-text-bold p p-button-raised"
                  icon="pi pi-angle-double-right p-text-bold"
                  label="Details"
                  @click="detailsLink"
                ></Button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showSpinner && workersList.length === 0">
      <h2>No matching records found...</h2>
      <div class="img-container">
        <img src="../assets/images/taken.svg" />
      </div>
    </div>
  </base-card>
</template>

<script>
import WorkerFilter from '../components/Worker/WorkerFilter.vue';
import { fmtTime } from '../assets/js/myFunctions.js';
export default {
  components: { WorkerFilter },
  data() {
    return {
      showSpinner: true,
      workersList: [],
      layout: 'list',
    };
  },
  methods: {
    //Preferably should be done in methods, but can be done in components too by
    //directly accepting worker parameter inside a function inside computed property.
    fullName(worker) {
      //No need to accept worker in args
      return worker.firstName + ' ' + worker.lastName;
    },
    availability(worker) {
      return fmtTime(worker.fromTime) + ' ~ ' + fmtTime(worker.toTime);
    },
    pay(worker) {
      const strPay = '₹' + worker.basePay.join(' - ₹');
      return strPay;
    },
    selectedWork(worker) {
      const providedServices = [];
      //if exists only then run the next method or part (shorthand)
      worker.selectedWorks?.forEach((work) => {
        providedServices.push(work.label);
      });
      return providedServices;
    },
    detailsLink(id) {
      // Getting route from names
      // const route = this.$router
      //   .getRoutes()
      //   .find((route) => route.name == 'WorkerDetails');
      return '/workerdetails/' + id;
    },
    setFilter(updatedList) {
      this.workersList = updatedList;
    },
    isLoading(bol) {
      this.showSpinner = bol;
    },
  },
};
</script>

<style lang="scss" scoped>
.mycard {
  padding-top: 1rem;
  width: 70vw;
  height: 90vh;
}

.worker-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.worker-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.worker-category {
  font-weight: 600;
  vertical-align: middle;
}
::v-deep(.worker-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  border-bottom: 1px solid gray;

  .worker-list-detail {
    flex: 1 1 0;
  }

  .worker-price {
    font-size: 1.5rem;
    font-weight: 600;
    align-self: flex-end;
  }

  .worker-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}
@media only screen and (max-width: 768px) {
  .worker-list-item {
    flex-direction: column;
    align-items: center;
    border-bottom: 1px solid gray;

    .worker-list-detail {
      text-align: center;
    }

    .worker-price {
      font-size: 1rem;
      align-self: center;
    }

    .worker-list-action {
      display: flex;
      flex-direction: column;
    }

    .worker-list-action {
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      width: 100%;
    }
  }
}
</style>
