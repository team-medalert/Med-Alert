# Med-Alert: Smart Personal Healthcare Management System

## 1. Project Overview

### Project Name

**Med-Alert**

### Project Type

Healthcare Management Web Application

### Platform

- Responsive Web Application
- Desktop
- Tablet
- Mobile

### Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)
- Responsive UI

### Backend

- Firebase Authentication
- Cloud Firestore Database
- Firebase Storage
- Firebase Hosting

---

# 2. Project Objective

Med-Alert is a healthcare management platform that helps users manage:

- Personal health information
- Medicine reminders
- Medicine stock tracking
- Emergency contacts
- Period tracking
- Health dashboard
- Health analytics

The application should provide a modern, secure, and responsive healthcare experience with Lenis smooth scroll.

---

# 3. Authentication System

## Features

### Registration

- Email registration
- Password registration
- Password visibility toggle
- Form validation

### Login

- Email login
- Password login
- Password visibility toggle
- Remember login session

### Authentication Provider

- Firebase Authentication

### Authentication Flow

Register → Login → Profile Setup → Dashboard

---

# 4. First Time User Flow

After successful registration and login:

1. User enters profile information.
2. User completes medical profile.
3. User adds emergency contact.
4. User is redirected to dashboard.
5. Dashboard displays personalized health information.

---

# 5. User Profile Page

## Purpose

Collect and store personal and medical information.

---

## Section 1: Personal Information

### Fields

- Full Name
- Profile Photo
- Email Address
- Phone Number
- Date of Birth
- Age
- Gender
- Address

### Gender Options

- Male
- Female
- Other

---

## Section 2: Medical Information

### Fields

- Blood Group
- Height
- Weight
- Allergies
- Chronic Diseases
- Current Medications
- Doctor Name
- Doctor Contact Number

### Blood Group Options

- A+
- A-
- B+
- B-
- AB+
- AB-
- O+
- O-

---

## Section 3: Emergency Contact

### Fields

- Contact Name
- Relationship
- Phone Number
- Alternate Phone Number

### Relationship Examples

- Father
- Mother
- Brother
- Sister
- Spouse
- Friend
- Others( let the relationship be written by the user)

---

## Section 4: Account Settings

Features:

- Change Password
- Change Email
- Notification Settings
- Dark Mode
- Logout

---

# 6. Dashboard

The dashboard is the main user homepage.

---

## Dashboard Header

Display:

- User Name
- Welcome Message
- Current Date
- Profile Photo

---

## Health Summary Card

Display:

- Age
- Blood Group
- Weight
- Height
- Allergies
- Chronic Diseases

---

## Today's Medicine Reminder

Display:

- Medicine Name
- Time
- Dosage
- Status

Status:

- Pending
- Taken
- Missed

---

## Medicine Stock Alert

Display medicines having low stock.

Example:

- Paracetamol (5 tablets left)
- Vitamin C (2 tablets left)

---

## Medicine Expiry Alert

Display:

- Medicine Name
- Expiry Date
- Days Remaining

---

## Emergency Contact Card

Display:

- Contact Name
- Relationship
- Phone Number

Buttons:

- Call
- Message

---

## Recent Medical Reports

Display:

- Report Name
- Upload Date
- Report Type

---

## Quick Action Buttons

- Add Medicine
- Add Report
- Update Profile
- Add Reminder
- Emergency Call

---

# 7. Medicine Management Module

## Purpose

Manage medicine stock and reminders.

---

## Add Medicine

Fields:

- Medicine Name
- Medicine Type
- Dosage
- Quantity
- Stock Quantity
- Expiry Date
- Manufacturer
- Frequency
- Reminder Time

---

## Medicine Types

- Tablet
- Capsule
- Syrup
- Injection
- Cream
- Drops

---

## Reminder Frequency

- Daily
- Twice Daily
- Weekly
- Monthly

---

## Medicine List Page

Display:

- Medicine Name
- Dosage
- Quantity
- Remaining Stock
- Expiry Date
- Reminder Time

---

## Features

- Edit Medicine
- Delete Medicine
- Stock Alert
- Expiry Alert
- Search Medicine
- Filter Medicine

---

# 8. Period Tracker Module

## Purpose

Track menstrual cycle and health. Make it visible only if gender is chosen as Women. Don't show for other genders.

---

## Period Tracking Fields

### Basic Information

- Period Start Date
- Period End Date

---

## Symptoms

User can select:

- Cramps
- Headache
- Back Pain
- Mood Swings
- Fatigue
- Acne
- Bloating
- Nausea

---

## Additional Notes

- User notes
- Mood tracking

---

## Prediction System

Calculate:

- Next Period Date
- Cycle Length
- Ovulation Date
- Fertile Window

---

## Dashboard Information

Display:

- Days until next period
- Current cycle day
- Estimated next date

---

## Suggestions Section

Provide health suggestions:

- Drink water
- Get proper sleep
- Exercise
- Healthy diet
- Stress management

---

# 11. Dark Mode

Provide:

- Light Mode
- Dark Mode

Save user preference.

---

# 12. Responsive Design

Application should support:

- Mobile
- Tablet
- Laptop
- Desktop

---

# 13. Firestore Database Structure

users

uid

profile

emergencyContact

medicines

periodTracker

---

# users/profile

- fullName
- email
- phone
- age
- gender
- bloodGroup
- height
- weight
- allergies
- chronicDiseases

---

# users/emergencyContact

- name
- relationship
- phone

---

# users/medicines

- medicineName
- dosage
- quantity
- stock
- expiryDate
- reminderTime

---

# users/periodTracker

- startDate
- endDate
- symptoms
- nextPeriodDate
- cycleLength

---

# 14. Dashboard Cards

1. Health Summary
2. Today's Medicines
3. Low Stock Alert
4. Expiry Alert
5. Emergency Contact
6. Recent Reports
7. Period Tracker
8. Appointments
9. Quick Actions
10. Contact us ( in the main homepage at bottom) ( details as- Name - Team Med-Alert, Email - team.medalert@gmail.com)

---

# 15. Security Requirements

- Firebase Authentication
- Protected Routes
- User-specific data access
- Firestore Security Rules
- Secure file uploads

---

# 17. Final Application Flow

Register

↓

Login

↓

Complete Profile

↓

Add Medical Information

↓

Add Emergency Contact

↓

Dashboard

↓

Manage Medicines

↓

Track Periods

---

# Goal

Build a modern healthcare management platform that helps users:

- Manage medicines
- Track health information
- Monitor medicine stock
- Track menstrual cycles
- Maintain emergency contacts

The application should be secure, responsive, and easy to use.

I want to elevate the frontend UI of the Med-Alert multi-page project. Please update our files to incorporate these modern design features:

1. Add the Lenis Smooth Scroll CDN library and initialize it globally in our scripts.
2. Link GSAP and ScrollTrigger CDNs to animate dashboard sections as they scroll into view.
3. Use a Glassmorphic Bento Grid design in dashboard.html using clean modern CSS (`backdrop-filter`).
4. Replace all native JavaScript `alert()` popups across login.js, register.js, and dashboard.js with beautifully styled SweetAlert2 notifications.
5. Integrate Chart.js inside dashboard.js to pull data from Firestore and render a beautiful animated line chart of medicine intake history.

Keep the clean Vanilla JS stack. Ensure all CDNs are placed in the headers/footers properly.