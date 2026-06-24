export const title = "KLA W32 | Authentication";


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

      <div id="child-outlet" class="login-button-container">
        <button id="btnShowLogin" class="login-btn">Login</button>
        <button id="btnShowSignUp" class="signup-btn">Registreer</button>
      </div>
      
      <p class="login-p">Wachtwoord vergeten?</p>
    </div>
  `;
}

export function init(root) {
  root.querySelector("#btnShowLogin").onclick = () => {
    window.location.hash = "#/auth/login";
  };
  root.querySelector("#btnShowSignUp").onclick = () => {
    window.location.hash = "#/auth/signup";
  };
}