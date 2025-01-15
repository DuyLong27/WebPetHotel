import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, onValue, remove, get, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

// Function to fetch and display bookings
function fetchBookings() {
  const bookingsRef = ref(database, 'bookings/');
  onValue(bookingsRef, (snapshot) => {
    const bookings = snapshot.val();
    const bookingsTableBody = document.getElementById('bookingsTableBody');
    bookingsTableBody.innerHTML = ''; // Clear existing rows

    for (const bookingId in bookings) {
      const booking = bookings[bookingId];
      const row = document.createElement('tr');

      row.innerHTML = `
        <td>${booking.ownerName}</td>
        <td>${booking.petName}</td>
        <td>${booking.petType}</td>
        <td>${booking.checkInDate}</td>
        <td>${booking.checkOutDate}</td>
        <td>
          <button class="edit-btn" onclick="editBooking('${bookingId}')">Sửa</button>
          <button class="delete-btn" onclick="deleteBooking('${bookingId}')">Xóa</button>
        </td>
      `;

      bookingsTableBody.appendChild(row);
    }
  });
}

// Function to delete a booking
function deleteBooking(bookingId) {
  const bookingRef = ref(database, 'bookings/' + bookingId);
  remove(bookingRef)
    .then(() => {
      alert('Xóa đặt phòng thành công!');
      fetchBookings(); // Refresh the bookings list
    })
    .catch((error) => {
      alert('Lỗi khi xóa đặt phòng: ' + error.message);
    });
}

// Function to edit a booking
function editBooking(bookingId) {
  const bookingRef = ref(database, 'bookings/' + bookingId);
  get(bookingRef).then((snapshot) => {
    if (snapshot.exists()) {
      const booking = snapshot.val();
      console.log('Booking data:', booking); // Debugging information
      document.getElementById('editOwnerName').value = booking.ownerName;
      document.getElementById('editPetName').value = booking.petName;
      document.getElementById('editPetType').value = booking.petType;
      document.getElementById('editCheckInDate').value = booking.checkInDate;
      document.getElementById('editCheckOutDate').value = booking.checkOutDate;
      document.getElementById('editSpecialRequests').value = booking.specialRequests;
      document.getElementById('editBookingId').value = bookingId;
      document.getElementById('editModal').style.display = 'block';
    } else {
      alert('Không tìm thấy thông tin đặt phòng.');
    }
  }).catch((error) => {
    console.error('Error fetching booking:', error); // Debugging information
    alert('Lỗi khi lấy thông tin đặt phòng: ' + error.message);
  });
}

// Function to update a booking
function updateBooking() {
  const bookingId = document.getElementById('editBookingId').value;
  const bookingRef = ref(database, 'bookings/' + bookingId);
  const updatedBooking = {
    ownerName: document.getElementById('editOwnerName').value,
    petName: document.getElementById('editPetName').value,
    petType: document.getElementById('editPetType').value,
    checkInDate: document.getElementById('editCheckInDate').value,
    checkOutDate: document.getElementById('editCheckOutDate').value,
    specialRequests: document.getElementById('editSpecialRequests').value
  };

  update(bookingRef, updatedBooking)
    .then(() => {
      alert('Cập nhật đặt phòng thành công!');
      document.getElementById('editModal').style.display = 'none';
      fetchBookings(); // Refresh the bookings list
    })
    .catch((error) => {
      alert('Lỗi khi cập nhật đặt phòng: ' + error.message);
    });
}

// Function to close the modal
function closeModal() {
  document.getElementById('editModal').style.display = 'none';
}

// Fetch bookings on page load
window.onload = fetchBookings;
window.deleteBooking = deleteBooking;
window.editBooking = editBooking;
window.updateBooking = updateBooking;
window.closeModal = closeModal;