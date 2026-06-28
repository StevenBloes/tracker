export const title = "KLA W32 | Log in";

import { login } from "../../../services/authService.js";
import { MailIcon, LockIcon } from "../../../../icons/index.js";


async function submitLogin(e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    await login(email, password);

    const redirect = sessionStorage.getItem("redirectAfterLogin") || "#/";
    sessionStorage.removeItem("redirectAfterLogin");
    window.location.hash = redirect;
}
/*
export function render() {
    return `
    <div style="width:100%;">
      <div class="auth-input-container">
        <input id="email" type="email" placeholder="Email" class="auth-input auth-user-input">
        <input id="password" type="password" placeholder="Password" class="auth-input auth-password-input">
      </div>
      <button id="btnLogin" class="auth-login-btn">Log in</button>
    </div>    
  `;
};
*/
export function render() {
  return `
    <div style="width:100%;">
      <div class="auth-input-container">
        <div class="auth-input-wrapper">
          <span class="icon">${MailIcon("1.3em")}</span>
          <input id="email" type="email" placeholder="Email" class="auth-input">
        </div>
        <div class="auth-input-wrapper">
          <span class="icon">${LockIcon("1.3em")}</span>
          <input id="password" type="password" placeholder="Password" class="auth-input">
        </div>
      </div>
      <button id="btnLogin" class="auth-login-btn">Log in</button>
    </div>
  `;
}

export function init(root) {
    root.querySelector("#btnLogin").onclick = (e) => submitLogin(e);
    document.getElementById("authH2").textContent = "Log in om verder te gaan";
}

export function destroy() {

}