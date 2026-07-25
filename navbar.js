window.addEventListener('load', function () {
    const fullname = localStorage.getItem("fullname");
    const usernameEl = document.getElementById("fullname");

    if (fullname && usernameEl) {
        usernameEl.innerHTML = "Hi, " + fullname + "!";
    }
});

function isUserLoggedIn() {
    return !!localStorage.getItem("fullname");
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    localStorage.removeItem("fullname");
    window.location.href = "index.html";
}