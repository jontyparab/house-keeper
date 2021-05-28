<template>
  <base-card class="mycard" :showSpinner="showSpinner">
    <h1 class="p-text-center p-mt-3">House Keeper</h1>
    <img src="../assets/images/house.svg" />
    <p class="p-text-center p-mt-1 p-text-bold">
      {{ isSignUp ? 'Sign Up' : 'Login' }}
    </p>
    <form class="form-group" @submit.prevent="authenticate">
      <fieldset :disabled="showSpinner">
        <div class="p-fluid p-formgrid p-grid input-custom">
          <div class="p-field p-col-12 p-md-6 p-mt-2" v-if="isSignUp">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <InputText
                placeholder="First Name"
                v-model="firstName"
                type="text"
                pattern="[A-Za-z]*"
                required
                title="This field is mandatory."
              />
            </div>
          </div>
          <div class="p-field p-col-12 p-md-6 p-mt-2" v-if="isSignUp">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Last Name"
                v-model="lastName"
                type="text"
                pattern="[A-Za-z]*"
                required
                title="This field is mandatory."
              />
            </div>
          </div>
          <div class="p-field p-col-12 p-md-12 p-mt-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-envelope"></i>
              </span>
              <InputText
                placeholder="Email"
                v-model="email"
                type="email"
                required
              />
            </div>
          </div>
          <div class="p-field p-col-12 p-md-12 p-mt-2">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
              </span>
              <InputText
                placeholder="Password"
                v-model="password"
                type="password"
                minlength="8"
                required
              />
            </div>
          </div>
          <div class="p-field p-col-12 p-md-12 p-mt-2" v-if="isSignUp">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">
                <i class="pi pi-lock"></i>
              </span>
              <InputText
                placeholder="Confirm Password"
                v-model="confirmPassword"
                type="password"
                minlength="8"
                required
              />
            </div>
          </div>
        </div>

        <div
          class="button-controls p-d-flex p-jc-around p-mt-2 p-text-center p-mb-5"
        >
          <Button class="p-button-sm" type="submit" :disabled="isSignUp"
            ><strong>Log In</strong>
          </Button>
          <InputSwitch v-model="isSignUp" @click="toggleSwitch" />
          <Button
            class="p-button-sm p-text-bold"
            type="submit"
            :disabled="!isSignUp"
            ><strong>Sign Up</strong>
          </Button>
        </div>
      </fieldset>
    </form>
  </base-card>
</template>

<script>
import InputSwitch from 'primevue/inputswitch';
import Msgs from '../assets/js/toastMessages.js';

export default {
  data() {
    return {
      showSpinner: false,
      isSignUp: false,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  components: {
    InputSwitch,
  },
  computed: {
    authenticate() {
      return this.isSignUp ? this.signup : this.login;
    },
  },
  methods: {
    submitForm() {
      if (!this.email.includes('@')) {
        console.log('Please enter a valid email.');
        return false;
      } else if (this.isSignUp && !(this.password === this.confirmPassword)) {
        this.$toast.add(Msgs.pswdMatchFaileddMsg);
        console.log('Password did not match.');
        return false;
      } else return true;
    },
    toggleSwitch() {
      this.isSignUp = !this.isSignUp;
    },
    async signup() {
      if (this.submitForm()) {
        this.showSpinner = true;
        try {
          await this.$store.dispatch('signup', {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
          });
          this.showSpinner = false;
          this.$router.replace({ name: 'WorkersList' });
        } catch (error) {
          console.log(error.message);
          this.$toast.add(Msgs.signupFailedMsg);
        } finally {
          this.showSpinner = false;
        }
      }
    },
    async login() {
      if (this.submitForm()) {
        this.showSpinner = true;
        try {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
          this.showSpinner = false;
          this.$router.replace({ name: 'WorkersList' });
        } catch (error) {
          console.log(error.message);
          this.$toast.add(Msgs.loginFailedMsg);
        } finally {
          this.showSpinner = false;
        }
      }
    },
  },
};
</script>

<style scoped>
fieldset {
  border: none;
}
.mycard {
  width: 40rem;
  padding-top: 2rem;
}
img {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  text-align: center;
}
p {
  font-size: 1.5rem;
}
.input-custom {
  padding-left: 1rem;
  padding-right: 1rem;
}
@media only screen and (max-width: 768px) {
  .mycard {
    border-radius: 0px !important;
    height: 100vh !important;
    width: 100vw !important;
  }
  .input-custom {
    padding-left: initial;
    padding-right: initial;
  }
}
</style>
