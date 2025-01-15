import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

// Handle registration form submission
// document.querySelector("#register-form").addEventListener("submit", function (event) {
//   event.preventDefault();

//   const username = document.querySelector("input[name='username']").value;
//   const password = document.querySelector("input[name='password']").value;
//   const repassword = document.querySelector("input[name='repassword']").value;

//   if (password !== repassword) {
//     alert("Password và RePassword không khớp. Vui lòng thử lại!");
//     return;
//   }

//   // Save user data to Firebase Database
//   set(ref(database, "users/" + user), { username, password })
//     .then(() => {
//       alert("Đăng ký thành công!");
//       document.querySelector("#register-form").reset();
//     })
//     .catch((error) => {
//       console.error("Lỗi khi lưu dữ liệu:", error);
//       alert("Đăng ký thất bại. Vui lòng thử lại!");
//     });
// });

function register(username, password) {
  const user = ref(database, 'users/');
  const newUser = push(user); // Generate a unique ID
  set(newUser, {
    username,
    password
  })
  .then(() => {
    alert('Đăng ký thành công!');
    // Optionally, clear the form fields
    document.getElementById('register-form').reset();
  })
  .catch((error) => {
    alert('Lỗi khi đăng ký: ' + error.message);
  });
}
document.getElementById('register-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const repassword = document.getElementById('repassword').value;

  if (password !== repassword) {
    alert("Password và RePassword không khớp. Vui lòng thử lại!");
    return;
  }
  register(username, password);
});
