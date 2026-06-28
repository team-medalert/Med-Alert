# Med-Alert: Final Layout Optimization and Bug Fix Specification

You are modifying an existing multi-page codebase for a college project named "Med-Alert". Your priority is structural continuity. Apply these precise UI fixes and logic corrections across the target workspace files directly.

---

## Task 1: Mobile Medicine Search Fix (Adding Dedicated Search Button)
- **Target Files:** `public/details.html` and `public/details.js`
- **Issue:** Mobile keyboards do not trigger the desktop PC `Enter` key event cleanly. The lookup database logic fails to load suggestions on mobile screen taps.
- **Modification Requirements:**
  1. In `public/details.html`: Locate the search text container bar. Append a dedicated action button right next to the text field holding a search icon (`🔍 Search`) using fluid design parameters to match our glassmorphic theme.
  2. In `public/details.js`: Refactor the execution event listeners. Extract the active filter function and bind it uniformly to both the text field `keypress` parameter (for PC Enter triggers) and a direct `click`/`tap` handler targeting the new search button element (for mobile screen inputs).

---

## Task 2: Hide Mobile Hamburger Menu on Desktop Views
- **Target Files:** `public/style.css`
- **Issue:** The mobile hamburger slide toggle icons render on wide desktop monitors, causing the layout to look out of place on PC views.
- **Modification Requirements:**
  1. Hide the hamburger toggle buttons (`#menu-toggle-btn` or mobile nav containers) globally on the base CSS sheet by applying a `display: none !important;` parameter to them.
  2. In your screen width media query layout section (`@media screen and (max-width: 768px)`), selectively override the hide rule by setting `.mobile-nav-bar` or `#menu-toggle-btn` elements to `display: flex !important;` so they only appear on smaller screens.

---

## Task 3: Enforce Strict Dashboard Gender Rules (Hide Period Card)
- **Target Files:** `public/dashboard.js` and `public/dashboard.html`
- **Issue:** The main landing workspace hub displays the period tracking overview tile panel metadata for all users, regardless of gender profile constraints.
- **Modification Requirements:**
  1. In `public/dashboard.js`: Locate the section where the active user profile data is queried from Cloud Firestore (`db.collection('users').doc(user.uid).collection('profile').doc('details').get()`).
  2. Read the `gender` document field property, strip any extra spacing, and standardise it to lower-case.
  3. Locate the primary calendar wrapper card block (e.g., element ID `#dashboard-period-card`). If the verified string matches exactly `female`, apply `style.display = 'block';`. For any other gender record value, explicitly hardcode `style.display = 'none';` to hide it from the DOM canvas immediately.

---

## Task 4: Standardize Profile Select Form Strings
- **Target Files:** `public/profile-setup.html` and `public/register.html`
- **Issue:** The dropdown option text currently reads "female(woman)" instead of a clean, standardized string.
- **Modification Requirements:**
  1. Scan the registration and configuration HTML files for the layout elements where `<select id="gender-select">` options are rendered.
  2. Locate the option element containing `value="Female"`. Rewrite the human-readable display text block string inside the tags to read clearly as `Female` (removing any trailing parenthesis notes).

---

## Execution Directives
- Implement these structural adjustments across all target files directly.
- Ensure any added mobile interaction buttons maintain touch padding dimensions of at least 44px for smooth mobile navigation.
- Keep code snippets aligned with the existing dark mode glassmorphic UI framework. Use descriptive comments across modified functions so the development team can explain the patches to college professors during final presentation evaluations.
