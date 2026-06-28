import { CompanyIcon } from "../../../icons/index.js";

export const title = "KLA W32 | Authentication";


export function render() {
  return `
    <div class="auth-container">

      <div class="auth-logo-container">
        ${CompanyIcon("55%")}
      </div>

      <div class="auth-text-container">
        <h1 class="auth-h1">Welkom</h1>
        <h2 id="authH2" class="auth-h2"></h2>
      </div>

      <div id="child-outlet" class="auth-action-container"></div>
      
      <p id="btnForgetPw" class="auth-p">Wachtwoord vergeten?</p>
      <div id="msgForgetPw" class="auth-help-container hidden">Contacteer uw IT-departement<br>voor verdere hulp.</div>
    </div>
  `;
}

export function init(root) {
  root.querySelector("#btnForgetPw").onclick = () => {
    root.querySelector("#msgForgetPw").classList.toggle("hidden");
  };
  root.querySelector("#authH2").innerHTML = "Log in of registreer<br>om verder te gaan";

}