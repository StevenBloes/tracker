import { supabaseClient } from "./supabaseClient.js";

// Check if user is already logged in
export async function checkUser() {
  const { data: { session } } = await supabaseClient.auth.getSession()

  return session ? true : false;
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
export async function login(email, password) {
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
export async function logout() {
  await supabaseClient.auth.signOut()
  location.reload()
}
