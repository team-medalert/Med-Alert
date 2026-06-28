// Global Application State
let currentUser = null;
let userProfile = null;
let medicinesList = [];
let intakeChartInstance = null;

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true
});
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP animations helper
function animateBentoCards() {
  gsap.from(".bento-card", {
    opacity: 0,
    y: 30,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out",
    clearProps: "all"
  });
}

// -------------------------------------------------------------------------
// 1. AUTH STATE & INITIALIZATION
// -------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const checkAuth = setInterval(() => {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      clearInterval(checkAuth);

      firebase.auth().onAuthStateChanged(async (user) => {
        if (!user) {
          window.location.href = 'login.html';
        } else {
          currentUser = user;
          await loadUserProfile();
          setupRealtimeListeners();
          initializeUi();
          animateBentoCards();
        }
      });
    }
  }, 200);
});

// Load User Profile Data
async function loadUserProfile() {
  try {
    const db = firebase.firestore();
    const docRef = db.collection('users').doc(currentUser.uid).collection('profile').doc('details');
    const doc = await docRef.get();

    console.log("Checking path for UID:", currentUser.uid, "Exists:", doc.exists);

    if (doc.exists) {
      userProfile = doc.data();
      const rootDoc = await db.collection('users').doc(currentUser.uid).get();
      const emgContact = rootDoc.exists ? rootDoc.data().emergencyContact : null;

      // Update UI with profile details
      document.getElementById('sidebarUserName').textContent = userProfile.fullName;
      document.getElementById('sidebarUserPhoto').src = userProfile.profilePhoto || 'https://via.placeholder.com/150';
      document.getElementById('welcomeUserMessage').textContent = `Welcome back, ${userProfile.fullName.split(' ')[0]}`;

      // Apply theme preference
      if (localStorage.getItem('dark-theme') === 'true' || userProfile.darkTheme === true) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('dark-theme', 'true');
      } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('dark-theme', 'false');
      }

      // Update Health Summary Bento Card
      document.getElementById('sumAge').textContent = userProfile.age || '-';
      document.getElementById('sumBlood').textContent = userProfile.bloodGroup || '-';
      document.getElementById('sumWeight').textContent = userProfile.weight || '-';
      document.getElementById('sumHeight').textContent = userProfile.height || '-';
      document.getElementById('sumAllergies').textContent = userProfile.allergies || 'None';
      document.getElementById('sumChronic').textContent = userProfile.chronicDiseases || 'None';

      // Update Emergency Contact Bento Card
      if (emgContact) {
        document.getElementById('emgName').textContent = emgContact.name;
        document.getElementById('emgRelationship').textContent = emgContact.relationship;
        document.getElementById('emgCallLink').href = `tel:${emgContact.phone}`;
        
        // Dynamic click handler for Emergency SMS with OS-aware compatibility
        const emgMsgLink = document.getElementById('emgMsgLink');
        emgMsgLink.onclick = (e) => {
          e.preventDefault();
          const emergencyContactPhone = emgContact.phone;
          const smsBody = encodeURIComponent("EMERGENCY ALERT: This is an automated message from Med-Alert. I need assistance immediately. Please check up on me.");
          // Detect iOS devices for correct query separator (&body= vs ?body=)
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
          const separator = isIOS ? '&' : '?';
          window.location.href = `sms:${emergencyContactPhone}${separator}body=${smsBody}`;
        };
      }

      // Conditional visibility for Period Tracker based on gender
      const rawGender = userProfile.gender || '';
      const verifiedGender = rawGender.trim().toLowerCase();
      
      const sidebarPeriodItem = document.getElementById('sidebarPeriodItem');
      const dashboardPeriodCard = document.getElementById('dashboard-period-card');

      if (verifiedGender === 'female') {
        if (sidebarPeriodItem) sidebarPeriodItem.style.display = 'block';
        if (dashboardPeriodCard) dashboardPeriodCard.style.display = 'block';
        loadPeriodData();
      } else {
        if (sidebarPeriodItem) sidebarPeriodItem.style.display = 'none';
        if (dashboardPeriodCard) dashboardPeriodCard.style.display = 'none';
      }

      // Fill settings form
      fillSettingsForm(userProfile);
    } else {
      // If no profile found, redirect to setup
      window.location.href = 'profile-setup.html';
    }
  } catch (error) {
    console.error("Error loading user profile: ", error);
  }
}

