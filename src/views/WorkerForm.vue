<template>
  <base-card :showSpinner="showSpinner">
    <TabView ref="tab1">
      <TabPanel header="Profile">
        <div v-if="lclisWorker && !showSpinner">
          <div class="header p-d-flex p-flex-wrap p-jc-between">
            <h1>Worker Registration Form</h1>
            <base-badge
              :status="status"
              :active="true"
              @setLclStatus="setLclStatus"
            ></base-badge>
          </div>
          <form class="form-group" @submit.prevent="saveForm">
            <fieldset style="border: none">
              <div class="p-fluid p-formgrid p-grid">
                <div class="p-field p-col-12 p-md-6">
                  <label for="firstname">Firstname</label>
                  <InputText
                    type="text"
                    class="p-text-capitalize"
                    required
                    pattern="[A-Za-z]*"
                    v-model.trim="lclfirstName"
                    maxlength="50"
                    title="Firstname should have only alpha characters. (MAX=50)"
                  />
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="lastname">Lastname</label>
                  <InputText
                    type="text"
                    class="p-text-capitalize"
                    pattern="[A-Za-z]*"
                    v-model.trim="lcllastName"
                    maxlength="50"
                    title="Lastname should have only alpha characters. (MAX=50)"
                  />
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <label for="address">Description</label>
                  <Textarea
                    rows="4"
                    :autoResize="true"
                    v-model.trim="lcldescription"
                    maxlength="100"
                    title="Address should not be more than 80 characters long."
                  />
                  <small>*This will help your clients know you better.</small>
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <label for="address">Address (Optional)</label>
                  <Textarea
                    rows="4"
                    :autoResize="true"
                    v-model.trim="lcladdress"
                    maxlength="80"
                    title="Address should not be more than 80 characters long."
                  />
                  <small
                    >*Address will <strong>never</strong> be shared with
                    anyone.</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <label for="city">City</label>
                  <InputText
                    type="text"
                    required
                    aria-required="city-help"
                    class="p-text-capitalize"
                    v-model.trim="lclcity"
                    maxlength="20"
                    title="City name should not be more than 30 characters and is mandatory."
                  />
                  <small
                    >City will help filter work available closer to you.</small
                  >
                  <Button
                    label="Get City"
                    class="p-text-bold"
                    icon="pi pi-check"
                    iconPos="right"
                    @click="getCity"
                  />
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="phone">Phone No.</label>
                  <div class="p-inputgroup">
                    <span class="p-inputgroup-addon"> +91 </span>
                    <InputText
                      required
                      placeholder="----------"
                      type="tel"
                      minlength="10"
                      maxlength="10"
                      v-model.trim="lclphone"
                    />
                  </div>
                </div>
                <div class="p-field p-col-12 p-md-6">
                  <label for="work">Select Work</label>
                  <MultiSelect
                    v-model="lclselectedWorks"
                    :options="jobs"
                    optionLabel="label"
                    placeholder="Select Work"
                    :filter="true"
                    display="chip"
                    required
                  >
                    <template #option="slotProps">
                      <div>
                        <div>{{ slotProps.option.label }}</div>
                      </div>
                    </template>
                  </MultiSelect>
                </div>

                <div class="p-field p-col-12 p-md-4">
                  <label for="Basepay">
                    Pay: ₹ {{ lclbasePay[0] }} - ₹ {{ lclbasePay[1] }}
                  </label>
                  <Slider
                    aria-required="pay-help"
                    class="p-mb-1"
                    v-model="lclbasePay"
                    :step="200"
                    :range="true"
                    :min="800"
                    :max="5000"
                  />
                  <small class="p-text-bold"
                    >*This pay range is only for filtering. You can finalize pay
                    over a phone call with the client.</small
                  >
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <label for="fromTime">Available From</label>
                  <Calendar
                    v-model="lclfromTime"
                    :timeOnly="true"
                    pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
                    hourFormat="24"
                  />
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <label for="toTime">Available Till</label>
                  <Calendar
                    v-model="lcltoTime"
                    :timeOnly="true"
                    pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
                    hourFormat="24"
                  />
                </div>
                <div class="p-col-12 p-p-1">
                  <Button
                    @submit="saveForm"
                    type="submit"
                    label="Save"
                    class="p-button-raised p-button-rounded p-button-success"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </TabPanel>
      <TabPanel header="My Work">
        <div class="header p-d-flex p-flex-wrap" v-if="lclisWorker">
          <h1><u>Work</u></h1>
          <Button
            class="p-button-rounded p-button-outlined p-text-bold p-ml-auto p-button-info p-mt-1"
            label="Refresh"
            style="box-shadow: none"
            @click="refreshRequests"
          />
        </div>
        <div v-if="!showSpinner && lclisWorker">
          <div v-if="noTasks">
            <h2>No work found...</h2>
            <div class="img-container">
              <img src="../assets/images/taken.svg" />
            </div>
          </div>
          <info-card
            v-else
            v-for="request in recRequests"
            :key="request.requestId"
            type="worker"
            :request="request"
          ></info-card>
        </div>
      </TabPanel>
    </TabView>

    <div v-if="!showSpinner && !lclisWorker">
      <div class="p-d-flex p-flex-column p-jc-center p-ai-center">
        <h1 class="p-my-5"><u>Worker Section</u></h1>
        <p class="p-text-bold p-m-5 p-mb-1">
          Click on the button below to register as a Worker.
        </p>
        <Button
          class="p-button-rounded p-text-bold p-button-info p-mt-1 p-ml-auto p-mr-auto"
          label="REGISTER AS WORKER"
          style="box-shadow: none"
          @click="unlockWorker"
        />
      </div>
    </div>
  </base-card>
