// resellers.js
import { db } from '../firebase-config.js';
import { collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const resellersTableBody = document.querySelector('#resellers-table tbody');
const addResellerButton = document.getElementById('add-reseller');

// Fetch and display resellers
async function fetchResellers() {
    resellersTableBody.innerHTML = '';
    const resellersCollection = collection(db, 'resellers');
    const snapshot = await getDocs(resellersCollection);

    snapshot.forEach(resellerDoc => {
        const reseller = resellerDoc.data();
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${resellerDoc.id}</td>
            <td>${reseller.name}</td>
            <td>${reseller.email}</td>
            <td>${reseller.credits}</td>
            <td>
                <button onclick="deleteReseller('${resellerDoc.id}')">Delete</button>
            </td>
        `;
        resellersTableBody.appendChild(row);
    });
}

// Add a new reseller
addResellerButton.addEventListener('click', async () => {
    const name = prompt('Enter reseller name:');
    const email = prompt('Enter reseller email:');
    const credits = parseInt(prompt('Enter reseller credits:'), 10);
    if (name && email && !isNaN(credits)) {
        await addDoc(collection(db, 'resellers'), { name, email, credits });
        fetchResellers();
    }
});

// Delete a reseller
async function deleteReseller(resellerId) {
    if (confirm('Are you sure you want to delete this reseller?')) {
        await deleteDoc(doc(db, 'resellers', resellerId));
        fetchResellers();
    }
}

// Initial fetch
fetchResellers();
