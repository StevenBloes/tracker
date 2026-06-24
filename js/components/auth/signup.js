export const title = "KLA W32 | Registereer";

import { signUp } from "../../services/authService.js";


async function submitSignUp(e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    await signUp(email, password);

    const redirect = sessionStorage.getItem("redirectAfterLogin") || "#/";
    sessionStorage.removeItem("redirectAfterLogin");
    window.location.hash = redirect;
}

export function render() {
    return `
   <div style="width:100%;">
      <div class="login-input-container">
        <input id="email" type="email" placeholder="Email" class="login-input login-user-input">
        <input id="password" type="password" placeholder="Password" class="login-input login-password-input">
      </div>
      <button id="btnSignUp" class="signup-btn">Registreer</button>
    </div>
  `;
};

export function init(root) {
    root.querySelector("#btnSignUp").onclick = (e) => submitSignUp(e);
}

export function destroy() {

}