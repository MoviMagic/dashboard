// dashboard.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
    } else {
        // User is not logged in
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
    }
});
