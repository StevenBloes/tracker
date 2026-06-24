import { signUp, login } from "../../services/authService.js";


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
      <h1>Login</h1>
      <input id="email" type="email" placeholder="Email"><br><br>
      <input id="password" type="password" placeholder="Password"><br><br>
      <button id="btnSignUp">Sign Up</button>
      <button id="btnLogin">Log in</button>
    </div>
  `;
}

export function init(root) {
    root.querySelector("#btnSignUp").onclick = (e) => submitSignUp(e);
    root.querySelector("#btnLogin").onclick = (e) => submitLogin(e);
}