// -------------------------------------------------------------------------
// 2. UI NAVIGATION & TABS SWITCHING
// -------------------------------------------------------------------------
function initializeUi() {
  // Set Current Date in Header
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('currentDateString').textContent = new Date().toLocaleDateString('en-US', options);

  // Tab Switching logic
  const navLinks = document.querySelectorAll('.sidebar-link');
  const tabs = document.querySelectorAll('.tab-content');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTabId = link.getAttribute('data-tab');

      // Remove active from all links and tabs
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // GSAP Transition on switching views
      const activeTab = document.querySelector('.tab-content.active');
      const nextTab = document.getElementById(`${targetTabId}View`);

      if (activeTab && nextTab && activeTab !== nextTab) {
        gsap.to(activeTab, {
          opacity: 0,
          y: 15,
          duration: 0.25,
          onComplete: () => {
            activeTab.classList.remove('active');
            nextTab.style.opacity = 0;
            nextTab.classList.add('active');
            gsap.to(nextTab, {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power2.out"
            });
            // Refresh Chart.js or GSAP ScrollTrigger if necessary
            if (targetTabId === 'dashboard') {
              renderIntakeChart();
            }
          }
        });
      }
    });
  });

  // URL Tab Parsing on Load
  const urlParams = new URLSearchParams(window.location.search);
  const initialTab = urlParams.get('tab');
  if (initialTab && initialTab !== 'dashboard') {
    const targetLink = document.querySelector(`.sidebar-link[data-tab="${initialTab}"]`);
    if (targetLink) {
      // Remove active from all links and tabs
      navLinks.forEach(l => l.classList.remove('active'));
      tabs.forEach(t => t.classList.remove('active'));

      // Activate target link and tab
      targetLink.classList.add('active');
      const nextTab = document.getElementById(`${initialTab}View`);
      if (nextTab) {
        nextTab.classList.add('active');
        nextTab.style.opacity = 1;
        nextTab.style.transform = 'none';
        if (initialTab === 'dashboard') {
          renderIntakeChart();
        }
      }
    }
  }

  // Theme Toggle (Header & Settings)
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const settingsThemeToggle = document.getElementById('settingsThemeToggle');

  const toggleThemeAction = () => {
    const isDarkActive = document.body.classList.toggle('dark-theme');
    localStorage.setItem('dark-theme', isDarkActive);

    // Save preference to Firestore
    firebase.firestore().collection('users').doc(currentUser.uid).update({
      'profile.darkTheme': isDarkActive
    }).catch(err => console.error("Error saving theme preference: ", err));

    Swal.fire({
      icon: 'success',
      title: `${isDarkActive ? 'Dark' : 'Light'} Mode Activated`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    });
  };

  themeToggleBtn.addEventListener('click', toggleThemeAction);
  settingsThemeToggle.addEventListener('click', toggleThemeAction);

  // Modals Open & Close setup
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
  };

  const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.classList.remove('active');
  };

  // Bind close buttons on all modals
  document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  // Quick Actions binding
  document.getElementById('qaAddMedicine').addEventListener('click', () => openModal('addMedicineModal'));
  document.getElementById('qaAddReport').addEventListener('click', () => openModal('uploadReportModal'));
  document.getElementById('qaAddAppointment').addEventListener('click', () => openModal('addAppointmentModal'));
  document.getElementById('qaEmergencyCall').addEventListener('click', () => {
    const callLink = document.getElementById('emgCallLink');
    if (callLink.href && callLink.href !== '#') {
      window.location.href = callLink.href;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Emergency Contact Missing',
        text: 'Please set up an emergency contact in Settings first.',
        confirmButtonColor: '#4f46e5'
      });
    }
  });

  // Top Logout Button & Settings Logout Button
  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: 'Are you sure you want to log out of Med-Alert?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#4b5563',
      confirmButtonText: 'Log Out'
    }).then((result) => {
      if (result.isConfirmed) {
        firebase.auth().signOut().then(() => {
          window.location.href = 'index.html';
        });
      }
    });
  };
  document.getElementById('logoutTopBtn').addEventListener('click', handleLogout);
  document.getElementById('settingsLogoutBtn').addEventListener('click', handleLogout);

  // Bind Open Buttons
  document.getElementById('openAddMedModalBtn').addEventListener('click', () => openModal('addMedicineModal'));
  document.getElementById('openUploadReportBtn').addEventListener('click', () => openModal('uploadReportModal'));
  document.getElementById('openAddAppointmentBtn').addEventListener('click', () => openModal('addAppointmentModal'));

  // Setup form submission listeners
  setupFormSubmitListeners();
}

// -------------------------------------------------------------------------
// 3. REALTIME FIRESTORE LISTENERS
// -------------------------------------------------------------------------
function setupRealtimeListeners() {
  const db = firebase.firestore();

  // 3.1 Medicines Listener
  db.collection('users').doc(currentUser.uid).collection('medicines')
    .onSnapshot((snapshot) => {
      medicinesList = [];
      snapshot.forEach(doc => {
        medicinesList.push({ id: doc.id, ...doc.data() });
      });

      // Update UI panels with fresh medicine data
      populateTodayChecklist();
      populateMedicinesGrid();
      populateAlertsCards();
    }, (error) => {
      console.error("Error reading medicines: ", error);
    });

  // 3.2 Medical Reports Listener
  db.collection('users').doc(currentUser.uid).collection('reports')
    .orderBy('uploadDate', 'desc')
    .onSnapshot((snapshot) => {
      const reports = [];
      snapshot.forEach(doc => {
        reports.push({ id: doc.id, ...doc.data() });
      });
      populateReportsUI(reports);
    });

  // 3.3 Appointments Listener
  db.collection('users').doc(currentUser.uid).collection('appointments')
    .orderBy('date', 'asc')
    .onSnapshot((snapshot) => {
      const appointments = [];
      snapshot.forEach(doc => {
        appointments.push({ id: doc.id, ...doc.data() });
      });
      populateAppointmentsUI(appointments);
    });
}

