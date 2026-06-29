window.addEventListener('load', function () {
    const fullname = localStorage.getItem("fullname");
    const usernameEl = document.getElementById("username");

    if (fullname && usernameEl) {
        usernameEl.innerHTML = "Hi, " + fullname + "!";
    }
});

// Fungsi cek status login, dipanggil kapan aja butuh tau user login atau belum
function isUserLoggedIn() {
    return !!localStorage.getItem("username");
}

// Fungsi logout, dipanggil dari button manapun di halaman manapun
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("fullname");
    window.location.href = "login.html"; // ganti sesuai nama file login kamu
}