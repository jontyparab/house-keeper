<template>
  <div class="infocard p-shadow-4" :class="requestState" v-if="show && worker">
    <!-- ONLY IN REQUESTS -->
    <div v-if="type == 'customer'">
      <div>
        <b
          ><u>Status: {{ requestState.toUpperCase() }}</u></b
        >
      </div>
      <div><b>Worker Name:</b> {{ fullName }}</div>
      <div><b>City:</b> {{ worker.city }}</div>
      <div v-if="requestState == 'accepted'">
        <b>Phone:</b> {{ worker.phone }}
      </div>
    </div>

    <!-- ONLY IN MY WORK -->
    <div v-if="type == 'worker'">
      <div><b>Customer Name:</b> {{ request.customerName }}</div>
      <div><b>City:</b> {{ request.customerCity }}</div>
      <div v-if="requestState == 'accepted'">
        <b>Phone:</b> {{ request.customerPhone }}
      </div>
    </div>

    <!-- Both -->
    <div><b>Preferred Time:</b> {{ preferTime }}</div>
    <div><b>Instructions:</b> {{ request.instructions }}</div>
    <div><b>Work:</b> {{ selectedWork.join(', ') }}</div>

    <div class="p-d-flex p-jc-around" v-if="type == 'customer'">
      <Button
        @click="cancelRequest"
        :label="
          requestState == 'accepted' || requestState == 'pending'
            ? 'Cancel'
            : 'Remove'
        "
        class="p-button-raised p-button-rounded p-button-danger p-col-6 p-md-4 p-mx-1"
      ></Button>
      <Button
        @click="detailsLink"
        label="Details"
        class="p-text-bold p-button-rounded p p-button-raised p-col-6 p-md-4 p-mx-1"
      ></Button>
    </div>
    <div
      class="p-d-flex p-jc-around"
      v-if="type == 'worker' && requestState == 'pending'"
    >
      <Button
        @click="declineRequest"
        label="Decline"
        class="p-button-raised p-button-rounded p-button-danger  p-col-6 p-md-4 p-mx-1"
      ></Button>
      <Button
        @click="acceptRequest"
        label="Accept"
        class="p-button-raised p-button-rounded p-button-success  p-col-6 p-md-4 p-mx-1"
      ></Button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { fmtTime } from '../../assets/js/myFunctions.js';

export default {
  props: ['request', 'type'],
  data() {
    return {
      worker: {},
    };
  },
  computed: {
    ...mapGetters('base', ['workersList']),
    fullName() {
      return this.worker.firstName + ' ' + this.worker.lastName;
    },
    preferTime() {
      return fmtTime(this.request.preferTime);
    },
    selectedWork() {
      const providedServices = [];
      if (this.request.works) {
        this.request.works.forEach((work) => {
          providedServices.push(work.label);
        });
        return providedServices;
      } else return [];
    },
    requestState() {
      return this.request.requestState;
    },
    show() {
      if (this.requestState == 'declined' && this.type == 'worker') {
        return false;
      } else return true;
    },
  },
  methods: {
    async cancelRequest() {
      if (this.requestState != 'declined') {
        this.$confirm.require({
          message: `The request status is ${this.requestState.toUpperCase()}. Do you really wish to CANCEL it?`,
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
            await this.$store.dispatch(
              'base/cancelRequest',
              this.request.requestId
            );
          },
        });
      } else {
        await this.$store.dispatch(
          'base/cancelRequest',
          this.request.requestId
        );
      }
    },
    detailsLink() {
      this.$router.push({
        name: 'WorkerDetails',
        params: { id: `${this.request.workerId}` },
      });
    },
    acceptRequest() {
      this.$store.dispatch('base/acceptRequest', this.request.requestId);
    },
    declineRequest() {
      this.$store.dispatch('base/declineRequest', this.request.requestId);
    },
    getWorkerDetails() {
      if (this.type == 'customer') {
        this.worker = this.workersList?.find((worker) => {
          return worker.id === this.request.workerId;
        });
      }
    },
  },
  mounted() {
    this.getWorkerDetails();
  },
};
</script>

<style scoped>
.infocard {
  background: white;
  margin: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem;
  border-radius: 20px;
  width: 40rem;
  max-width: 100%;
  max-height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.accepted {
  background-color: rgb(112, 202, 147);
  border: 2px solid rgb(93, 248, 88);
}
.declined {
  background-color: rgb(238, 144, 144);
  border: 2px solid rgb(187, 63, 63);
}
.pending {
  background-color: rgb(161, 220, 228);
  border: 2px solid rgb(63, 148, 187);
}
@media only screen and (max-width: 768px) {
}
</style>
