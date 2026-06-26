export const title = "KLA W32 - Pallet Stock";

export function render() {
    return `
     <button id="btnShowLogin" class="auth-login-btn">Log in</button>
     <button id="btnShowSignUp" class="auth-signup-btn">Registreer</button>
  `;
};

export function init(root) {
    root.querySelector("#btnShowLogin").onclick = () => {
        window.location.hash = "#/auth/login";
    };
    root.querySelector("#btnShowSignUp").onclick = () => {
        window.location.hash = "#/auth/signup";
    };
}

export function destroy() {

}