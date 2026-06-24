import { checkUser } from "./services/authService.js";
import { supabaseClient } from "./services/supabaseClient.js";

let currentComponent = null;
let currentRoot = null;

const routes = {
  "#/": { component: "home" },

  "#/stock": {
    component: "stock/index",
    children: {
      "map": "stock/map",
      "pallet": "stock/pallet",
      "search": "stock/search",
      "scan": "stock/scan"
    }
  }
};

function toggleAuthUI(isLoggedIn) {
  const auth = document.getElementById("auth");
  const app = document.getElementById("app");

  auth.classList.toggle("hidden", isLoggedIn);
  app.classList.toggle("hidden", !isLoggedIn);
}


async function loadLogin() {
  const auth = document.getElementById("auth");

  const module = await import("./components/auth/login.js");

  auth.innerHTML = "";
  const root = document.createElement("div");
  root.innerHTML = module.render();

  currentComponent = module;
  currentRoot = root;

  if (module.init) module.init(root);

  auth.appendChild(root);
}


export async function handleRoute() {
  const isLoggedIn = await checkUser();

  toggleAuthUI(isLoggedIn);

  if (!isLoggedIn) {
    loadLogin();
    return;
  } else {
    window.addEventListener("beforeunload", () => {
      supabaseClient.auth.signOut();
    });
  }

  const hash = window.location.hash || "#/";
  const parts = hash.split("/").filter(Boolean); // ["#", "products", "phones"]

  const base = `#/${parts[1] || ""}`;
  const child = parts[2];
  const param = parts[3];

  const route = routes[base];

  if (!route) {
    return loadComponent("home")
  } else {
    console.log(`path ${hash} exists`);
  };

  loadComponent(route.component).then(() => {
    if (child && route.children && route.children[child]) {
      loadChildComponent(route.children[child], param);
    }
  });
}

async function loadComponent(name) {
  const app = document.getElementById("app");

  if (currentComponent?.destroy) currentComponent.destroy(currentRoot);

  const module = await import(`./components/${name}.js`);

  document.title = module.title || "My App";

  app.innerHTML = "";
  const root = document.createElement("div");
  root.innerHTML = module.render();

  currentComponent = module;
  currentRoot = root;

  if (module.init) module.init(root);

  app.appendChild(root);
}

async function loadChildComponent(name, param) {
  const outlet = document.getElementById("child-outlet");
  if (!outlet) return;

  const module = await import(`./components/${name}.js`);

  outlet.innerHTML = module.render(param);
  if (module.init) module.init(outlet, param);
}

window.addEventListener("hashchange", handleRoute);

export function initRouter() {
  handleRoute();
}
