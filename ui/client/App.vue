<template>
  <div class="top">
    <Toast position="top-left" group="tl" />
    <Toast position="bottom-left" group="bl" />
    <Toast position="bottom-right" group="br" />
    <ErrorBoundary>
      <div class="menu-pane">
        <NavBar :sections="routes" :current="currentRoute" />
      </div>
      <div class="mainPane">
        <ErrorBoundary>
          <router-view />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  </div>
</template>

<script>
import Toast from "primevue/toast";
import ErrorBoundary from "./components/shared/error/ErrorBoundary";
import NavBar from "./components/navigation/NavBar";
import { routes } from "./router/index";

export default {
  name: "App",
  components: { Toast, NavBar, ErrorBoundary },
  computed: {
    routes() {
      return routes;
    },
    currentRoute() {
      return this.$route.name;
    }
  }
};
</script>

<style>
.top {
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
:root {
  --mobile-breakpoint: 767px; /*mobile-breakpoint*/
}
.menu-pane {
  width: 100%;
  max-height: 45px;
  box-shadow: 0px 0px 5px grey;
  padding: 5px;
  z-index: 5;
  height: min-content;
  background-color: white;
  border-bottom: 2px solid #60789e;
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
.card-section {
  padding: 5px;
}
.card-section:first-child {
  padding-top: 0;
}

.card-section:last-child {
  padding-bottom: 0;
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
.icon-base {
  @apply text-blue-500;
  height: 25px;
  width: 25px;
}
.hide-last:last-child {
  display: none;
}
.text-main {
  @apply text-gray-500 !important;
}

@media only screen and (min-width: 650px) {
  :root {
    --scale: 1.01;
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
    filter: drop-shadow(2px 2px 2px #b4c3dc);
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
.vertical-center-flex {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.mobile-show {
  display: none;
}
@media only screen and (max-width: 767px /*mobile-breakpoint*/) {
  .mobile-one-col {
    flex-wrap: wrap;
  }
  .mobile-one-col > div {
    flex-basis: 51% !important;
    flex-shrink: 0 !important;
    flex-grow: 1 !important;
  }
  .mobile-hide {
    display: none;
  }
  .mobile-show {
    display: block;
  }
  .mobile-invisible {
    visibility: hidden;
  }
  .mobile-opaque {
    opacity: 0;
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
