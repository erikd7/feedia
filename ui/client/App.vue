<template>
  <div id="app">
    <div class="menu-pane-holder" />
    <div
      class="menu-pane"
      :class="{
        'menu-pane-expanded': isExpanded
      }"
      @Click="toggleExpanded"
      v-click-away="toggleOffExpanded"
    >
      <NavBar
        :sections="routes"
        :current="currentRoute"
        :toggleExpanded="toggleExpanded"
      />
    </div>
    <div class="mainPane">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/navigation/NavBar";
import { routes } from "./router/index";
import { mixin as clickaway } from "vue3-click-away";

export default {
  name: "App",
  components: {
    NavBar
  },
  data() {
    return {
      isExpanded: false
    };
  },
  computed: {
    routes() {
      return routes;
    },
    currentRoute() {
      return this.$route.name;
    }
  },
  methods: {
    toggleExpanded(forcedValue) {
      if (typeof forcedValue === "boolean") this.isExpanded = forcedValue;
      this.isExpanded = !this.isExpanded;
    },
    toggleOffExpanded() {
      this.isExpanded = false;
    }
  },
  mixins: [clickaway],
  created() {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: black;
  display: flex;
  flex-flow: wrap;
  height: 100vh;
  overflow-y: hidden;
}
.menu-pane,
.menu-pane-holder {
  width: 100%;
  border-bottom: 2px solid #60789e;
  overflow-y: hidden;
  overflow-x: hidden;
  max-height: 45px;
  position: absolute;
}
.menu-pane {
  box-shadow: 0px 0px 5px grey;
  padding: 5px;
  z-index: 5;
  height: min-content;
  background-color: white;
}
.menu-pane-holder {
  height: inherit;
  position: relative;
  display: block;
}
.mainPane {
  height: calc(100vh - 45px);
  overflow-y: auto;
  width: 100%;
  padding: 5px;
}
.mainPane-container {
  padding: 5px;
}
.button {
  color: white;
  background-color: #60789e;
  border-radius: 8px;
  padding: 3px;
  border: 1px solid #60789e;
}
.button:hover {
  color: white;
  background-color: #425677;
  cursor: pointer;
}
.button:disabled {
  color: white;
  background-color: #bac3cd;
  border-radius: 8px;
  padding: 3px;
  border: 1px solid #bac3cd;
  cursor: default;
}
.link {
  color: blue;
}
.link:hover {
  text-decoration: underline;
}
.middle {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media only screen and (min-width: 650px) {
  :root {
    --scale: 1.1;
  }
  .hover-grow {
    transition: all 0.15s ease-in-out;
    transform-origin: 50% 50%;
    transform-box: fill-box;
    -webkit-font-smoothing: subpixel-antialiased;
    will-change: font-size;
  }
  .hover-grow:hover {
    transform: scale(var(--scale));
    filter: drop-shadow(2px 2px 2px #425677);
  }
  .no-grow {
    transform: scale(1) !important;
  }
}
.transition-smooth {
  transition: all var(--duration, 0.2) ease-in-out;
}
.vertical-center {
  transform: translateY(-50%);
  top: 50%;
  position: relative;
}
.image-display {
  border-radius: 10px;
  object-fit: cover;
  width: 300px;
}
@media only screen and (max-width: 650px) {
  .mobile-one-col {
    flex-wrap: wrap;
  }
  .mobile-one-col > div {
    flex-basis: 51% !important;
    flex-shrink: 0 !important;
    flex-grow: 1 !important;
  }
}
/* Animations */
:nth-child(1) {
  --nth-child: 1;
}
:nth-child(2) {
  --nth-child: 2;
}
:nth-child(3) {
  --nth-child: 3;
}
:nth-child(4) {
  --nth-child: 4;
}
:nth-child(5) {
  --nth-child: 5;
}
:nth-child(6) {
  --nth-child: 6;
}
:nth-child(7) {
  --nth-child: 7;
}
:nth-child(7) {
  --nth-child: 7;
}
:nth-child(8) {
  --nth-child: 8;
}
:nth-child(9) {
  --nth-child: 9;
}
:nth-child(10) {
  --nth-child: 10;
}

.slide-in-from-left {
  animation: slide-in-from-left;
  animation-duration: 1s;
  position: relative;
}
@keyframes slide-in-from-left {
  0% {
    left: -30vw;
  }
  100% {
    left: 0;
  }
}

.slide-fade-up,
.slide-fade-up-grandchild > div > div,
.slide-fade-up-grandchild > div > span {
  animation: slide-fade-up;
  animation-duration: calc(var(--nth-child) * 0.25s);
  position: relative;
}
@keyframes slide-fade-up {
  0% {
    bottom: -100px;
    opacity: 0;
  }

  100% {
    bottom: 0;
    opacity: 1;
  }
}

.fade-in {
  animation: fade-in;
  animation-duration: var(--duration, 2s);
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.slide-fade-left {
  animation: slide-fade-left;
  animation-duration: var(--duration, 1s);
  position: relative;
}
@keyframes slide-fade-left {
  0% {
    left: -100px;
    opacity: 0;
  }

  100% {
    left: 0;
    opacity: 1;
  }
}
.slide-fade-right {
  animation: slide-fade-right;
  animation-duration: var(--duration, 1s);
  position: relative;
}
@keyframes slide-fade-right {
  0% {
    right: -100px;
    opacity: 0;
  }

  100% {
    right: 0;
    opacity: 1;
  }
}
</style>
