// Apply saved dark theme state
const isDark = localStorage.getItem('dark-theme') === 'true';
if (isDark) {
  document.body.classList.add('dark-theme');
}

// Password visibility toggle
const togglePasswordBtn = document.getElementById('togglePasswordBtn');
const passwordInput = document.getElementById('password');

togglePasswordBtn.addEventListener('click', () => {
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePasswordBtn.innerHTML = type === 'password'
    ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M21 21l-3.5-3.5m0 0L13 13m4.5 4.5a10.477 10.477 0 001.934-5c-1.292-4.338-5.311-7.5-10.066-7.5-1.125 0-2.203.18-3.21.516M3 3l3.5 3.5m0 0l3.5 3.5m-3.5-3.5L12 12" /></svg>`;
});

// Handle Login Form Submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = passwordInput.value;
  const rememberMe = document.getElementById('rememberMe').checked;

  // Show Loading Swal
  Swal.fire({
    title: 'Logging In...',
    text: 'Please wait while we verify your credentials.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  // Determine auth persistence mode
  const persistence = rememberMe
    ? firebase.auth.Auth.Persistence.LOCAL
    : firebase.auth.Auth.Persistence.SESSION;

  firebase.auth().setPersistence(persistence)
    .then(() => {
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .then((userCredential) => {
      const user = userCredential.user;

      // Query Firestore for user profile
      return firebase.firestore().collection('users').doc(user.uid).collection('profile').doc('details').get()
        .then((doc) => {
          console.log("Checking path for UID:", user.uid, "Exists:", doc.exists);
          return { doc, user };
        });
    })
    .then(({ doc, user }) => {
      Swal.close();

      if (doc.exists) {
        // Session logged, redirect to dashboard
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Login successful. Redirecting to Dashboard...',
          confirmButtonColor: '#4f46e5',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.href = 'dashboard.html';
        });
      } else {
        // No completed profile yet
        Swal.fire({
          icon: 'info',
          title: 'Profile Setup Required',
          text: 'Please complete your healthcare profile onboarding.',
          confirmButtonColor: '#4f46e5',
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          window.location.href = 'profile-setup.html';
        });
      }
    })
    .catch((error) => {
      let errorMessage = error.message;
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        errorMessage = 'Invalid email or password. Please try again.';
      }

      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: errorMessage,
        confirmButtonColor: '#4f46e5'
      });
    });
});