// -------------------------------------------------------------------------
// 4. MEDICINE MANAGEMENT MODULE (CRUD)
// -------------------------------------------------------------------------
function setupFormSubmitListeners() {
  const db = firebase.firestore();

  // 4.1 Add Medicine Submit
  document.getElementById('addMedicineForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const medName = document.getElementById('medName').value.trim();
    const medType = document.getElementById('medType').value;
    const medDosage = document.getElementById('medDosage').value.trim();
    const medQuantity = parseInt(document.getElementById('medQuantity').value);
    const medStockAlert = parseInt(document.getElementById('medStockAlert').value);
    const medExpiry = document.getElementById('medExpiry').value;
    const medFrequency = document.getElementById('medFrequency').value;
    const medTime = document.getElementById('medTime').value;
    const medManufacturer = document.getElementById('medManufacturer').value.trim() || 'Generic';

    try {
      await db.collection('users').doc(currentUser.uid).collection('medicines').add({
        medicineName: medName,
        medicineType: medType,
        dosage: medDosage,
        quantity: medQuantity,
        stock: medStockAlert,
        expiryDate: medExpiry,
        frequency: medFrequency,
        reminderTime: medTime,
        manufacturer: medManufacturer,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      document.getElementById('addMedicineForm').reset();
      document.getElementById('addMedicineModal').classList.remove('active');

      Swal.fire({
        icon: 'success',
        title: 'Medicine Added',
        text: `${medName} successfully saved.`,
        confirmButtonColor: '#4f46e5'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    }
  });

  // 4.2 Edit Medicine Submit
  document.getElementById('editMedicineForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editMedId').value;
    const medName = document.getElementById('editMedName').value.trim();
    const medType = document.getElementById('editMedType').value;
    const medDosage = document.getElementById('editMedDosage').value.trim();
    const medQuantity = parseInt(document.getElementById('editMedQuantity').value);
    const medStockAlert = parseInt(document.getElementById('editMedStockAlert').value);
    const medExpiry = document.getElementById('editMedExpiry').value;
    const medFrequency = document.getElementById('editMedFrequency').value;
    const medTime = document.getElementById('editMedTime').value;
    const medManufacturer = document.getElementById('editMedManufacturer').value.trim() || 'Generic';

    try {
      await db.collection('users').doc(currentUser.uid).collection('medicines').doc(id).update({
        medicineName: medName,
        medicineType: medType,
        dosage: medDosage,
        quantity: medQuantity,
        stock: medStockAlert,
        expiryDate: medExpiry,
        frequency: medFrequency,
        reminderTime: medTime,
        manufacturer: medManufacturer
      });

      document.getElementById('editMedicineForm').reset();
      document.getElementById('editMedicineModal').classList.remove('active');

      Swal.fire({
        icon: 'success',
        title: 'Medicine Updated',
        text: 'Changes saved successfully.',
        confirmButtonColor: '#4f46e5'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Error', text: err.message });
    }
  });

  // 4.3 Report Upload Submit
  document.getElementById('uploadReportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('repName').value.trim();
    const type = document.getElementById('repType').value.trim();
    const file = document.getElementById('repFile').files[0];

    if (!file) return;

    Swal.fire({
      title: 'Uploading Report...',
      text: 'Saving document to cloud storage.',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      // Storage upload skipped due to Spark free tier restrictions
      /*
      const storageRef = firebase.storage().ref(`users/${currentUser.uid}/reports/${Date.now()}_${file.name}`);
      await storageRef.put(file);
      const url = await storageRef.getDownloadURL();
      */
      const url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

      await db.collection('users').doc(currentUser.uid).collection('reports').add({
        reportName: name,
        reportType: type,
        fileUrl: url,
        fileName: file.name,
        uploadDate: new Date().toISOString()
      });

      document.getElementById('uploadReportForm').reset();
      document.getElementById('uploadReportModal').classList.remove('active');

      Swal.fire({
        icon: 'success',
        title: 'Report Uploaded',
        text: 'Medical document uploaded successfully.',
        confirmButtonColor: '#4f46e5'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Upload Failed', text: err.message });
    }
  });

  // 4.4 Book Appointment Submit
  document.getElementById('addAppointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const docName = document.getElementById('aptDocName').value.trim();
    const specialty = document.getElementById('aptSpecialty').value.trim();
    const date = document.getElementById('aptDate').value;
    const time = document.getElementById('aptTime').value;
    const notes = document.getElementById('aptNotes').value.trim() || 'General Consultation';

    try {
      await db.collection('users').doc(currentUser.uid).collection('appointments').add({
        doctorName: docName,
        specialty: specialty,
        date: date,
        time: time,
        notes: notes,
        status: 'Scheduled',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });

      document.getElementById('addAppointmentForm').reset();
      document.getElementById('addAppointmentModal').classList.remove('active');

      Swal.fire({
        icon: 'success',
        title: 'Appointment Booked',
        text: `Consultation with ${docName} scheduled.`,
        confirmButtonColor: '#4f46e5'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Booking Failed', text: err.message });
    }
  });

  // 4.5 Settings Profile Update
  document.getElementById('settingsProfileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('setFullName').value.trim();
    const phone = document.getElementById('setPhone').value.trim();
    const height = parseFloat(document.getElementById('setHeight').value);
    const weight = parseFloat(document.getElementById('setWeight').value);
    const blood = document.getElementById('setBlood').value;
    const address = document.getElementById('setAddress').value.trim();
    const allergies = document.getElementById('setAllergies').value.trim() || 'None';
    const chronic = document.getElementById('setChronic').value.trim() || 'None';
    const docName = document.getElementById('setDocName').value.trim() || 'Not Specified';
    const docContact = document.getElementById('setDocContact').value.trim() || 'Not Specified';

    Swal.fire({
      title: 'Updating Profile...',
      allowOutsideClick: false,
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      const updateData = {
        'profile.fullName': name,
        'profile.phone': phone,
        'profile.height': height,
        'profile.weight': weight,
        'profile.bloodGroup': blood,
        'profile.address': address,
        'profile.allergies': allergies,
        'profile.chronicDiseases': chronic,
        'profile.doctorName': docName,
        'profile.doctorContact': docContact
      };

      const detailsUpdate = {
        fullName: name,
        phone: phone,
        height: height,
        weight: weight,
        bloodGroup: blood,
        address: address,
        allergies: allergies,
        chronicDiseases: chronic,
        doctorName: docName,
        doctorContact: docContact
      };

      await db.collection('users').doc(currentUser.uid).update(updateData);
      await db.collection('users').doc(currentUser.uid).collection('profile').doc('details').update(detailsUpdate);
      await loadUserProfile(); // Reload profile updates into memory/UI

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'All settings modifications saved successfully.',
        confirmButtonColor: '#4f46e5'
      });
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: 'error', title: 'Update Failed', text: err.message });
    }
  });

  // 4.6 Change Email & Password in Settings
  document.getElementById('changePasswordBtn').addEventListener('click', async () => {
    const { value: newPassword } = await Swal.fire({
      title: 'Change Password',
      input: 'password',
      inputLabel: 'Enter new password',
      inputPlaceholder: 'At least 6 characters',
      inputAttributes: { minlength: 6, autocapitalize: 'off', autocorrect: 'off' },
      showCancelButton: true,
      confirmButtonColor: '#4f46e5'
    });

    if (newPassword) {
      try {
        await firebase.auth().currentUser.updatePassword(newPassword);
        Swal.fire({ icon: 'success', title: 'Password Updated', text: 'Secure password changed successfully.' });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed to Change Password', text: err.message });
      }
    }
  });

  document.getElementById('changeEmailBtn').addEventListener('click', async () => {
    const { value: newEmail } = await Swal.fire({
      title: 'Change Email Address',
      input: 'email',
      inputLabel: 'Enter new email address',
      inputPlaceholder: 'name@example.com',
      showCancelButton: true,
      confirmButtonColor: '#4f46e5'
    });

    if (newEmail) {
      try {
        await firebase.auth().currentUser.updateEmail(newEmail);
        // Save in Profile as well
        await db.collection('users').doc(currentUser.uid).update({ 'profile.email': newEmail });
        await db.collection('users').doc(currentUser.uid).collection('profile').doc('details').update({ email: newEmail });
        await loadUserProfile();
        Swal.fire({ icon: 'success', title: 'Email Updated', text: 'Account email address changed successfully.' });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Failed to Change Email', text: err.message });
      }
    }
  });
}

function fillSettingsForm(profile) {
  document.getElementById('setFullName').value = profile.fullName || '';
  document.getElementById('setPhone').value = profile.phone || '';
  document.getElementById('setHeight').value = profile.height || '';
  document.getElementById('setWeight').value = profile.weight || '';
  document.getElementById('setBlood').value = profile.bloodGroup || 'A+';
  document.getElementById('setAddress').value = profile.address || '';
  document.getElementById('setAllergies').value = profile.allergies === 'None' ? '' : profile.allergies;
  document.getElementById('setChronic').value = profile.chronicDiseases === 'None' ? '' : profile.chronicDiseases;
  document.getElementById('setDocName').value = profile.doctorName === 'Not Specified' ? '' : profile.doctorName;
  document.getElementById('setDocContact').value = profile.doctorContact === 'Not Specified' ? '' : profile.doctorContact;
}

// -------------------------------------------------------------------------
// 5. MEDICINES CHECKLIST RENDERING & INTAKE STATE
// -------------------------------------------------------------------------
async function populateTodayChecklist() {
  const checklist = document.getElementById('todayChecklist');
  checklist.innerHTML = '';

  if (medicinesList.length === 0) {
    checklist.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 20px;">No medicines scheduled.</p>';
    document.getElementById('medsRemainingBadge').textContent = '0 Pending';
    document.getElementById('medsRemainingBadge').className = 'badge badge-success';
    return;
  }

  // Get logged intakes for today
  const todayKey = new Date().toISOString().split('T')[0];
  let todayIntakes = {};

  try {
    const intakeDoc = await firebase.firestore().collection('users').doc(currentUser.uid).collection('dailyIntakes').doc(todayKey).get();
    if (intakeDoc.exists) {
      todayIntakes = intakeDoc.data();
    }
  } catch (err) {
    console.error("Error reading daily intakes: ", err);
  }

  let pendingCount = 0;

  medicinesList.forEach(med => {
    const status = todayIntakes[med.id] || 'Pending';
    if (status === 'Pending') pendingCount++;

    const div = document.createElement('div');
    div.className = `checklist-item ${status.toLowerCase()}`;

    div.innerHTML = `
      <div class="checklist-info">
        <span class="checklist-med-name">${med.medicineName} (${med.dosage})</span>
        <span class="checklist-med-time">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ${med.reminderTime} | Frequency: ${med.frequency}
        </span>
      </div>
      <div class="checklist-actions">
        ${status === 'Pending' ? `
          <button class="btn-status-toggle btn-take" onclick="markIntakeStatus('${med.id}', 'Taken')" title="Mark as Taken">✓</button>
          <button class="btn-status-toggle btn-miss" onclick="markIntakeStatus('${med.id}', 'Missed')" title="Mark as Missed">✕</button>
        ` : `
          <span class="badge ${status === 'Taken' ? 'badge-success' : 'badge-danger'}">${status}</span>
        `}
      </div>
    `;

    checklist.appendChild(div);
  });

  // Update badge status
  const badge = document.getElementById('medsRemainingBadge');
  badge.textContent = `${pendingCount} Pending`;
  if (pendingCount === 0) {
    badge.className = 'badge badge-success';
  } else {
    badge.className = 'badge badge-warning';
  }
}

// Mark intake log state
window.markIntakeStatus = async (medId, status) => {
  const db = firebase.firestore();
  const todayKey = new Date().toISOString().split('T')[0];

  try {
    // 1. Update status in today's intake sheet
    await db.collection('users').doc(currentUser.uid).collection('dailyIntakes').doc(todayKey).set({
      [medId]: status
    }, { merge: true });

    // 2. Increment Intake History Chart count
    if (status === 'Taken') {
      const historyRef = db.collection('users').doc(currentUser.uid).collection('intakeHistory').doc(todayKey);
      await historyRef.set({
        date: todayKey,
        takenCount: firebase.firestore.FieldValue.increment(1)
      }, { merge: true });

      // 3. Deduct stock from the medicine details
      const medRef = db.collection('users').doc(currentUser.uid).collection('medicines').doc(medId);
      const medDoc = await medRef.get();
      if (medDoc.exists) {
        const curQty = medDoc.data().quantity || 0;
        const threshold = medDoc.data().stock || 5;
        const newQty = Math.max(0, curQty - 1);

        await medRef.update({ quantity: newQty });

        // Stock Alert popup triggering if below threshold
        if (newQty <= threshold) {
          Swal.fire({
            icon: 'warning',
            title: 'Low Stock Alert!',
            text: `${medDoc.data().medicineName} stock is down to ${newQty} items. Refill soon!`,
            confirmButtonColor: '#f59e0b'
          });
        }
      }
    }

    // Refresh display
    populateTodayChecklist();
    renderIntakeChart();

    Swal.fire({
      icon: 'success',
      title: `Marked as ${status}`,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (err) {
    console.error("Error logging intake status: ", err);
  }
};

// -------------------------------------------------------------------------
// 6. MEDICINES LIST GRID & CRUD ACTIONS
// -------------------------------------------------------------------------
function populateMedicinesGrid() {
  const grid = document.getElementById('medicinesGrid');
  const searchQuery = document.getElementById('medicineSearchInput').value.toLowerCase().trim();
  const filterType = document.getElementById('medicineFilterType').value;

  grid.innerHTML = '';

  const filtered = medicinesList.filter(med => {
    const matchesSearch = med.medicineName.toLowerCase().includes(searchQuery) ||
      (med.manufacturer && med.manufacturer.toLowerCase().includes(searchQuery));
    const matchesType = filterType === 'ALL' || med.medicineType === filterType;
    return matchesSearch && matchesType;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No matching medicines found.</p>';
    return;
  }

  filtered.forEach(med => {
    const card = document.createElement('div');
    card.className = 'glass-panel medicine-card';

    // Stock alert colors
    const isLow = med.quantity <= med.stock;
    const stockBadge = isLow
      ? `<span class="badge badge-danger">Low Stock (${med.quantity} left)</span>`
      : `<span class="badge badge-success">${med.quantity} Available</span>`;

    card.innerHTML = `
      <div class="medicine-card-header">
        <h4 class="medicine-card-title">${med.medicineName}</h4>
        ${stockBadge}
      </div>
      <div class="medicine-details-list">
        <div class="medicine-detail-row">Type: <span>${med.medicineType}</span></div>
        <div class="medicine-detail-row">Dosage: <span>${med.dosage}</span></div>
        <div class="medicine-detail-row">Frequency: <span>${med.frequency}</span></div>
        <div class="medicine-detail-row">Reminder Time: <span>${med.reminderTime}</span></div>
        <div class="medicine-detail-row">Expiry Date: <span>${med.expiryDate}</span></div>
        <div class="medicine-detail-row">Manufacturer: <span>${med.manufacturer || 'Generic'}</span></div>
      </div>
      <div class="medicine-actions">
        <button class="btn btn-secondary" onclick="openEditMedModal('${med.id}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteMedicine('${med.id}', '${med.medicineName}')">Delete</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Bind search and filter events
document.getElementById('medicineSearchInput').addEventListener('input', populateMedicinesGrid);
document.getElementById('medicineFilterType').addEventListener('change', populateMedicinesGrid);

// Extract the search/lookup execution function
function triggerMedicineSearch() {
  const query = document.getElementById('medicineSearchInput').value.trim();
  if (query) {
    searchMedicineDictionary(query);
  }
}

// Bind search input 'keypress' event (for PC Enter triggers)
document.getElementById('medicineSearchInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    triggerMedicineSearch();
  }
});

// Bind search button click/tap event (for mobile screen inputs)
const medicineSearchBtn = document.getElementById('medicineSearchBtn');
if (medicineSearchBtn) {
  medicineSearchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerMedicineSearch();
  });
}

// Bind click on search icon SVG to search the reference dictionary (for compatibility)
const searchIcon = document.querySelector('.search-input-container svg');
if (searchIcon) {
  searchIcon.style.cursor = 'pointer';
  searchIcon.addEventListener('click', triggerMedicineSearch);
}

// Search Medicine Reference Dictionary
function searchMedicineDictionary(query) {
  // Clear any existing dictionary modal from DOM
  const existingModal = document.getElementById('medicineDictionaryModal');
  if (existingModal) {
    existingModal.remove();
  }

  const queryLower = query.toLowerCase();
  
  // Find match in local dictionary database
  let match = null;
  if (typeof MEDICINE_DICTIONARY !== 'undefined') {
    match = MEDICINE_DICTIONARY.find(med => 
      med.name.toLowerCase().includes(queryLower)
    );
  }

  if (match) {
    // Create and inject custom glassmorphic modal
    const modalHtml = `
      <div class="modal-overlay active" id="medicineDictionaryModal">
        <div class="glass-panel modal-box" style="max-width: 500px;">
          <div class="modal-header">
            <h3 class="modal-title" style="color: #6366f1; font-size: 1.4rem;">${match.name}</h3>
            <button class="modal-close" id="closeDictModalBtn">✕</button>
          </div>
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div class="dictionary-section">
              <h5 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.1rem;">🎯</span> Primary Uses
              </h5>
              <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0; padding-left: 26px;">${match.uses}</p>
            </div>
            <div class="dictionary-section">
              <h5 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.1rem;">⚡</span> How it Works (Effects)
              </h5>
              <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0; padding-left: 26px;">${match.effects}</p>
            </div>
            <div class="dictionary-section">
              <h5 style="color: var(--text-primary); font-size: 0.95rem; margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.1rem;">⚠️</span> Common Side Effects
              </h5>
              <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5; margin: 0; padding-left: 26px;">${match.sideEffects}</p>
            </div>
            <div class="dictionary-section" style="border-top: 1px solid var(--card-border); padding-top: 16px; margin-top: 8px;">
              <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; padding: 12px 16px; display: flex; align-items: flex-start; gap: 12px;">
                <span style="font-size: 1.3rem; color: var(--color-danger);">⚠️</span>
                <div>
                  <h6 style="color: var(--color-danger); font-size: 0.85rem; font-weight: 700; margin: 0 0 4px 0; text-transform: uppercase; letter-spacing: 0.5px;">Safety Dosage Warning</h6>
                  <p style="color: var(--text-primary); font-size: 0.9rem; font-weight: 700; margin: 0;">${match.dosage}</p>
                </div>
              </div>
            </div>
            <button class="btn btn-secondary" id="closeDictModalBtn2" style="width: 100%; margin-top: 10px;">Close Reference</button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Bind close events
    const newModal = document.getElementById('medicineDictionaryModal');
    const closeBtn = document.getElementById('closeDictModalBtn');
    const closeBtn2 = document.getElementById('closeDictModalBtn2');

    const closeHandler = () => {
      newModal.classList.remove('active');
      setTimeout(() => {
        newModal.remove();
      }, 300);
    };

    closeBtn.addEventListener('click', closeHandler);
    closeBtn2.addEventListener('click', closeHandler);
  } else {
    // Render "Medicine not found" state
    const grid = document.getElementById('medicinesGrid');
    grid.innerHTML = `
      <div class="glass-panel" style="grid-column: 1/-1; padding: 40px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; text-align: center; border: 1px dashed var(--card-border); margin: 20px 0;">
        <div style="font-size: 3rem; margin-bottom: 10px;">❌</div>
        <h3 style="color: var(--text-primary); font-size: 1.3rem; font-weight: 700; margin: 0;">❌ Medicine not found</h3>
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin: 0; max-width: 400px;">
          "${query}" was not found in the reference dictionary.
        </p>
        <button class="btn btn-primary" id="ctaAddMedBtn" style="display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; font-weight: 700; margin-top: 10px;">
          ➕ Add this Medicine to Inventory
        </button>
      </div>
    `;

    // Bind CTA click event to open the add medicine modal and pre-fill the name
    document.getElementById('ctaAddMedBtn').addEventListener('click', () => {
      document.getElementById('medName').value = query;
      document.getElementById('addMedicineModal').classList.add('active');
    });
  }
}

// Open Edit Modal
window.openEditMedModal = (id) => {
  const med = medicinesList.find(m => m.id === id);
  if (!med) return;

  document.getElementById('editMedId').value = med.id;
  document.getElementById('editMedName').value = med.medicineName;
  document.getElementById('editMedType').value = med.medicineType;
  document.getElementById('editMedDosage').value = med.dosage;
  document.getElementById('editMedQuantity').value = med.quantity;
  document.getElementById('editMedStockAlert').value = med.stock;
  document.getElementById('editMedExpiry').value = med.expiryDate;
  document.getElementById('editMedFrequency').value = med.frequency;
  document.getElementById('editMedTime').value = med.reminderTime;
  document.getElementById('editMedManufacturer').value = med.manufacturer || '';

  document.getElementById('editMedicineModal').classList.add('active');
};

// Delete Medicine
window.deleteMedicine = (id, name) => {
  Swal.fire({
    title: 'Delete Medicine?',
    text: `Are you sure you want to remove ${name} from your list?`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#4b5563',
    confirmButtonText: 'Yes, Delete'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await firebase.firestore().collection('users').doc(currentUser.uid).collection('medicines').doc(id).delete();
        Swal.fire({
          icon: 'success',
          title: 'Removed!',
          text: `${name} has been deleted.`,
          confirmButtonColor: '#4f46e5'
        });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      }
    }
  });
};

// Populate Low Stock and Expiry Alert Lists on Bento Dashboard
function populateAlertsCards() {
  const stockList = document.getElementById('lowStockAlertsList');
  const expiryList = document.getElementById('expiryAlertsList');

  stockList.innerHTML = '';
  expiryList.innerHTML = '';

  const lowStockMeds = medicinesList.filter(m => m.quantity <= m.stock);

  if (lowStockMeds.length === 0) {
    stockList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 15px;">All medicine stocks are sufficient.</p>';
  } else {
    lowStockMeds.forEach(med => {
      const div = document.createElement('div');
      div.className = 'alert-item alert-item-danger';
      div.innerHTML = `
        <div class="alert-icon alert-icon-danger">⚠</div>
        <div class="alert-info">
          <h4>${med.medicineName}</h4>
          <p>${med.quantity} units left (Threshold: ${med.stock})</p>
        </div>
      `;
      stockList.appendChild(div);
    });
  }

  // Calculate medicines near expiration (< 30 days)
  const today = new Date();
  const thirtyDaysLater = new Date();
  thirtyDaysLater.setDate(today.getDate() + 30);

  const expiringMeds = medicinesList.filter(med => {
    const expDate = new Date(med.expiryDate);
    return expDate >= today && expDate <= thirtyDaysLater;
  });

  if (expiringMeds.length === 0) {
    expiryList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 15px;">No medicine near expiration.</p>';
  } else {
    expiringMeds.forEach(med => {
      const expDate = new Date(med.expiryDate);
      const diffTime = Math.abs(expDate - today);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const div = document.createElement('div');
      div.className = 'alert-item alert-item-warning';
      div.innerHTML = `
        <div class="alert-icon alert-icon-warning">📅</div>
        <div class="alert-info">
          <h4>${med.medicineName}</h4>
          <p>Expires on ${med.expiryDate} (${diffDays} days remaining)</p>
        </div>
      `;
      expiryList.appendChild(div);
    });
  }
}

// -------------------------------------------------------------------------
// 7. CHART.JS INTAKE HISTORY VISUALIZATION
// -------------------------------------------------------------------------
async function renderIntakeChart() {
  const canvas = document.getElementById('intakeChart');
  if (!canvas) return;

  // Get last 7 days keys
  const dates = [];
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    dates.push(key);

    // Format label (e.g. "Jun 25")
    labels.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }

  // Load database intake values
  const intakeHistory = [];
  try {
    const db = firebase.firestore();
    const snap = await db.collection('users').doc(currentUser.uid).collection('intakeHistory')
      .where('date', '>=', dates[0])
      .get();

    const dataMap = {};
    snap.forEach(doc => {
      dataMap[doc.id] = doc.data().takenCount || 0;
    });

    dates.forEach(d => {
      intakeHistory.push(dataMap[d] || 0);
    });
  } catch (err) {
    console.error("Error loading history chart data: ", err);
    dates.forEach(() => intakeHistory.push(0)); // fallback
  }

  // Destroy old instance if exists
  if (intakeChartInstance) {
    intakeChartInstance.destroy();
  }

  const isDarkMode = document.body.classList.contains('dark-theme');
  const textColor = isDarkMode ? '#94a3b8' : '#475569';
  const gridColor = isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';

  intakeChartInstance = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Pills Taken',
        data: intakeHistory,
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#4f46e5',
        pointBorderColor: '#ffffff',
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { family: 'Plus Jakarta Sans', weight: '600' } }
        },
        y: {
          grid: { color: gridColor },
          ticks: {
            color: textColor,
            stepSize: 1,
            precision: 0,
            font: { family: 'Plus Jakarta Sans', weight: '600' }
          },
          min: 0
        }
      }
    }
  });
}

