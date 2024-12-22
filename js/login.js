// login.js
import { db } from './firebase-config.js';
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

const auth = getAuth();
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const loginContainer = document.getElementById('login-container');
const dashboardContainer = document.getElementById('dashboard-container');
const logoutButton = document.getElementById('logout-button');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        loginContainer.style.display = 'none';
        dashboardContainer.style.display = 'block';
    } catch (error) {
        loginError.textContent = "Login failed: " + error.message;
    }
});

logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
        loginContainer.style.display = 'block';
        dashboardContainer.style.display = 'none';
    });
});
