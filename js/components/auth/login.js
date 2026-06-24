import { signUp, login } from "../../services/authService.js";


function showLogin(root){
  root.querySelector("#loginButtonContainer").classList.add("hidden");
  root.querySelector("#loginInputContainer").classList.remove("hidden");
  root.querySelector("#btnSignUp").classList.add("hidden");
}

function showSignUp(root){
  root.querySelector("#loginButtonContainer").classList.add("hidden");
  root.querySelector("#loginInputContainer").classList.remove("hidden");
  root.querySelector("#loginH2").innerHTML = "Registreer om verder te gaan";
  root.querySelector("#btnLogin").classList.add("hidden");
}

async function submitLogin(e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    await login(email, password);

    window.location.replace(window.location.href);
}

async function submitSignUp(e) {
    e.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    await signUp(email, password);

    window.location.replace(window.location.href);
}

export function render() {
    return `
    <div class="login-container">
      <div class="logo-container">
        <img src="./img/favicon.svg" alt="Company Logo" width="55%">
      </div>
      <div class="login-text-container">
        <h1 class="login-h1">Welkom</h1>
        <h2 id="loginH2" class="login-h2">Log in om verder te gaan</h2>
      </div>
      <div id="loginButtonContainer" class="login-button-container">
        <button id="btnShowLogin" class="login-btn">Login</button>
        <button id="btnShowSignUp" class="signup-btn">Registreer</button>
      </div>
      <div id="loginInputContainer" class="login-input-container hidden">
        <input id="email" type="email" placeholder="Email" class="login-input">
        <input id="password" type="password" placeholder="Password" class="login-input">
        <button id="btnLogin" class="login-btn">Login</button>
        <button id="btnSignUp" class="signup-btn">Registreer</button>
      </div>
      <p class="login-p"><u>Wachtwoord vergeten?</u></p>
    </div>
  `;
}

export function init(root) {
    root.querySelector("#btnShowLogin").onclick = (e) => showLogin(root);
    root.querySelector("#btnShowSignUp").onclick = (e) => showSignUp(root);
    
    root.querySelector("#btnLogin").onclick = (e) => submitLogin(e);
    root.querySelector("#btnSignUp").onclick = (e) => submitSignUp(e);
}