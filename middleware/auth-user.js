export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn) {
    return redirect('/login')
  }

  if ($auth.user.role === 'admin') {
    return redirect('/admin/dashboard')
  }
}
