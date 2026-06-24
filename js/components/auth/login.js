import { signUp, login } from "../../services/authService.js";


function showLogin(root){
  root.querySelector("#loginButtonContainer").classList.add("hidden");
  root.querySelector("#loginInputContainer").classList.remove("hidden");
}

function showSignUp(root){
  root.querySelector("#loginButtonContainer").classList.add("hidden");
  root.querySelector("#loginInputContainer").classList.remove("hidden");
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
        <img src="./img/favicon.svg" alt="Company Logo" width="60%">
      </div>
      <div class="login-text-container">
        <h1 class="login-h1">Welkom</h1>
        <p class="login-p">Log in om verder te gaan</p>
      </div>
      <div id="loginButtonContainer" style="width: 90%;">
        <button id="btnShowLogin" class="login-btn">Login</button>
        <button id="btnShowSignUp" class="signup-btn">Registreer</button>
      </div>
      <div id="loginInputContainer" class="hidden" style="width: 90%;">
        <input id="email" type="email" placeholder="Email">
        <input id="password" type="password" placeholder="Password">
        <button id="btnSignUp" class="big-btn">Sign Up</button>
        <button id="btnLogin" class="big-btn">Log in</button>
      </div>
    </div>
  `;
}

export function init(root) {
    root.querySelector("#btnShowLogin").onclick = () => showLogin(root);
    root.querySelector("#btnShowSignUp").onclick = () => showSignUp(root);
    
    root.querySelector("#btnLogin").onclick = (e) => submitLogin(e);
    root.querySelector("#btnSignUp").onclick = (e) => submitSignUp(e);
}