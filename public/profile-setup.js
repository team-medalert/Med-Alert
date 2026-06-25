// Global State Variables
let currentStep = 1;
let selectedPhotoFile = null;
let currentUser = null;

// Auth check
document.addEventListener('DOMContentLoaded', () => {
  const checkAuth = setInterval(() => {
    if (typeof firebase !== 'undefined' && firebase.apps.length > 0) {
      clearInterval(checkAuth);
      firebase.auth().onAuthStateChanged(user => {
        if (!user) {
          window.location.href = 'login.html';
        } else {
          currentUser = user;
        }
      });
    }
  }, 200);
});

// UI Elements
const progressBar = document.getElementById('progressBar');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const setupForm = document.getElementById('setupForm');

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');

// File Upload Handler
const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
const profilePhotoInput = document.getElementById('profilePhotoInput');
const photoPreview = document.getElementById('photoPreview');

uploadPhotoBtn.addEventListener('click', () => {
  profilePhotoInput.click();
});

profilePhotoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'File Too Large',
        text: 'Profile photo size must be less than 2MB.',
        confirmButtonColor: '#4f46e5'
      });
      return;
    }
    selectedPhotoFile = file;
    photoPreview.src = URL.createObjectURL(file);
  }
});

// DOB Age Auto-Calculation
const dobInput = document.getElementById('dob');
const ageInput = document.getElementById('age');

dobInput.addEventListener('change', () => {
  const dob = new Date(dobInput.value);
  if (!isNaN(dob.getTime())) {
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    ageInput.value = age >= 0 ? age : 0;
  }
});

// Emergency Relationship "Others" trigger
const emergencyRelationship = document.getElementById('emergencyRelationship');
const relationshipOtherGroup = document.getElementById('relationshipOtherGroup');
const relationshipOther = document.getElementById('relationshipOther');

emergencyRelationship.addEventListener('change', () => {
  if (emergencyRelationship.value === 'Others') {
    relationshipOtherGroup.style.display = 'flex';
    relationshipOther.setAttribute('required', 'true');
  } else {
    relationshipOtherGroup.style.display = 'none';
    relationshipOther.removeAttribute('required');
  }
});

// Navigation Handlers
nextBtn.addEventListener('click', () => {
  if (validateStep(currentStep)) {
    goToStep(currentStep + 1);
  }
});

backBtn.addEventListener('click', () => {
  goToStep(currentStep - 1);
});

function goToStep(step) {
  // Hide current step content
  document.getElementById(`step${currentStep}`).classList.remove('active');
  document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.remove('active');

  // Update step
  currentStep = step;

  // Show new step content
  document.getElementById(`step${currentStep}`).classList.add('active');
  document.querySelector(`.progress-step[data-step="${currentStep}"]`).classList.add('active');

  // Update Progress Line width
  progressBar.style.width = `${((currentStep - 1) / 2) * 100}%`;

  // Update buttons
  if (currentStep === 1) {
    backBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  } else if (currentStep === 2) {
    backBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  } else if (currentStep === 3) {
    backBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
  }
}

// Field validation for each step before advancing
function validateStep(step) {
  if (step === 1) {
    const fullName = document.getElementById('fullName').value.trim();
    const dob = dobInput.value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!fullName || !dob || !gender || !phone || !address) {
      showValidationError();
      return false;
    }
  } else if (step === 2) {
    const bloodGroup = document.getElementById('bloodGroup').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    if (!bloodGroup || !height || !weight) {
      showValidationError();
      return false;
    }
  }
  return true;
}

function showValidationError() {
  Swal.fire({
    icon: 'warning',
    title: 'Missing Fields',
    text: 'Please fill in all required fields before moving to the next step.',
    confirmButtonColor: '#4f46e5'
  });
}

// Submit Form Handler
setupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!currentUser) return;

  // Final validations
  const emergencyName = document.getElementById('emergencyName').value.trim();
  const rel = emergencyRelationship.value;
  const finalRelationship = rel === 'Others' ? relationshipOther.value.trim() : rel;
  const emergencyPhone = document.getElementById('emergencyPhone').value.trim();

  if (!emergencyName || !finalRelationship || !emergencyPhone) {
    showValidationError();
    return;
  }

  // Show submission loading spinner
  Swal.fire({
    title: 'Saving Profile...',
    text: 'Uploading data. Please wait.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    const fullNameVal = document.getElementById('fullName').value.trim();
    // Use Dicebear open-source avatar placeholder
    const profilePhotoUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(fullNameVal)}`;

    // 1. Upload photo to Firebase Storage skipped due to Spark free tier restrictions
    /*
    if (selectedPhotoFile) {
      const storageRef = firebase.storage().ref(`users/${currentUser.uid}/profile.jpg`);
      await storageRef.put(selectedPhotoFile);
      profilePhotoUrl = await storageRef.getDownloadURL();
    }
    */

    // 2. Build profile map
    const profile = {
      fullName: fullNameVal,
      email: currentUser.email,
      phone: document.getElementById('phone').value.trim(),
      dob: dobInput.value,
      age: parseInt(ageInput.value),
      gender: document.getElementById('gender').value,
      address: document.getElementById('address').value.trim(),
      bloodGroup: document.getElementById('bloodGroup').value,
      height: parseFloat(document.getElementById('height').value),
      weight: parseFloat(document.getElementById('weight').value),
      allergies: document.getElementById('allergies').value.trim() || 'None',
      chronicDiseases: document.getElementById('chronicDiseases').value.trim() || 'None',
      currentMedications: document.getElementById('currentMedications').value.trim() || 'None',
      doctorName: document.getElementById('doctorName').value.trim() || 'Not Specified',
      doctorContact: document.getElementById('doctorContact').value.trim() || 'Not Specified',
      profilePhoto: profilePhotoUrl,
      profileImage: profilePhotoUrl
    };

    // 3. Build emergencyContact map
    const emergencyContact = {
      name: emergencyName,
      relationship: finalRelationship,
      phone: emergencyPhone,
      altPhone: document.getElementById('emergencyAltPhone').value.trim() || 'Not Specified'
    };

    // 4. Save to Firestore users collection
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(currentUser.uid);

    // Save profile to root document for backward compatibility
    await userRef.set({
      profile: profile,
      emergencyContact: emergencyContact
    });

    // Save profile to subcollection document for auth routing checks
    await userRef.collection('profile').doc('details').set(profile);


    // Success SweetAlert
    Swal.fire({
      icon: 'success',
      title: 'Profile Saved!',
      text: 'Your health profile setup is complete.',
      confirmButtonColor: '#4f46e5',
      timer: 2000,
      showConfirmButton: false
    }).then(() => {
      window.location.href = 'dashboard.html';
    });

  } catch (error) {
    console.error('Error saving profile: ', error);
    Swal.fire({
      icon: 'error',
      title: 'Setup Failed',
      text: 'Error saving profile: ' + error.message,
      confirmButtonColor: '#4f46e5'
    });
  }
});
