import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjUC3FueeuhZgqtKPBqtUZIXUqz0ZlHYE",
  authDomain: "product-b436c.firebaseapp.com",
  databaseURL: "https://product-b436c-default-rtdb.firebaseio.com",
  projectId: "product-b436c",
  storageBucket: "product-b436c.firebasestorage.app",
  messagingSenderId: "676609496614",
  appId: "1:676609496614:web:e1ad847429e4dcbf18f8e7",
  measurementId: "G-275031RSRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Function to save booking information to Firebase
function saveBooking(ownerName, petName, petType, checkInDate, checkOutDate, specialRequests) {
  const bookingsRef = ref(database, 'bookings/');
  const newBookingRef = push(bookingsRef); // Generate a unique ID
  set(newBookingRef, {
    ownerName,
    petName,
    petType,
    checkInDate,
    checkOutDate,
    specialRequests
  })
  .then(() => {
    alert('Đặt phòng thành công!');
    // Optionally, clear the form fields
    document.getElementById('bookingForm').reset();
  })
  .catch((error) => {
    alert('Lỗi khi đặt phòng: ' + error.message);
  });
}

// Handle form submission
document.getElementById('bookingForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const ownerName = document.getElementById('ownerName').value;
  const petName = document.getElementById('petName').value;
  const petType = document.getElementById('petType').value;
  const checkInDate = document.getElementById('checkInDate').value;
  const checkOutDate = document.getElementById('checkOutDate').value;
  const specialRequests = document.getElementById('specialRequests').value;

  // Validate form fields
  if (!ownerName || !petName || !petType || !checkInDate || !checkOutDate) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  // Check if dates are in the past
  const today = new Date().toISOString().split('T')[0];
  if (checkInDate < today || checkOutDate < today) {
    alert('Ngày nhận phòng và ngày trả phòng không được là ngày trong quá khứ.');
    return;
  }

  // Save booking information to Firebase
  saveBooking(ownerName, petName, petType, checkInDate, checkOutDate, specialRequests);
});