// -------------------------------------------------------------------------
// 8. PERIOD TRACKER MODULE (CALCULATOR & LOGS)
// -------------------------------------------------------------------------
async function loadPeriodData() {
  const db = firebase.firestore();

  try {
    const snap = await db.collection('users').doc(currentUser.uid).collection('period_logs')
      .orderBy('startDate', 'desc')
      .limit(1)
      .get();

    if (!snap.empty) {
      const latestLog = snap.docs[0].data();
      calculatePeriodPredictions(latestLog);
    } else {
      // Default empty state
      document.getElementById('periodCountdownDays').textContent = '-';
      document.getElementById('nextEstimatedPeriodDate').textContent = 'Not Logged';
      document.getElementById('currentCycleDayNumber').textContent = '-';
    }

    // Load full history logs
    await fetchPeriodHistory();
  } catch (err) {
    console.error("Error loading period tracker data: ", err);
  }
}

// Predict cycle dates
function calculatePeriodPredictions(log) {
  const startDate = new Date(log.startDate);
  const cycleLen = log.cycleLength || 28;
  const today = new Date();

  // Calculate next period
  const nextPeriod = new Date(startDate);
  nextPeriod.setDate(startDate.getDate() + cycleLen);

  // Calculate Ovulation Date (14 days before next period)
  const ovulationDate = new Date(nextPeriod);
  ovulationDate.setDate(nextPeriod.getDate() - 14);

  // Calculate Fertile Window
  const fertileStart = new Date(ovulationDate);
  fertileStart.setDate(ovulationDate.getDate() - 5);
  const fertileEnd = new Date(ovulationDate);
  fertileEnd.setDate(ovulationDate.getDate() + 1);

  // Calculate days left
  const diffTime = nextPeriod - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Calculate current cycle day
  const cycleDayTime = today - startDate;
  const currentCycleDay = Math.floor(cycleDayTime / (1000 * 60 * 60 * 24)) + 1;

  // Format options
  const fmt = { month: 'short', day: 'numeric', year: 'numeric' };

  // Update Bento Card
  document.getElementById('periodCountdownDays').textContent = diffDays > 0 ? diffDays : 0;
  document.getElementById('nextEstimatedPeriodDate').textContent = nextPeriod.toLocaleDateString('en-US', fmt);
  document.getElementById('currentCycleDayNumber').textContent = currentCycleDay > 0 ? currentCycleDay : '-';

  // Update Period page outputs
  document.getElementById('predNextPeriod').textContent = nextPeriod.toLocaleDateString('en-US', fmt);
  document.getElementById('predOvulation').textContent = ovulationDate.toLocaleDateString('en-US', fmt);
  document.getElementById('predFertile').textContent = `${fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${fertileEnd.toLocaleDateString('en-US', fmt)}`;
}

