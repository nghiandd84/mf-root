import {
  constructRoutes,
  constructApplications,
  constructLayoutEngine,
} from "single-spa-layout";
import { registerApplication, start } from "single-spa";

const routes = constructRoutes(document.querySelector("#single-spa-layout"), {
  loaders: {
    userApp: "<h1>Loading User app</h1>",
    dashboardApp: "<h1>Loading Dashboard app</h1>",
  },
  errors: {
    userApp: "<h1>Failed to load User app</h1>",
    dashboardApp: "<h1>Failed to load Dashboard app</h1>",
  },
});
const applications = constructApplications({
  routes,
  loadApp: ({ name }) => System.import(name),
});
// Delay starting the layout engine until the styleguide CSS is loaded
const layoutEngine = constructLayoutEngine({
  routes,
  applications,
  active: false,
});

applications.forEach(registerApplication);

// Activate the layout engine once the styleguide CSS is loaded
layoutEngine.activate();
start();
