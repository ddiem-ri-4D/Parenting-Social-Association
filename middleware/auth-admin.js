export default function ({ $auth, redirect }) {
  if (!$auth.loggedIn) {
    return redirect('/admin')
  }

  if ($auth.user.role !== 'admin') {
    return redirect('/')
  }
}