</template>

<script>
import { getLocation } from '../assets/js/myFunctions.js';
import Msgs from '../assets/js/toastMessages.js';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      showSpinner: false,
      //lclisWorker only to display the button or form screen
      lclisWorker: false,
      lclfirstName: '',
      lcllastName: '',
      lclphone: '',
      lclcity: '',
      lcladdress: '',
      lcldescription: '',
      lclselectedWorks: [],
      lclbasePay: [],
      lclfromTime: new Date(),
      lcltoTime: new Date(),
    };
  },
  computed: {
    ...mapGetters('base', ['jobs', 'requests']),
    ...mapGetters([
      'isLoggedIn',
      'id',
      'firstName',
      'lastName',
      'phone',
      'city',
      'address',
      'isWorker',
    ]),
    ...mapGetters('worker', [
      'status',
      'description',
      'basePay',
      'selectedWorks',
      'fromTime',
      'toTime',
    ]),
    recRequests() {
      let recReqs = [];
      for (const request of this.requests) {
        if (request.workerId == this.id) {
          recReqs.push(request);
        }
      }
      return recReqs;
    },
    noTasks() {
      const x = this.requests.length === 0;
      const y = this.requests.filter((request) => {
        if (request.workerId == this.id) {
          return request.requestState != 'declined';
        }
      });
      if (x || y.length === 0) {
        return true;
      } else return false;
    },
  },
  methods: {
    unlockWorker() {
      this.$confirm.require({
        message:
          'This section is only for workers. Do you wish to register as a worker?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => (this.lclisWorker = true),
      });
    },
    async saveForm() {
      const userDetails = {
        firstName: this.lclfirstName,
        lastName: this.lcllastName,
        phone: this.lclphone,
        city: this.lclcity,
        address: this.lcladdress,
        status: this.lclstatus,
        description: this.lcldescription,
        selectedWorks: this.lclselectedWorks,
        basePay: this.lclbasePay,
        fromTime: this.lclfromTime,
        toTime: this.lcltoTime,
        isWorker: this.lclisWorker,
      };
      if (!this.isWorker) {
        await this.$confirm.require({
          message: 'You are about to register yourself as a Worker. Proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: async () => {
            try {
              this.showSpinner = true;
              await this.$store.dispatch('saveUser', userDetails);
              this.$toast.add(Msgs.registeredWorkerConfirmMsg);
            } catch (error) {
              console.error('Error from WorkerForm:', error.message);
            } finally {
              this.showSpinner = false;
            }
          },
        });
      } else {
        try {
          this.showSpinner = true;
          await this.$store.dispatch('saveUser', userDetails);
          this.$toast.add(Msgs.formSavedMsg);
        } catch (error) {
          console.error('Error from WorkerForm:', error.message);
        } finally {
          this.showSpinner = false;
        }
      }
    },
    async getCity() {
      try {
        const data = await getLocation();
        this.lclcity = data.locality;
      } catch (error) {
        console.log('ERROR from WorkForm:', error.message);
      }
    },
    setDetails() {
      this.lclfirstName = this.firstName;
      this.lcllastName = this.lastName;
      this.lclphone = this.phone;
      this.lclcity = this.city;
      this.lcladdress = this.address;
      this.lcldescription = this.description;
      this.lclselectedWorks = this.selectedWorks;
      this.lclbasePay = this.basePay;
      this.lclfromTime = this.fromTime;
      this.lcltoTime = this.toTime;
      this.lclisWorker = this.isWorker;
    },
    setLclStatus(lclstatus) {
      this.lclstatus = lclstatus;
    },
    async refreshRequests() {
      try {
        this.showSpinner = true;
        await this.$store.dispatch('base/loadRequests', true);
      } catch (error) {
        console.log(error);
      } finally {
        this.showSpinner = false;
      }
    },
  },
  mounted() {
    this.showSpinner = true;
    setTimeout(() => {
      this.setDetails();
      this.showSpinner = false;
    }, 1000);
  },
};
</script>

<style scoped>
.mycard {
  width: 70vw;
  height: auto;
  min-height: 80vh;
}
.unlock-container {
  height: 100%;
  width: 100%;
}
</style>
