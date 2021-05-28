<template>
  <base-card :showSpinner="showSpinner">
    <TabView ref="tab1">
      <TabPanel header="User Details">
        <div class="header p-d-flex p-flex-wrap">
          <h1>Your Details</h1>

          <Button
            class="p-button-rounded p-text-bold p-ml-auto p-button-info"
            label="Last Saved"
            style="box-shadow: none"
            @click="lastSaved"
            v-if="hireRoute"
          />
        </div>
        <small class="p-text-bold" v-if="hireRoute">
          *Please make appropriate changes where required.
        </small>
        <div v-if="!showSpinner">
          <form class="form-group" @submit.prevent="formType">
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
                <div class="p-field p-col-12 p-md-8">
                  <label for="address">Address (Optional)</label>
                  <Textarea
                    rows="4"
                    :autoResize="true"
                    v-model.trim="lcladdress"
                    maxlength="100"
                    title="Address should not be more than 100 characters long."
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
                    maxlength="30"
                    title="City name should not be more than 30 characters and is mandatory."
                  />
                  <small
                    >City will help you find housekeepers closer to you.</small
                  >
                  <Button
                    label="Get City"
                    class="p-text-bold"
                    icon="pi pi-check"
                    iconPos="right"
                    @click="getCity"
                  />
                </div>
                <div class="p-field p-col-12 p-md-4">
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
                <div class="p-field p-col-12 p-md-4">
                  <label for="work">Hire for:</label>
                  <MultiSelect
                    v-model="lclhireFor"
                    :options="servicesProvided"
                    optionLabel="label"
                    placeholder="Select Work"
                    :filter="true"
                    display="chip"
                    :disabled="!hireRoute"
                    :required="hireRoute"
                  >
                    <template #option="slotProps">
                      <div class="job-category">
                        <div>{{ slotProps.option.label }}</div>
                      </div>
                    </template>
                  </MultiSelect>
                </div>
                <div class="p-field p-col-12 p-md-4">
                  <label for="toTime">Preferred Time:</label>
                  <Calendar
                    v-model="lclpreferTime"
                    :timeOnly="true"
                    pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$"
                    hourFormat="24"
                  />
                </div>
                <div class="p-field p-col-12">
                  <label for="address">Instructions for Worker:</label>
                  <Textarea
                    rows="2"
                    :autoResize="true"
                    v-model="lclinstructions"
                    maxlength="80"
                    title="Address should not be more than 80 characters long."
                  />
                </div>
                <div class="p-col-6 p-md-6 p-p-1">
                  <Button
                    @click="resetForm"
                    label="Reset"
                    class="p-button-raised p-button-rounded p-button-secondary"
                  />
                </div>
                <div class="p-col-6 p-md-6 p-p-1">
                  <Button
                    type="submit"
                    :label="hireRoute ? 'Request' : 'Save'"
                    class="p-button-raised p-button-rounded p-button-success"
                  />
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </TabPanel>

      <TabPanel header="Requests">
        <div class="header p-d-flex p-flex-wrap">
          <h1><u>Requests</u></h1>
          <Button
            class="p-button-rounded p-button-outlined p-text-bold p-ml-auto p-button-info p-mt-1"
            label="Refresh"
            style="box-shadow: none"
            @click="refreshRequests"
          />
        </div>
        <div v-if="!showSpinner">
          <div v-if="noTasks">
            <h2>No requests found...</h2>
            <div class="img-container">
              <img src="../assets/images/taken.svg" />
            </div>
          </div>
          <info-card
            v-else
            v-for="request in sentRequests"
            :key="request.requestId"
            type="customer"
            :request="request"
          ></info-card>
        </div>
      </TabPanel>
    </TabView>
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
      lclfirstName: '',
      lcllastName: '',
      lclphone: '',
      lclcity: '',
      lcladdress: '',
      lclhireFor: [],
      lclpreferTime: new Date(),
      lclinstructions: '',
      lclrequests: [],
    };
  },
  computed: {
    ...mapGetters('base', ['workersList', 'requests']),
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
    ...mapGetters('customer', ['preferTime', 'instructions']),
    sentRequests() {
      let sentReqs = [];
      for (const request of this.requests) {
        if (request.customerId == this.id) {
          sentReqs.push(request);
        }
      }
      return sentReqs;
    },
    hireRoute() {
      if (this.$route.name === 'HireForm') return true;
      else return false;
    },
    formType() {
      return this.hireRoute ? this.sendRequest : this.saveForm;
    },
    servicesProvided() {
      //UserForm will not show hireFor when on UserForm route.
      if (this.hireRoute) {
        const worker = this.workersList.find(
          (worker) => worker.id === this.$route.params.id
        );
        if (worker) return worker.selectedWorks;
        else return [];
      } else return [];
    },
    noTasks() {
      const x = this.requests.length === 0;
      const y = this.requests.filter((request) => {
        return request.customerId == this.id;
      });
      if (x || y.length == 0) {
        return true;
      } else return false;
    },
  },
  methods: {
    async saveForm() {
      const userDetails = {
        firstName: this.lclfirstName,
        lastName: this.lcllastName,
        phone: this.lclphone,
        city: this.lclcity,
        address: this.lcladdress,
        preferTime: this.lclpreferTime,
        instructions: this.lclinstructions,
      };
      try {
        this.showSpinner = true;
        await this.$store.dispatch('saveUser', userDetails);
        this.$toast.add(Msgs.formSavedMsg);
      } catch (error) {
        console.log(error);
      } finally {
        this.showSpinner = false;
      }
    },
    async sendRequest() {
      const request = {
        workerId: this.$route.params.id,
        customerId: this.id,
        customerName: this.lclfirstName + ' ' + this.lcllastName,
        customerCity: this.lclcity,
        customerPhone: this.lclphone,
        preferTime: this.lclpreferTime,
        works: this.lclhireFor,
        instructions: this.lclinstructions,
      };
      this.showSpinner = true;
      this.$store.dispatch('base/saveRequest', request);
      this.showSpinner = false;
      this.$toast.add(Msgs.sentRequestMsg);

      //Replace to UserForm, in request tab
      this.$router.replace({ name: 'WorkersList' });
    },

    async getCity() {
      try {
        const data = await getLocation();
        this.lclcity = data.locality;
      } catch (error) {
        console.log('ERROR from UserForm:', error.message);
      }
    },
    lastSaved() {
      this.$confirm.require({
        message:
          'Currently entered details will be replaced by last saved details. Continue?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.setDetails();
          this.$toast.add(Msgs.lastSavedConfirmMsg);
        },
      });
    },
    resetForm() {
      this.$confirm.require({
        message: 'The local form will be reset. Continue?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          // to bind the context of the 'this' keyword .apply(this) is used.
          Object.assign(this.$data, this.$options.data.apply(this));
          this.$toast.add(Msgs.resetFormMsg);
        },
      });
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
    setDetails() {
      this.lclfirstName = this.firstName;
      this.lcllastName = this.lastName;
      this.lclphone = this.phone;
      this.lclcity = this.city;
      this.lcladdress = this.address;
      this.lclhireFor = [];
      this.lclpreferTime = this.preferTime;
      this.lclinstructions = this.instructions;
      this.lclrequests = this.requests;
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
</style>
