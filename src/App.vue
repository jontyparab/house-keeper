<template>
  <sidebar-wrapper>
    <Toast />
    <router-view v-slot="{ Component }">
      <transition name="slide-left" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </sidebar-wrapper>
</template>

<script>
import SidebarWrapper from './components/UI/SidebarWrapper.vue';
export default {
  data() {
    return {};
  },
  components: { SidebarWrapper },
  methods: {
    async loadAll() {
      try {
        await this.$store.dispatch('base/loadWorkersList', true);
        await this.$store.dispatch('loadUser');
        await this.$store.dispatch('base/loadRequests', true);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  mounted() {
    this.loadAll();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  box-sizing: border-box;
  font-family: Nunito, sans-serif;
}
html {
  //So user can't scroll between the transition
  overflow: clip;
}
/* Background */
body {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('./assets/images/suntornado.svg');
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
}
a {
  text-decoration: none;
  color: inherit;
}

/* MultiSelect Responsive */
.p-multiselect-label {
  //So conatiner won't expand
  max-width: 55vw !important;
}

// Tabs
.p-tabview .p-tabview-panels {
  padding: 0px !important;
}
.p-tabview-nav {
  padding-top: 1.5rem !important;
}
// Toasts
.p-toast {
  max-width: 90vw;
}

/*Custom Scroll Bar*/
/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #4040406c;
  border-radius: 5px;
}
/* Contain the Track piece within the div */
::-webkit-scrollbar-track-piece {
  background: transparent;
  margin: 1rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: grey;
}
/* No data in Card show SVG */
.img-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}
img {
  width: 25vw;
}
/* Sidebar backdrop issue */
.p-sidebar-mask {
  display: none;
}
.p-sidebar ~ .p-sidebar-mask {
  display: block;
}

/* Transition */
.slide-left-enter-active {
  animation: slide-left-entered 0.4s ease-out;
}
.slide-left-leave-active {
  animation: slide-left-left 0.4s ease-in;
}
@keyframes slide-left-entered {
  from {
    transform: translateX(100vw);
    // opacity: 0;
  }

  to {
    transform: translateX(0);
    // opacity: 1;
  }
}
@keyframes slide-left-left {
  from {
    transform: translateX(0);
    // opacity: 1;
  }

  to {
    transform: translateX(-100vw);
    // opacity: 0;
  }
}
@media only screen and (max-width: 768px) {
  body {
    //So background won't glitch on smaller viewport
    background-attachment: initial;
  }
  .img-container img {
    width: 60vw;
  }
  .img-container {
    margin-top: 5rem;
  }
}
</style>
