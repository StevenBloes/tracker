const supabaseUrl = 'https://odhvvyovhqdghxdnljkt.supabase.co'
const supabaseKey = 'sb_publishable_4iY1n-fsStaHmqH76m5ecA_9DWglVOT'

// Create client
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey)

// Check if user is already logged in
export async function checkUser() {
  const { data: { session } } = await supabaseClient.auth.getSession()

  if (session) {
    showApp()
  }
}

// SIGN UP
export async function signUp(email, password) {
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    alert(/*"Check your email to confirm signup!"*/"Signup confirmed!")
  }
}

// LOGIN
async function login(email, password) {
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
