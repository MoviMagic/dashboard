// users.js
import { db } from '../firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const usersTableBody = document.querySelector('#users-table tbody');
const addUserButton = document.getElementById('add-user');

// Fetch and display users
async function fetchUsers() {
    usersTableBody.innerHTML = '';
    const usersCollection = collection(db, 'users');
    const snapshot = await getDocs(usersCollection);

    snapshot.forEach(userDoc => {
        const user = userDoc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${userDoc.id}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
                <button onclick="deleteUser('${userDoc.id}')">Delete</button>
            </td>
        `;
        usersTableBody.appendChild(row);
    });
}

// Add a new user
addUserButton.addEventListener('click', async () => {
    const email = prompt('Enter user email:');
    const role = prompt('Enter user role (admin/user):');
    if (email && role) {
        await addDoc(collection(db, 'users'), { email, role });
        fetchUsers();
    }
});

// Delete a user
async function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        await deleteDoc(doc(db, 'users', userId));
        fetchUsers();
    }
}

// Initial fetch
fetchUsers();