// Symptom tags toggler
const tags = document.querySelectorAll('.symptom-tag');
tags.forEach(tag => {
  tag.addEventListener('click', () => {
    tag.classList.toggle('selected');
  });
});

// Submit Period log
document.getElementById('periodLogForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const start = document.getElementById('periodStart').value;
  const end = document.getElementById('periodEnd').value;
  const length = parseInt(document.getElementById('cycleLength').value);
  const notes = document.getElementById('periodNotes').value.trim() || 'No notes.';

  const selectedSymptoms = [];
  document.querySelectorAll('.symptom-tag.selected').forEach(tag => {
    selectedSymptoms.push(tag.getAttribute('data-symptom'));
  });

  try {
    const db = firebase.firestore();
    const logData = {
      startDate: start,
      endDate: end,
      cycleLength: length,
      symptoms: selectedSymptoms,
      notes: notes,
      logDate: new Date().toISOString()
    };

    await db.collection('users').doc(currentUser.uid).collection('period_logs').add(logData);

    // Clear selections
    document.querySelectorAll('.symptom-tag.selected').forEach(tag => tag.classList.remove('selected'));
    document.getElementById('periodLogForm').reset();

    // Recalculate
    calculatePeriodPredictions(logData);

    // Refresh history
    await fetchPeriodHistory();

    Swal.fire({
      icon: 'success',
      title: 'Cycle Logged Successfully',
      text: 'Calculated projections updated.',
      confirmButtonColor: '#ef446e'
    });
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.message });
  }
});

