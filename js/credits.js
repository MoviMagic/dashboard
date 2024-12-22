// credits.js
import { db } from '../firebase-config.js';
import { collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const creditsTableBody = document.querySelector('#credits-table tbody');
const addCreditsButton = document.getElementById('add-credits');

// Fetch and display credits
async function fetchCredits() {
    creditsTableBody.innerHTML = '';
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);

    snapshot.forEach(userDoc => {
        const user = userDoc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${userDoc.id}</td>
            <td>${user.name || 'N/A'}</td>
            <td>${user.email}</td>
            <td>${user.credits || 0}</td>
            <td>
                <button onclick="addCredits('${userDoc.id}')">Add Credits</button>
            </td>
        `;
        creditsTableBody.appendChild(row);
    });
}

// Add credits to a user
async function addCredits(userId) {
    const additionalCredits = parseInt(prompt('Enter the amount of credits to add:'), 10);
    if (!isNaN(additionalCredits)) {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDocs(userRef);
        const currentCredits = userSnap.data().credits || 0;
        await updateDoc(userRef, { credits: currentCredits + additionalCredits });
        fetchCredits();
    }
}

// Initial fetch
fetchCredits();
