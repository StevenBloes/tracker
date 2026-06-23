export const title = "KLA W32 - Startpagina";

const supabaseUrl = 'https://odhvvyovhqdghxdnljkt.supabase.co'
const supabaseKey = 'sb_publishable_4iY1n-fsStaHmqH76m5ecA_9DWglVOT'

// Create client
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)

// Check if user is already logged in
async function checkUser() {
  const { data: { session } } = await supabaseClient.auth.getSession()

  if (session) {
    showApp()
  }
}

checkUser()

// SIGN UP
async function signUp() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    alert("Check your email to confirm signup!")
  }
}

// LOGIN
async function login() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    showApp()
  }
}

// LOGOUT
async function logout() {
  await supabaseClient.auth.signOut()
  location.reload()
}

// UI switch
function showApp() {
  document.getElementById('auth').style.display = 'none'
  document.getElementById('app').style.display = 'block'
}


export function render() {
  return `
    <div id="auth">
      <input id="email" type="email" placeholder="Email"><br><br>
      <input id="password" type="password" placeholder="Password"><br><br>
      <button onclick="signUp()">Sign Up</button>
      <button onclick="login()">Login</button>
  </div>
  `;
}

export function init(root) {
  root.querySelector("#btnSignUp").onclick = () => { signUp(); };
  root.querySelector("#btnLogin").onclick = () => { login(); };
}

export function destroy() {}
