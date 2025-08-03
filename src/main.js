import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Import Bootstrap JavaScript
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const app = createApp(App, { loading: true });

// Global loader control
let loaderTimeout = null;

router.beforeEach((to, from, next) => {
  // Show loader immediately on route change
  if (app._instance && app._instance.proxy.setLoader) {
    app._instance.proxy.setLoader(true);
  }
  // Optionally, add a fallback timeout in case afterEach doesn't fire
  if (loaderTimeout) clearTimeout(loaderTimeout);
  loaderTimeout = setTimeout(() => {
    if (app._instance && app._instance.proxy.setLoader) {
      app._instance.proxy.setLoader(false);
    }
  }, 12000); // fallback: hide loader after 12s max
  next();
});

router.afterEach(() => {
  // Hide loader after navigation and component mount
  setTimeout(() => {
    if (app._instance && app._instance.proxy.setLoader) {
      app._instance.proxy.setLoader(false);
    }
    if (loaderTimeout) clearTimeout(loaderTimeout);
  }, 900); // match the previous smoothness delay
});

app.use(router).mount("#app");
