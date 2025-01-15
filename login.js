import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

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

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("login-username").value; // Get the username from the input
  const password = document.getElementById("login-password").value; // Get the password from the input

  // Reference to the users node in the database
  const dbRef = ref(database);

  // Query for user by username
  get(child(dbRef, `users`))
    .then((snapshot) => {
      let userFound = false;

      if (snapshot.exists()) {
        const usersData = snapshot.val();

        // Loop through users to find the matching username
        for (let userId in usersData) {
          const userData = usersData[userId];
          
          if (userData.username === username && userData.password === password) {
            userFound = true;
            alert("Đăng nhập thành công!");
            window.location.href = "/TrangChu.html"; // Redirect to trangchu.html
            break;  // Stop looping when we find the user
          }
        }

        // If no user was found with matching username and password
        if (!userFound) {
          alert("Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại!");
        }
      } else {
        alert("Không có người dùng trong hệ thống.");
      }
    })
    .catch((error) => {
      console.error("Lỗi khi truy xuất dữ liệu:", error);
      alert("Đăng nhập thất bại. Vui lòng thử lại!");
    });
});
