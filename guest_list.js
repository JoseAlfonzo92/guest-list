/* // Retrieve and display guest list
const guests = JSON.parse(localStorage.getItem('guests')) || [];
const guestList = document.getElementById('guest-list');

guests.forEach((guest, index) => {
    const listItem = document.createElement('li');

    const guestInfo = document.createElement('span');
    guestInfo.textContent = `Name: ${guest.name}, Contact: ${guest.contact}`;
    listItem.appendChild(guestInfo);

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editGuest(index));
    listItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteGuest(index));
    listItem.appendChild(deleteButton);

    guestList.appendChild(listItem);
});

function editGuest(index) {
    const newName = prompt('Enter new name:', guests[index].name);
    const newContact = prompt('Enter new contact:', guests[index].contact);
    if (newName && newContact) {
        guests[index].name = newName;
        guests[index].contact = newContact;
        localStorage.setItem('guests', JSON.stringify(guests));
        location.reload(); // Reload the page to reflect changes
    }
}

function deleteGuest(index) {
    if (confirm('Are you sure you want to delete this guest?')) {
        guests.splice(index, 1);
        localStorage.setItem('guests', JSON.stringify(guests));
        location.reload(); // Reload the page to reflect changes
    }
} */




   /*  document.addEventListener('DOMContentLoaded', () => {
        const guestList = document.getElementById('guest-list');
    
        // Fetch guests from Firestore
        firebase.firestore().collection('guests').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const guest = doc.data();
                const listItem = document.createElement('li');
    
                const guestInfo = document.createElement('span');
                guestInfo.textContent = `Name: ${guest.name}, Contact: ${guest.contact}`;
                listItem.appendChild(guestInfo);
    
                const editButton = document.createElement('button');
                editButton.textContent = 'Edit';
                editButton.addEventListener('click', () => editGuest(doc.id, guest));
                listItem.appendChild(editButton);
    
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', () => deleteGuest(doc.id));
                listItem.appendChild(deleteButton);
    
                guestList.appendChild(listItem);
            });
        });
    
        function editGuest(id, guest) {
            const newName = prompt('Enter new name:', guest.name);
            const newContact = prompt('Enter new contact:', guest.contact);
            if (newName && newContact) {
                firebase.firestore().collection('guests').doc(id).update({
                    name: newName,
                    contact: newContact
                }).then(() => {
                    location.reload(); // Reload the page to reflect changes
                }).catch((error) => {
                    console.error('Error updating document: ', error);
                });
            }
        }
    
        function deleteGuest(id) {
            if (confirm('Are you sure you want to delete this guest?')) {
                firebase.firestore().collection('guests').doc(id).delete().then(() => {
                    location.reload(); // Reload the page to reflect changes
                }).catch((error) => {
                    console.error('Error deleting document: ', error);
                });
            }
        }
    }); */




import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_twaPnI7WYm2uWBCDhvvWhOLqNI6psNE",
    authDomain: "birthday-card-and-guest-list.firebaseapp.com",
    databaseURL: "https://birthday-card-and-guest-list-default-rtdb.firebaseio.com",
    projectId: "birthday-card-and-guest-list",
    storageBucket: "birthday-card-and-guest-list.firebasestorage.app",
    messagingSenderId: "968389124243",
    appId: "1:968389124243:web:20153e019dec1d44b06d66",
    measurementId: "G-3FZRZTWTSG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', async () => {
    const guestList = document.getElementById('guest-list');

    // Fetch guests from Firestore
    const querySnapshot = await getDocs(collection(db, 'guests'));
    querySnapshot.forEach((doc) => {
        const guest = doc.data();
        const listItem = document.createElement('li');

        const guestInfo = document.createElement('span');
        guestInfo.textContent = `Name: ${guest.name}, Contact: ${guest.contact}`;
        listItem.appendChild(guestInfo);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editGuest(doc.id, guest));
        listItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteGuest(doc.id));
        listItem.appendChild(deleteButton);

        guestList.appendChild(listItem);
    });

    async function editGuest(id, guest) {
        const newName = prompt('Enter new name:', guest.name);
        const newContact = prompt('Enter new contact:', guest.contact);
        if (newName && newContact) {
            try {
                await updateDoc(doc(db, 'guests', id), {
                    name: newName,
                    contact: newContact
                });
                location.reload(); // Reload the page to reflect changes
            } catch (error) {
                console.error('Error updating document: ', error);
            }
        }
    }

    async function deleteGuest(id) {
        if (confirm('Are you sure you want to delete this guest?')) {
            try {
                await deleteDoc(doc(db, 'guests', id));
                location.reload(); // Reload the page to reflect changes
            } catch (error) {
                console.error('Error deleting document: ', error);
            }
        }
    }
});
