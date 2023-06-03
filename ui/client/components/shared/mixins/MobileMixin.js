import config from "../../../config/build";
const mobileBreakpoint = config.mobile.breakpoint;

export default {
  data() {
    return {
      isMobile: false
    };
  },
  created() {
    const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint}px)`);

    // Update the mobile state initially
    this.isMobile = mediaQuery.matches;

    // Add a listener for changes to the media query
    mediaQuery.addEventListener("change", this.updateMobileState);
  },
  beforeUnmount() {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    // Remove the listener when the component is unmounted
    mediaQuery.removeEventListener("change", this.updateMobileState);
  },
  methods: {
    updateMobileState(event) {
      this.isMobile = event.matches;
    }
  }
};
