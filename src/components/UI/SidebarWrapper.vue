<template>
  <teleport to="body">
    <ConfirmDialog></ConfirmDialog>
    <Sidebar
      class="p-m-0 p-p-0"
      v-model:visible="visibleLeft"
      :showCloseIcon="false"
    >
      <Button
        class="p-button-sm p-d-block p-mt-4 p-ml-5 p-text-bold"
        :icon="isLoggedIn ? 'pi pi-sign-out' : 'pi pi-sign-in'"
        @click="authRoute"
        :label="isLoggedIn ? 'Logout' : 'Login/Register'"
      />
      <Avatar
        :label="avaChar"
        class="p-ml-4 p-mt-3 p-shadow-1"
        :style="avaStyle"
        size="large"
        shape="circle"
      />
      <span class="p-ml-3" style="font-size: 1.5rem">{{
        isLoggedIn ? fullName : 'Guest User'
      }}</span>
      <ul>
        <router-link
          :to="{ name: item.linkTo }"
          @click="changeActiveItem"
          :key="item.label"
          v-for="item in items"
        >
          <li class="" v-if="isLoggedIn ? true : !item.auth">
            <i :class="['pi', 'pi-' + item.icon]" style="font-size: 1.5rem"
              >&nbsp;</i
            ><span>{{ item.label }}</span>
          </li>
        </router-link>
      </ul>
    </Sidebar>
    <Button
      icon="pi pi-bars"
      class="sidebar-button p-m-1 p-shadow-1"
      @click="changeActiveItem"
      :disabled="visibleLeft"
      v-if="!visibleLeft"
    />
  </teleport>
  <!-- Main Content Slot -->
  <slot></slot>
</template>

<script>
import Sidebar from 'primevue/sidebar';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      visibleLeft: false,
      items: [
        {
          label: 'Search Worker',
          icon: 'search',
          linkTo: 'WorkersList',
          auth: false,
        },
        {
          label: 'User Profile',
          icon: 'users',
          linkTo: 'UserForm',
          auth: true,
        },
        {
          label: 'Worker Profile',
          icon: 'user-edit',
          linkTo: 'WorkerForm',
          auth: true,
        },
        { label: 'About', icon: 'book', linkTo: 'About', auth: false },
      ],
    };
  },
  components: {
    Sidebar,
  },
  computed: {
    ...mapGetters(['isLoggedIn']),
    ...mapGetters(['firstName', 'lastName']),
    authIcon() {
      return this.isLoggedIn ? 'sign-out' : 'sign-in';
    },
    authRoute() {
      return this.isLoggedIn ? this.logout : this.goAuth;
    },
    avaChar() {
      if (this.firstName) {
        return this.firstName.charAt(0);
      } else {
        return '%';
      }
    },
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    avaStyle() {
      return {
        'background-color': '#2196F3',
        color: '#ffffff',
      };
    },
  },
  methods: {
    changeActiveItem() {
      this.visibleLeft = !this.visibleLeft;
    },
    goAuth() {
      this.$router.push({ name: 'Auth' });
      this.changeActiveItem();
    },
    logout() {
      // const route = this.$router.resolve({ name: 'Auth' });
      this.$store.dispatch('logout');
      this.changeActiveItem();
      // console.log(
      //   `${location.protocol}//${location.hostname}${
      //     location.port ? ':' + location.port : ''
      //   }/${route.href}`
      // );
    },
  },
};
</script>

<style scoped>
/* Sidebar */
ul {
  list-style-type: none;
  margin: 0px;
  margin-top: 1rem;
  padding: 0px;
}
li {
  cursor: pointer;
  margin: none;
  text-decoration: none;
  font-size: 1.5rem;
  padding-top: 1rem;
  padding-bottom: 0.5em;
  padding-left: 2rem;
}
li:hover:not(a.router-link-active > li) {
  background-color: #d89271;
  border-radius: 0px 30px 30px 0px;
}
a.router-link-active > li {
  color: white;
  background: #e2703a;
  border-radius: 0px 30px 30px 0px;
}
/* Sidebar button */
.sidebar-button {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 50;
  border: 1px solid var(--cyan-800);
  background-color: var(--cyan-800);
  border-radius: 50%;
  color: whitesmoke;
}
.sidebar-button:hover,
.sidebar-button:active {
  background-color: var(--cyan-800) !important;
  border: 1px solid var(--cyan-800) !important;
  color: white !important;
}
</style>
