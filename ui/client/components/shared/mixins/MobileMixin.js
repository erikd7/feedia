import config from "../../../../config/build";
const mobileBreakpoint = config.mobile.breakpoint;

export default {
  data() {
    return {
      isMobile: false
    };
  },
  created() {
    const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint})`);

    // Update the mobile state initially
    this.isMobile = mediaQuery.matches;

    // Add a listener for changes to the media query
    mediaQuery.addListener(this.updateMobileState);
  },
  beforeUnmount() {
    const mediaQuery = window.matchMedia(`(max-width: ${mobileBreakpoint})`);

    // Remove the listener when the component is unmounted
    mediaQuery.removeListener(this.updateMobileState);
  },
  methods: {
    updateMobileState(event) {
      this.isMobile = event.matches;
    }
  }
};
