// Shared Sidebar Navigation Controller
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.querySelector('.sidebar');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');

  // Mobile Drawer Toggle
  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('sidebar-open');
    });
  }

  // Click Outside to Close Sidebar on Mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      if (sidebar && sidebar.classList.contains('sidebar-open')) {
        // Close if click target is not inside sidebar and is not the toggle button
        const clickedInsideSidebar = sidebar.contains(e.target);
        const clickedToggleButton = menuToggleBtn && menuToggleBtn.contains(e.target);
        if (!clickedInsideSidebar && !clickedToggleButton) {
          sidebar.classList.remove('sidebar-open');
        }
      }
    }
  });

  // Dynamically Sync Firebase Auth and Profile Details
  let attempts = 0;
  const checkAuth = setInterval(() => {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      clearInterval(checkAuth);

      firebase.auth().onAuthStateChanged(async (user) => {
        const sidebarUserName = document.getElementById('sidebarUserName');
        const sidebarUserPhoto = document.getElementById('sidebarUserPhoto');
        const sidebarPeriodItem = document.getElementById('sidebarPeriodItem');

        if (user) {
          try {
            const db = firebase.firestore();
            const docRef = db.collection('users').doc(user.uid).collection('profile').doc('details');
            const doc = await docRef.get();

            if (doc.exists) {
              const profile = doc.data();
              if (sidebarUserName) {
                sidebarUserName.textContent = profile.fullName || "User Name";
              }
              if (sidebarUserPhoto) {
                sidebarUserPhoto.src = profile.profilePhoto || 'https://via.placeholder.com/150?text=Avatar';
              }

              // Dynamic Period Tracker visibility for Female / Women
              const isFemale = profile.gender && (
                profile.gender.toLowerCase() === 'female' ||
                profile.gender.toLowerCase() === 'women'
              );
              if (sidebarPeriodItem) {
                sidebarPeriodItem.style.display = isFemale ? 'block' : 'none';
              }
            } else {
              // Fallback if profile details are not created yet
              if (sidebarUserName) sidebarUserName.textContent = "New Patient";
              if (sidebarPeriodItem) sidebarPeriodItem.style.display = 'none';
            }
          } catch (error) {
            console.error("Error loading user profile in sidebar: ", error);
          }
        } else {
          // Logged-out state
          if (sidebarUserName) sidebarUserName.textContent = "Guest User";
          if (sidebarUserPhoto) sidebarUserPhoto.src = 'https://via.placeholder.com/150?text=Guest';
          if (sidebarPeriodItem) sidebarPeriodItem.style.display = 'none';
        }
      });
    } else {
      attempts++;
      if (attempts > 20) { // Stop checking after 4 seconds
        clearInterval(checkAuth);
        const sidebarUserName = document.getElementById('sidebarUserName');
        const sidebarUserPhoto = document.getElementById('sidebarUserPhoto');
        const sidebarPeriodItem = document.getElementById('sidebarPeriodItem');
        if (sidebarUserName) sidebarUserName.textContent = "Guest User";
        if (sidebarUserPhoto) sidebarUserPhoto.src = 'https://via.placeholder.com/150?text=Guest';
        if (sidebarPeriodItem) sidebarPeriodItem.style.display = 'none';
      }
    }
  }, 200);
});
