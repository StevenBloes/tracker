import { checkUser } from "./services/authService.js";
import { supabaseClient } from "./services/supabaseClient.js";

let currentComponent = null;
let currentRoot = null;


const routes = {
  "#/": { component: "home" },

  "#/auth": {
    component: "auth/index",
    children: {
      "login": "auth/login",
      "signup": "auth/signup"
    }
  },

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


export async function handleRoute() {
  const hash = window.location.hash || "#/";

  const isLoggedIn = await checkUser();

  if (!isLoggedIn && !hash.startsWith("#/auth")) {
    sessionStorage.setItem("redirectAfterLogin", hash);
    window.location.hash = "#/auth";
    return;
  } else {
    window.addEventListener("beforeunload", () => {
      supabaseClient.auth.signOut();
    });
  }


  const parts = hash.split("/").filter(Boolean);

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
      return;
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