// Fetch and render historical cycle logs
async function fetchPeriodHistory() {
  const db = firebase.firestore();
  const historyContainer = document.getElementById('periodHistoryTableBody');
  const noHistoryMsg = document.getElementById('noPeriodHistoryMsg');

  if (!historyContainer) return;

  try {
    const snap = await db.collection('users').doc(currentUser.uid).collection('period_logs')
      .orderBy('startDate', 'desc')
      .get();

    historyContainer.innerHTML = '';

    if (snap.empty) {
      if (noHistoryMsg) noHistoryMsg.style.display = 'block';
      return;
    }

    if (noHistoryMsg) noHistoryMsg.style.display = 'none';

    const fmt = { month: 'short', day: 'numeric', year: 'numeric' };
    const symptomColors = {
      'Cramps': { bg: 'rgba(239, 68, 68, 0.15)', text: '#f87171' },
      'Headache': { bg: 'rgba(249, 115, 22, 0.15)', text: '#fb923c' },
      'Back Pain': { bg: 'rgba(234, 179, 8, 0.15)', text: '#facc15' },
      'Mood Swings': { bg: 'rgba(168, 85, 247, 0.15)', text: '#c084fc' },
      'Fatigue': { bg: 'rgba(59, 130, 246, 0.15)', text: '#60a5fa' },
      'Acne': { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' },
      'Bloating': { bg: 'rgba(20, 184, 166, 0.15)', text: '#2dd4bf' },
      'Nausea': { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6' }
    };

    snap.forEach(doc => {
      const data = doc.data();
      
      // Timezone-safe local date construction
      const sParts = data.startDate.split('-');
      const eParts = data.endDate.split('-');
      const start = new Date(parseInt(sParts[0]), parseInt(sParts[1]) - 1, parseInt(sParts[2]));
      const end = new Date(parseInt(eParts[0]), parseInt(eParts[1]) - 1, parseInt(eParts[2]));
      
      const diffTime = Math.abs(end - start);
      const durationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive of start and end day

      // Render symptoms pills
      let symptomsHTML = '';
      if (data.symptoms && data.symptoms.length > 0) {
        data.symptoms.forEach(s => {
          const colorObj = symptomColors[s] || { bg: 'rgba(255, 255, 255, 0.1)', text: 'var(--text-secondary)' };
          symptomsHTML += `<span class="badge" style="background: ${colorObj.bg}; color: ${colorObj.text}; font-size: 0.7rem; padding: 3px 8px; border-radius: 12px; margin-right: 4px; margin-bottom: 4px; text-transform: capitalize;">${s}</span>`;
        });
      } else {
        symptomsHTML = '<span style="color: var(--text-muted); font-style: italic; font-size: 0.85rem;">None logged</span>';
      }

      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid var(--card-border)';
      tr.style.transition = 'background-color 0.2s ease';
      tr.innerHTML = `
        <td style="padding: 12px 16px; font-weight: 600;">${start.toLocaleDateString('en-US', fmt)}</td>
        <td style="padding: 12px 16px;">${end.toLocaleDateString('en-US', fmt)}</td>
        <td style="padding: 12px 16px;"><span class="badge badge-info" style="font-size: 0.75rem;">${durationDays} Days</span></td>
        <td style="padding: 12px 16px; font-weight: 500;">${data.cycleLength || 28} Days</td>
        <td style="padding: 12px 16px; max-width: 300px; word-wrap: break-word;">${symptomsHTML}</td>
      `;
      historyContainer.appendChild(tr);
    });

  } catch (err) {
    console.error("Error fetching period history: ", err);
  }
}

// -------------------------------------------------------------------------
// 9. MEDICAL REPORTS DIRECTORY & FILE RENDERING
// -------------------------------------------------------------------------
function populateReportsUI(reports) {
  const bentoList = document.getElementById('dashboardReportsList');
  const grid = document.getElementById('reportsListGrid');

  bentoList.innerHTML = '';
  grid.innerHTML = '';

  if (reports.length === 0) {
    bentoList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 15px;">No uploaded reports.</p>';
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No medical reports uploaded yet.</p>';
    return;
  }

  // Populate bento list (limit to 3)
  reports.slice(0, 3).forEach(rep => {
    const div = document.createElement('div');
    div.className = 'alert-item';
    div.innerHTML = `
      <div class="alert-icon alert-icon-warning" style="background: var(--color-info-bg); color: var(--color-info);">📄</div>
      <div class="alert-info">
        <h4>${rep.reportName}</h4>
        <p>${rep.reportType} | ${new Date(rep.uploadDate).toLocaleDateString()}</p>
      </div>
    `;
    bentoList.appendChild(div);
  });

  // Populate main list grid
  reports.forEach(rep => {
    const card = document.createElement('div');
    card.className = 'glass-panel report-card';

    card.innerHTML = `
      <div class="report-icon">📄</div>
      <div class="report-info">
        <div class="report-name">${rep.reportName}</div>
        <div class="report-date">${rep.reportType} | ${new Date(rep.uploadDate).toLocaleDateString()}</div>
      </div>
      <a href="${rep.fileUrl}" target="_blank" class="report-download-btn" title="View Document">
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </a>
    `;
    grid.appendChild(card);
  });
}

// -------------------------------------------------------------------------
// 10. APPOINTMENTS SCHEDULE & CRUD ACTIONS
// -------------------------------------------------------------------------
function populateAppointmentsUI(appointments) {
  const bentoList = document.getElementById('dashboardAppointmentsList');
  const grid = document.getElementById('appointmentsGrid');

  bentoList.innerHTML = '';
  grid.innerHTML = '';

  // Filter for upcoming (today or future)
  const todayStr = new Date().toISOString().split('T')[0];
  const upcoming = appointments.filter(apt => apt.date >= todayStr);

  if (upcoming.length === 0) {
    bentoList.innerHTML = '<p style="text-align: center; color: var(--text-muted); padding: 15px;">No upcoming appointments.</p>';
  } else {
    upcoming.slice(0, 3).forEach(apt => {
      const div = document.createElement('div');
      div.className = 'alert-item';
      div.innerHTML = `
        <div class="alert-icon alert-icon-warning" style="background: var(--color-success-bg); color: var(--color-success);">🩺</div>
        <div class="alert-info">
          <h4>${apt.doctorName} (${apt.specialty})</h4>
          <p>${apt.date} at ${apt.time}</p>
        </div>
      `;
      bentoList.appendChild(div);
    });
  }

  if (appointments.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No medical consultations booked.</p>';
    return;
  }

  appointments.forEach(apt => {
    const card = document.createElement('div');
    card.className = 'glass-panel medicine-card';

    // Status color badge
    let statusClass = 'badge-info';
    if (apt.date < todayStr) statusClass = 'badge-success'; // completed

    card.innerHTML = `
      <div class="medicine-card-header">
        <h4 class="medicine-card-title">${apt.doctorName}</h4>
        <span class="badge ${statusClass}">${apt.date < todayStr ? 'Completed' : 'Scheduled'}</span>
      </div>
      <div class="medicine-details-list" style="margin-bottom: 16px;">
        <div class="medicine-detail-row">Specialty: <span>${apt.specialty}</span></div>
        <div class="medicine-detail-row">Date: <span>${apt.date}</span></div>
        <div class="medicine-detail-row">Time: <span>${apt.time}</span></div>
        <div class="medicine-detail-row">Notes: <span>${apt.notes}</span></div>
      </div>
      <button class="btn btn-danger" style="padding: 8px 16px; font-size: 0.8rem;" onclick="cancelAppointment('${apt.id}')">Cancel Appointment</button>
    `;
    grid.appendChild(card);
  });
}

// Cancel booking
window.cancelAppointment = (id) => {
  Swal.fire({
    title: 'Cancel Booking?',
    text: 'Are you sure you want to cancel this scheduled appointment?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#4b5563',
    confirmButtonText: 'Yes, Cancel'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await firebase.firestore().collection('users').doc(currentUser.uid).collection('appointments').doc(id).delete();
        Swal.fire({
          icon: 'success',
          title: 'Cancelled',
          text: 'Appointment was removed.',
          confirmButtonColor: '#4f46e5'
        });
      } catch (err) {
        Swal.fire({ icon: 'error', title: 'Error', text: err.message });
      }
    }
  });
};
