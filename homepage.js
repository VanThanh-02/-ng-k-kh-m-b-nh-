import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { firebaseConfig } from './auth.js'; // Kiểm tra xem đường dẫn này có chính xác không

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to generate a unique ID for the patient
function generateUniqueId() {
    return 'patient-' + Date.now(); // Generate a unique ID based on the current timestamp
}

// Function to add a patient
async function addPatient(event) {
    event.preventDefault();

    const patientData = {
        idNumber: generateUniqueId(), // Automatically generate ID
        patientName: document.getElementById('patientName').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        occupation: document.getElementById('occupation').value,
        address: document.getElementById('address').value,
        medicalHistory: document.getElementById('medicalHistory').value,
        currentHealth: document.getElementById('currentHealth').value,
        appointmentDate: document.getElementById('appointmentDate').value,
        startTime: document.getElementById('startTime').value,
        endTime: document.getElementById('endTime').value,
    };

    try {
        // Use the generated ID as a unique identifier for each patient
        const docRef = doc(db, "patientts", patientData.idNumber); // Corrected "patientts" to "patients"
        await setDoc(docRef, patientData);
        alert('Bệnh nhân đã được thêm thành công!'); // Success alert
    } catch (error) {
        console.error("Error adding patient: ", error);
        alert('Có lỗi xảy ra, vui lòng thử lại!'); // Error alert
    }

    // Reset form
    document.getElementById("userInfoForm").reset();
    document.getElementById('endTime').value = ""; // Reset end time
}

// Initialize event listeners
export function initEventListeners() {
    document.getElementById("submitInfo").addEventListener("click", addPatient);
}
