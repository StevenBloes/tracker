import { checkUser } from "./services/authService.js";
import { supabaseClient } from "./services/supabaseClient.js";

let currentComponent = null;
let currentRoot = null;
let currentBase = null;

const routes = {
    "#/": { component: "home" },
    "#/auth": {
        component: "auth/index",
        children: {
            "": "auth/pages/home",
            "login": "auth/pages/login",
            "signup": "auth/pages/signup"
        }
    },
    "#/stock": {
        component: "stock/index",
        children: {
            "": "stock/pages/home",
            "map": "stock/pages/map",
            "move": "stock/pages/move",
            "pallet": "stock/pages/pallet",
            "search": "stock/pages/search",
            "scan": "stock/pages/scan",
            "stage": "stock/pages/stage"
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
    const child = parts[2] || "";
    const param = parts[3];

    const route = routes[base];

    if (!route) {
        return loadComponent("home");
    }

    if (currentBase !== base) {
        await loadComponent(route.component);
        currentBase = base;
    }

    if (route.children && route.children[child] !== undefined) {
        loadChildComponent(route.children[child], param);
    }
}

async function loadComponent(name) {
    const app = document.getElementById("app");

    if (currentComponent?.destroy) {
        currentComponent.destroy(currentRoot);
    }

    const module = await import(`./components/${name}.js`);

    document.title = module.title || "KLA W32 | Applicatie";

    app.innerHTML = "";

    const root = document.createElement("div");
    root.innerHTML = module.render();

    currentComponent = module;
    currentRoot = root;

    if (module.init) {
        module.init(root);
    }

    app.appendChild(root);
}

async function loadChildComponent(name, param) {
    const appBarElement = document.getElementById("app-bar");
    const outlet = document.getElementById("child-outlet");

    if (!outlet) return;
    try {
        outlet.innerHTML = "Loading...";

        const module = await import(`./components/${name}.js`);

        appBarElement ? appBarElement.textContent = module.appBarTitle || "" : "KLA W32 Applicatie";

        document.title = module.title || "KLA W32 | Applicatie";

        outlet.innerHTML = module.render(param);

        if (module.init) {
            module.init(outlet, param);
        }
    } catch (err) {
        console.error("Component load failed:", name, err);
        outlet.innerHTML = `
            <div style="color: red;">
                <h2>404 fout</h2>
                <p>Pagina niet gevonden</p>
            </div>
        `;
    }
}

window.addEventListener("hashchange", handleRoute);

export function initRouter() {
    handleRoute();
}