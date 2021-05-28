<template>
  <base-card>
    <h1><u>House Keeper App</u></h1>

    <h2>~Made by~</h2>
    <strong class="name">Jonty P.</strong>
    <h3>Link to Resources</h3>
    <div v-for="resource in resources" v-bind:key="resource.link">
      <p>
        {{ resource.title }}:&nbsp;<br />
        <a target="_blank" :href="resource.link">{{ resource.linkText }}</a>
      </p>
    </div>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      resources: [
        {
          title: 'Components',
          link: 'https://primefaces.org/primevue/',
          linkText: 'Primefaces.org (Primevue)',
        },
        {
          title: 'Background Image',
          link: 'https://www.svgbackgrounds.com/',
          linkText: 'SVGBackgrounds.com',
        },
        {
          title: 'Other SVGs',
          link: 'https://undraw.co/',
          linkText: 'unDraw',
        },
        {
          title: 'Turtle Image',
          link: 'https://unsplash.com/photos/aMrDka0VGzU',
          linkText: 'Patrick Jansen on Unsplash',
        },
      ],
    };
  },
  methods: {
    changeText() {
      this.toggleText = !this.toggleText;
    },
  },
};
</script>

<style scoped>
.mycard {
  padding: 1rem;
  text-align: center;
}
.name {
  font-size: 1.5rem;
  color: rgb(0, 68, 255);
}
a {
  color: rgb(248, 134, 3);
  text-decoration: underline;
}
@media only screen and (max-width: 768px) {
  .mycard {
    padding-top: 2rem;
  }
}
</style>
Patrick Jansen
